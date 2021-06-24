<template>
  <div ref="playerContainer">
    <audio
      v-if="nowPlayingSong.songUrl"
      ref="audio"
      controls
      :src="nowPlayingSong.songUrl"
      class="audio"
      @loadedmetadata="loadedMetaData"
      @ended="endedHandler"
    />
    <div
      :class="['custom-player', { 'fullscreen': fullscreen }, { 'mobile': isMobile }]"
      :style="{
        backgroundImage: `url('${nowPlayingSong.albumCover}')`
      }"
      @mouseenter="setHovering(true)"
      @mouseover="setHovering(true)"
      @mouseleave="setHovering(false)"
    >
      <div class="song-title">
        <h3>
          {{ nowPlayingSong.songName }}
        </h3>
        <p>
          {{ nowPlayingSong.singerName }} - {{ nowPlayingSong.albumName }}
        </p>
      </div>
      <div :class="['mask']" />
      <div :class="['play-list', 'shadow-5', { 'expanded': showPlayList }]">
        <div class="searcher q-pa-sm flex justify-between">
          <q-input
            v-model="songKeyword"
            dense
            color="primary"
            label="歌名/歌手名"
            clearable
            class="col"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-list separator padding>
          <q-item
            v-for="(s, i) in songsAfterMatchKeyword"
            :key="i"
            v-ripple
            clickable
            :active="playingSongId === s.songId"
            @click="playingSongId = s.songId"
          >
            <q-item-section thumbnail>
              <q-img :src="s.albumCover" width="40px" height="40px" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <q-spinner-audio
                  v-if="playingSongId === s.songId && playing"
                  color="primary"
                />
                <q-icon
                  v-else-if="playingSongId === s.songId && !playing"
                  name="pause"
                  color="primary"
                />
                {{ s.songName }}
              </q-item-label>
              <q-item-label caption lines="3">
                {{ s.singerName }} - {{ s.albumName }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                {{ minuteFormatter(s.duration / 1000) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div ref="lyricsContainer" class="lyrics">
        <div v-for="([, ...lines], i) in nowPlayingSong.lyrics" ref="lines" :key="i">
          <div :class="['single-line', { 'active-line': currentHilightLyricIndex === i }, 'q-mb-md']">
            <div
              v-for="(l, j) in lines"
              :key="j"
            >
              {{ l }}
            </div>
          </div>
        </div>
      </div>
      <q-inner-loading :showing="!canPlay">
        <q-spinner-audio
          color="primary"
          size="50px"
        />
      </q-inner-loading>
      <div v-if="canPlay" :class="['controls']">
        <div :class="['flex', 'items-center', isMobile ? 'col-6' : 'col-4', 'justify-center']">
          <q-btn
            flat
            round
            icon="skip_previous"
            @click="skipPrevious"
          >
            <q-tooltip anchor="center left" self="center right" content-class="bg-grey-10 custom-player">
              <span>
                上一首：
              </span>
              <strong class="text-primary">
                {{ previousSong.songName }} - {{ previousSong.singerName }}
              </strong>
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            :icon="playing ? 'pause' : 'play_arrow'"
            round
            unelevated
            @click="playOrPause"
          />
          <q-btn
            flat
            round
            icon="skip_next"
            @click="skipNext"
          >
            <q-tooltip anchor="center right" self="center left" content-class="bg-grey-10 custom-player">
              <span>
                下一首：
              </span>
              <strong class="text-primary">
                {{ nextSong.songName }} - {{ nextSong.singerName }}
              </strong>
            </q-tooltip>
          </q-btn>
        </div>
        <div class="row items-center progress-control justify-between">
          <div>
            <q-btn
              round
              icon="queue_music"
              unelevated
              :color="showPlayList ? 'primary' : '#999'"
              flat
              @click="showPlayList = !showPlayList"
            />
          </div>
          <div class="flex items-center col" style="max-width: 61.8vw;">
            <div>
              {{ currentSecondsInMinuteFormat }}
            </div>
            <div class="col q-px-sm">
              <q-slider v-model="currentSeconds" :min="0" :max="totalSeconds" @change="secondsChange" />
            </div>
            <div>
              {{ totalSecondsInMinuteFormat }}
            </div>
          </div>
          <div :class="['row', 'items-center', 'justify-end']" :style="{ width: isMobile ? '80px' : '120px' }">
            <q-btn flat round :icon="volume === 0 ? 'volume_off' : 'volume_up'" color="primary" @click="muteOrUnmute" />
            <div class="col">
              <q-slider v-model="volume" :min="0" :max="100" label />
            </div>
          </div>
        </div>
      </div>
      <div class="fullscreen-control">
        <q-btn icon="palette" flat round color="primary">
          <q-menu>
            <q-color v-model="themeColor" no-header no-footer />
          </q-menu>
        </q-btn>
        <q-btn flat round :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" color="grey-4" @click="fullscreen = !fullscreen">
          <q-tooltip>
            {{ fullscreen ? '退出全屏' : '全屏' }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { scroll } from 'quasar'
import shuffle from 'lodash/shuffle'
import songs from '@src/songs/songsInfo.json'

const songIdkey = 'DONSEN_SONG_ID'
const songPlayTimeKey = 'DONSNE_SONG_TIME'
const volumeKey = 'DONSEN_VOLUME_VALUE'
const fullscreenKey = 'DONSEN_FULLSCREEN_KEY'
const showPlayListKey = 'DONSEN_SHOW_PALY_LIST'
const themeColorKey = 'DONSEN_MUSIC_PLAYER_THEME'

const { setScrollPosition } = scroll
const minuteFormatter = sec => {
  const min = Math.floor(sec / 60)
  const secs = Math.floor(sec % 60)
  return `${min >= 10 ? min : `0${min}`}:${secs >= 10 ? secs : `0${Math.floor(secs)}`}`
}

export default {
  data() {
    return {
      volume: 80,
      lastVolume: 80,
      hovering: false,
      songKeyword: '',
      songs,
      playingSongId: Object.keys(songs)[0],
      playing: false,
      canPlay: false,
      totalSeconds: 0,
      currentSeconds: 0,
      currentHilightLyricIndex: 0,
      flag: null,
      fullscreen: false,
      storageIdSeted: false,
      storageTimeSeted: false,
      showPlayList: false,
      themeColor: '#33333'
    }
  },
  computed: {
    isMobile() {
      const $q = this.$q
      if (!$q) {
        return false
      }
      return $q.platform.is.mobile
    },
    previousSongId() {
      const keys = Object.keys(songs)
      const currentIdx = keys.findIndex(songId => songId === this.playingSongId)
      const nextIdx = currentIdx - 1
      return keys[nextIdx >= 0 ? nextIdx : keys.length - 1]
    },
    nextSongId() {
      const keys = Object.keys(songs)
      const currentIdx = keys.findIndex(songId => songId === this.playingSongId)
      const nextIdx = currentIdx + 1
      return keys[nextIdx < keys.length ? nextIdx : 0]
    },
    nextSong() {
      return this.songs[this.nextSongId]
    },
    previousSong() {
      return this.songs[this.previousSongId]
    },
    songsAfterMatchKeyword() {
      let k = this.songKeyword
      const list = Object.keys(this.songs).map(id => ({
        ...this.songs[id],
        songId: id
      }))
      if (!k) {
        return list
      }
      k = k.trim()
      return list.filter(song => song.songName.indexOf(k) !== -1 || song.singerName.indexOf(k) !== -1)
    },
    nowPlayingSong() {
      return this.songs[this.playingSongId]
    },
    currentSecondsInMinuteFormat() {
      return minuteFormatter(this.currentSeconds)
    },
    totalSecondsInMinuteFormat() {
      return minuteFormatter(this.totalSeconds)
    },
    showControl() {
      return (this.hovering && this.fullscreen) || !this.fullscreen
    },
    lyricsRainbow() {
      this.currentHilightLyricIndex
      return this.shuffleRainbow()
    }
  },
  watch: {
    volume(v) {
      this.$refs.audio.volume = v / 100
    },
    playingSongId() {
      this.$nextTick(() => {
        this.currentHilightLyricIndex = 0
        this.canPlay = false
        this.playing = false
        this.playOrPause()
        this.setStorageTime()
      })
    },
    currentHilightLyricIndex(newIdex) {
      const lyricsContainer = this.$refs.lyricsContainer
      const offsetTop = this.$refs.lines[newIdex].offsetTop
      const height = lyricsContainer.clientHeight
      const scrollTop = lyricsContainer.scrollTop
      const diff = offsetTop - height / 2
      if (diff > scrollTop || (scrollTop - diff > height / 2)) {
        setScrollPosition(lyricsContainer, diff, 300)
      }
    },
    nowPlayingSong(song) {
      document.title = `${song.songName} - ${song.singerName}`
    },
    themeColor(v) {
      document.documentElement.style.setProperty('--donsen-music-player-theme-color', v)
    }
  },
  destroyed() {
    this.clearFlag()
    this.rememberPlayState()
  },
  mounted() {
    this.setFlag()
    window.addEventListener('beforeunload', this.rememberPlayState)
    const storageVolume = window.localStorage.getItem(volumeKey)
    if (storageVolume) {
      this.volume = Number(storageVolume)
    }
    if (this.isMobile) {
      this.fullscreen = true
    } else {
      const storageFullscreen = window.localStorage.getItem(fullscreenKey)
      if (storageFullscreen === 'true') {
        this.fullscreen = true
      }
      const storageShowPlayList = window.localStorage.getItem(showPlayListKey)
      if (storageShowPlayList === 'true') {
        this.showPlayList = true
      }
    }
    document.title = `${this.nowPlayingSong.songName} - ${this.nowPlayingSong.singerName}`
    const storageThemeColor = window.localStorage.getItem(themeColorKey)
    if (storageThemeColor) {
      this.themeColor = storageThemeColor
    } else {
      this.themeColor = getComputedStyle(document.documentElement).getPropertyValue('--donsen-music-player-theme-color')
    }
  },
  methods: {
    shuffleRainbow() {
      return shuffle([
        '#ff0000',
        '#ff5900',
        '#fff200',
        '#51ff00',
        '#00d0ff',
        '#9000ff',
        ' #ff008c'
      ]).join(',')
    },
    minuteFormatter,
    rememberPlayState() {
      window.localStorage.setItem(songIdkey, this.playingSongId)
      window.localStorage.setItem(songPlayTimeKey, this.currentSeconds)
      window.localStorage.setItem(volumeKey, this.volume)
      window.localStorage.setItem(fullscreenKey, this.fullscreen)
      window.localStorage.setItem(showPlayListKey, this.showPlayList)
      window.localStorage.setItem(themeColorKey, this.themeColor)
    },
    setHovering(hovering) {
      if (this.fullscreen) {
        this.hovering = hovering
      }
    },
    clearFlag() {
      if (this.flag) {
        clearInterval(this.flag)
      }
    },
    setFlag() {
      this.flag = setInterval(() => {
        this.currentSeconds = this.$refs.audio.currentTime
        const lyrics = this.nowPlayingSong.lyrics
        if (!lyrics) {
          return
        }
        for (let i = this.currentHilightLyricIndex; i < lyrics.length; i++) {
          if (i === lyrics.length - 1) {
            if (this.currentSeconds >= start) {
              this.currentHilightLyricIndex = i
            }
            return
          }
          const [start] = lyrics[i]
          const [nextStart] = lyrics[i + 1]
          if (this.currentSeconds >= start && this.currentSeconds < nextStart) {
            this.currentHilightLyricIndex = i
            return
          }
        }
      }, 500)
    },
    endedHandler() {
      this.playing = false
      this.$refs.audio.currentTime = 0
      this.currentHilightLyricIndex = 0
      this.skipNext()
    },
    secondsChange(v) {
      this.clearFlag()
      this.$refs.audio.currentTime = v
      this.currentHilightLyricIndex = 0
      this.setFlag()
    },
    loadedMetaData(e) {
      this.totalSeconds = e.target.duration
      this.canPlay = true
      if (!this.storageIdSeted) {
        const storageSongId = window.localStorage.getItem(songIdkey)
        if (storageSongId && !isNaN(storageSongId)) {
          if (this.playingSongId === storageSongId) {
            this.setStorageTime()
            return
          }
          this.playingSongId = storageSongId
        }
        this.storageIdSeted = true
      }
    },
    setStorageTime() {
      if (!this.storageTimeSeted) {
        const storageCurrentTime = window.localStorage.getItem(songPlayTimeKey)
        if (storageCurrentTime) {
          this.$refs.audio.currentTime = storageCurrentTime
        }
        this.storageTimeSeted = true
      }
    },
    playOrPause() {
      if (!this.playing) {
        this.$refs.audio.play()
          .then(() => {
            this.playing = true
          })
          .catch(() => {
            this.playing = false
          })
      } else {
        this.$refs.audio.pause()
        this.playing = false
      }
    },
    skipNext() {
      this.playingSongId = this.nextSongId
    },
    skipPrevious() {
      this.playingSongId = this.previousSongId
    },
    muteOrUnmute() {
      if (this.volume !== 0) {
        this.lastVolume = this.volume
        this.volume = 0
      } else {
        this.volume = this.lastVolume
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@keyframes lyrics {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
.custom-player {
  border-radius 8px;
  position relative;
  height 60vh;
  background-repeat no-repeat
  background-size cover
  transition all ease .3s
  background-color #333
  background-position center
  overflow hidden
  &.fullscreen {
    position fixed
    background-size contain
    top 0
    left 0
    right 0
    bottom 0
    z-index 10
    width calc(100vw + 12px)
    height 100vh
    .controls {
      padding-right: 24px;
    }
    .song-title {
      top: 5vh;
    }
    .play-list {
      width: 20vw;
    }
    &.mobile {
      .play-list {
        width: 100%;
      }
    }
  }
  &.mobile {
    .play-list {
      width: 100%;
    }
  }
  ::-webkit-scrollbar-track {
    background-color transparent;
    box-shadow inset 1px 1px 2px rgb(0 0 0 / 20%)
    border-radius 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color #666;
  }
  .song-title {
    position absolute
    top 12px
    left 50%
    transform translateX(-50%)
    z-index: 3
    text-align: center
    background-size: 400% 400%
    background-image: linear-gradient(to right,
      #ff0000,
      #ff8000,
      #fff200,
      #51ff00,
      #00d0ff,
      #9000ff,
      #ff008c
    )
    -webkit-background-clip text;
    background-clip text;
    animation: lyrics 10s ease infinite;
    color: transparent
    h3 {
      margin: 0;
      font-weight: normal;
      font-size: 2em;
    }
    p {
      font-size: 12px;
    }
  }
  .fullscreen-control {
    position absolute
    top 12px
    right 12px
  }
  .mask {
    position absolute
    border-radius inherit;
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0, 0, 0, .618)
  }
  .lyrics {
    text-align center
    width 80%;
    color: #aeaeae;
    height 50%;
    position absolute
    top 50%;
    left 50%;
    transform translate(-50%, -50%);
    overflow auto;
    padding: 20vh 0;
    .single-line {
      &.active-line {
        font-size 1.25em;
        color: #fff;
      }
    }
  }
  .controls {
    position absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    padding: 8px 12px 8px 8px;
    transition all ease-in-out .2s
    >>> .q-slider__track-container {
      background-color #fff
    }
    >>> .q-slider {
      color: var(--donsen-music-player-theme-color);
    }
    .progress-control {
      color: #999;
    }
  }
}
.audio {
  display: none;
}
.play-list {
  background-color rgba(0, 0, 0, .95);
  height calc(100% - 100px);
  position absolute;
  overflow-y auto;
  overflow-x visible;
  top 0;
  left 0;
  z-index: 3;
  width: 61.8%;
  transform translateX(-100%) scaleX(.3)
  opacity: 0
  transition all ease-in-out .3s
  box-shadow none
  &.expanded {
    transform translateX(0) scaleX(1)
    box-shadow 0 5px 8px rgb(0 0 0 / 14%), 0 1px 14px rgb(0 0 0 / 12%);
    opacity: 1
  }
  .searcher {
    position sticky
    top 0
    z-index 2
    background-color #000
    box-shadow inherit
    >>> .q-field {
      .q-field__label,
      .q-field__native,
      .q-field__prepend,
      .q-field__focusable-action {
        color: #fff;
      }
      &.q-field--float {
        .q-field__label,
        .q-field__prepend {
          color: var(--donsen-music-player-theme-color);
        }
      }
    }
  }
  >>> .q-list {
    color: #fff;
    .q-item--active {
      color: var(--donsen-music-player-theme-color);
      .text-caption {
        color: var(--donsen-music-player-theme-color);
      }
    }
    .q-item__label--caption {
      line-height: 1.5em !important;
    }
    .text-caption {
      color: #999;
    }
  }
  >>> .q-list--separator {
    .q-item-type + .q-item-type {
      border-color: #333
    }
  }
  >>> .q-item__section--thumbnail img {
    object-fit cover;
  }
}
</style>
