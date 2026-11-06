<!-- Svelte port of the old site's Util-Song player (docs/.vuepress/components/
     Util/Song.vue): album-cover backdrop, scrolling lyrics, playlist with
     search, progress / volume, fullscreen, and the same localStorage keys so
     returning visitors pick up where they left off. -->
<script lang="ts">
  import { onMount, tick } from 'svelte'
  import songsInfo from '../../songs/songsInfo.json'

  interface Song {
    songName: string
    singerName: string
    albumName: string
    albumCover: string
    songUrl: string
    duration: number
    lyrics: (string | number)[][]
  }

  const songs = songsInfo as Record<string, Song>
  const ids = Object.keys(songs)

  const SONG_ID_KEY = 'DONSEN_SONG_ID'
  const SONG_TIME_KEY = 'DONSNE_SONG_TIME'
  const VOLUME_KEY = 'DONSEN_VOLUME_VALUE'
  const FULLSCREEN_KEY = 'DONSEN_FULLSCREEN_KEY'
  const PLAYLIST_KEY = 'DONSEN_SHOW_PALY_LIST'

  let audio: HTMLAudioElement | undefined = $state()
  let lyricsBox: HTMLElement | undefined = $state()
  let playingId = $state(ids[0])
  let playing = $state(false)
  let canPlay = $state(false)
  let totalSeconds = $state(0)
  let currentSeconds = $state(0)
  let volume = $state(80)
  let lastVolume = 80
  let fullscreen = $state(false)
  let showPlayList = $state(false)
  let keyword = $state('')
  let isMobile = $state(false)
  let seeking = false
  let pendingTime: number | null = null
  let autoplayNext = false

  const song = $derived(songs[playingId])
  const index = $derived(ids.indexOf(playingId))
  const prevId = $derived(ids[(index - 1 + ids.length) % ids.length])
  const nextId = $derived(ids[(index + 1) % ids.length])
  const lyrics = $derived(song.lyrics ?? [])
  const activeLine = $derived.by(() => {
    let active = 0
    for (let i = 0; i < lyrics.length; i++) {
      if (currentSeconds >= Number(lyrics[i][0])) active = i
      else break
    }
    return active
  })
  const filtered = $derived.by(() => {
    const k = keyword.trim()
    return ids
      .map(id => ({ id, ...songs[id] }))
      .filter(s => !k || s.songName.includes(k) || s.singerName.includes(k))
  })

  const https = (url: string) => url.replace(/^http:\/\//, 'https://')
  const src = (s: Song) => encodeURI(s.songUrl)
  function mmss(sec: number) {
    if (!Number.isFinite(sec)) sec = 0
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  function rememberState() {
    if (!audio) return
    localStorage.setItem(SONG_ID_KEY, playingId)
    localStorage.setItem(SONG_TIME_KEY, String(audio.currentTime))
    localStorage.setItem(VOLUME_KEY, String(volume))
    localStorage.setItem(FULLSCREEN_KEY, String(fullscreen))
    localStorage.setItem(PLAYLIST_KEY, String(showPlayList))
  }

  onMount(() => {
    isMobile = matchMedia('(max-width: 640px)').matches
    const storedId = localStorage.getItem(SONG_ID_KEY)
    if (storedId && songs[storedId]) {
      playingId = storedId
      const t = Number(localStorage.getItem(SONG_TIME_KEY))
      if (t > 0) pendingTime = t
    }
    const v = localStorage.getItem(VOLUME_KEY)
    if (v !== null && !Number.isNaN(Number(v))) volume = Number(v)
    if (isMobile) {
      fullscreen = true
    }
    else {
      fullscreen = localStorage.getItem(FULLSCREEN_KEY) === 'true'
      showPlayList = localStorage.getItem(PLAYLIST_KEY) === 'true'
    }
    addEventListener('beforeunload', rememberState)
    return () => {
      rememberState()
      removeEventListener('beforeunload', rememberState)
    }
  })

  $effect(() => {
    if (audio) audio.volume = volume / 100
  })

  // Keep the highlighted line in the middle of the lyrics box.
  $effect(() => {
    const i = activeLine
    if (!lyricsBox) return
    const line = lyricsBox.children[i] as HTMLElement | undefined
    if (!line) return
    const target = line.offsetTop - lyricsBox.clientHeight / 2 + line.clientHeight / 2
    lyricsBox.scrollTo({ top: target, behavior: 'smooth' })
  })

  function onLoadedMetadata() {
    if (!audio) return
    totalSeconds = audio.duration
    canPlay = true
    if (pendingTime !== null) {
      audio.currentTime = Math.min(pendingTime, audio.duration || pendingTime)
      currentSeconds = audio.currentTime
      pendingTime = null
    }
    if (autoplayNext) {
      autoplayNext = false
      play()
    }
  }

  function onTimeUpdate() {
    if (audio && !seeking) currentSeconds = audio.currentTime
  }

  function play() {
    audio?.play().then(() => { playing = true }).catch(() => { playing = false })
  }

  function playOrPause() {
    if (!audio) return
    if (audio.paused) play()
    else {
      audio.pause()
      playing = false
    }
  }

  async function select(id: string) {
    if (id === playingId) {
      playOrPause()
      return
    }
    playingId = id
    canPlay = false
    playing = false
    currentSeconds = 0
    totalSeconds = 0
    autoplayNext = true
    await tick()
    audio?.load()
  }

  function onEnded() {
    playing = false
    select(nextId)
  }

  function onSeekInput(e: Event) {
    seeking = true
    currentSeconds = Number((e.target as HTMLInputElement).value)
  }

  function onSeekChange(e: Event) {
    if (audio) audio.currentTime = Number((e.target as HTMLInputElement).value)
    seeking = false
  }

  function muteOrUnmute() {
    if (volume !== 0) {
      lastVolume = volume
      volume = 0
    }
    else {
      volume = lastVolume || 80
    }
  }
</script>

<svelte:head>
  <title>{song.songName} - {song.singerName}</title>
</svelte:head>

<audio
  bind:this={audio}
  src={src(song)}
  preload="metadata"
  onloadedmetadata={onLoadedMetadata}
  ontimeupdate={onTimeUpdate}
  onended={onEnded}
  onplay={() => (playing = true)}
  onpause={() => (playing = false)}
></audio>

<div
  class="player"
  class:fullscreen
  class:mobile={isMobile}
  style:background-image="url('{https(song.albumCover)}')"
>
  <div class="mask"></div>

  <div class="song-title">
    <h3>{song.songName}</h3>
    <p>{song.singerName} - {song.albumName}</p>
  </div>

  <div class="play-list" class:expanded={showPlayList} aria-hidden={!showPlayList}>
    <label class="searcher">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
      <input bind:value={keyword} placeholder="歌名/歌手名" tabindex={showPlayList ? 0 : -1} />
    </label>
    <ul>
      {#each filtered as s (s.id)}
        <li>
          <button
            class="song-item"
            class:active={s.id === playingId}
            tabindex={showPlayList ? 0 : -1}
            onclick={() => select(s.id)}
          >
            <img src={https(s.albumCover)} alt="" loading="lazy" />
            <span class="song-item__text">
              <span class="song-item__name">
                {#if s.id === playingId && playing}
                  <span class="eq" aria-label="正在播放"><i></i><i></i><i></i></span>
                {:else if s.id === playingId}
                  <svg class="inline-icon" viewBox="0 0 24 24" aria-label="已暂停"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                {/if}
                {s.songName}
              </span>
              <span class="song-item__caption">{s.singerName} - {s.albumName}</span>
            </span>
            <span class="song-item__time">{mmss(s.duration / 1000)}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>

  <div class="lyrics" bind:this={lyricsBox}>
    {#each lyrics as [, ...lines], i (i)}
      <div
        class="single-line"
        class:active-line={activeLine === i}
        style:transform="scale({Math.max(1 - Math.abs(i - activeLine) * 0.1, 0.6)})"
        style:filter="blur({Math.min(Math.abs(i - activeLine) * 0.3, 2)}px)"
      >
        {#each lines as l, j (j)}
          <div>{l}</div>
        {/each}
      </div>
    {/each}
  </div>

  {#if !canPlay}
    <div class="loading" aria-label="加载中">
      <span class="eq big"><i></i><i></i><i></i><i></i><i></i></span>
    </div>
  {/if}

  <div class="controls" class:hidden={!canPlay}>
    <div class="main-buttons">
      <button class="icon-btn" title="上一首：{songs[prevId].songName} - {songs[prevId].singerName}" aria-label="上一首" onclick={() => select(prevId)}>
        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
      </button>
      <button class="icon-btn play" aria-label={playing ? '暂停' : '播放'} onclick={playOrPause}>
        {#if playing}
          <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
        {:else}
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        {/if}
      </button>
      <button class="icon-btn" title="下一首：{songs[nextId].songName} - {songs[nextId].singerName}" aria-label="下一首" onclick={() => select(nextId)}>
        <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
      </button>
    </div>
    <div class="progress-row">
      <button class="icon-btn" class:on={showPlayList} title="播放列表" aria-label="播放列表" onclick={() => (showPlayList = !showPlayList)}>
        <svg viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18A3 3 0 1 0 19 17V8h3V6h-5z" /></svg>
      </button>
      <div class="progress">
        <span class="mono">{mmss(currentSeconds)}</span>
        <input
          type="range"
          min="0"
          max={totalSeconds || 0}
          step="0.1"
          value={currentSeconds}
          aria-label="播放进度"
          oninput={onSeekInput}
          onchange={onSeekChange}
        />
        <span class="mono">{mmss(totalSeconds)}</span>
      </div>
      <div class="volume">
        <button class="icon-btn on" aria-label={volume === 0 ? '取消静音' : '静音'} onclick={muteOrUnmute}>
          {#if volume === 0}
            <svg viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" /></svg>
          {:else}
            <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
          {/if}
        </button>
        <input type="range" min="0" max="100" bind:value={volume} aria-label="音量" />
      </div>
    </div>
  </div>

  <button class="icon-btn fullscreen-control" class:on={fullscreen} title={fullscreen ? '退出全屏' : '全屏'} aria-label={fullscreen ? '退出全屏' : '全屏'} onclick={() => (fullscreen = !fullscreen)}>
    {#if fullscreen}
      <svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
    {:else}
      <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
    {/if}
  </button>
</div>

<style>
  .player {
    --accent: var(--sp-blog-primary);
    position: relative;
    height: 60vh;
    min-height: 420px;
    max-width: 560px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    color: #fff;
    background-color: #333;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: all 0.3s ease;
  }
  .player.fullscreen {
    position: fixed;
    inset: 0;
    z-index: 1000;
    max-width: none;
    height: 100vh;
    min-height: 0;
    border-radius: 0;
    background-size: contain;
  }
  .player.mobile {
    max-width: none;
  }
  .mask {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.618);
  }
  .song-title {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    width: 70%;
    text-align: center;
  }
  .fullscreen .song-title {
    top: 5vh;
  }
  .song-title h3 {
    margin: 0;
    font-weight: normal;
    font-size: 2em;
    color: #fff;
  }
  .song-title p {
    margin: 0.25rem 0 0;
    font-size: 12px;
    color: #ddd;
  }
  .lyrics {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 50%;
    overflow: auto;
    padding: 20vh 0;
    text-align: center;
    font-size: 18px;
    line-height: 2em;
    color: #aeaeae;
    scrollbar-width: none;
  }
  .lyrics::-webkit-scrollbar {
    display: none;
  }
  .fullscreen .lyrics {
    padding: 30vh 0;
  }
  .fullscreen.mobile .lyrics {
    padding: 35vh 0;
  }
  .single-line {
    transition: transform 0.3s, filter 0.3s, color 0.3s;
  }
  .single-line.active-line {
    color: #fff;
  }
  .loading {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    z-index: 2;
  }
  .controls {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    padding: 8px 12px 8px 8px;
    transition: opacity 0.2s ease-in-out;
  }
  .fullscreen .controls {
    padding-right: 24px;
  }
  .controls.hidden {
    opacity: 0;
    pointer-events: none;
  }
  .main-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  .progress-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #999;
  }
  .progress {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 8px;
    max-width: 61.8vw;
  }
  .progress input {
    flex: 1;
    min-width: 0;
  }
  .volume {
    display: flex;
    align-items: center;
    width: 120px;
  }
  .mobile .volume {
    width: 80px;
  }
  .volume input {
    flex: 1;
    min-width: 0;
  }
  input[type='range'] {
    accent-color: var(--accent);
    height: 4px;
    cursor: pointer;
  }
  .mono {
    font-family: monospace;
    font-size: 12px;
  }
  .icon-btn {
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }
  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.12);
  }
  .icon-btn svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
  .icon-btn.play svg {
    width: 32px;
    height: 32px;
  }
  .main-buttons .icon-btn {
    color: #fff;
  }
  .icon-btn.on {
    color: var(--accent);
  }
  .fullscreen-control {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
    color: #ddd;
  }
  .play-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 61.8%;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.95);
    opacity: 0;
    transform: translateX(-100%) scaleX(0.3);
    transition: all 0.3s ease-in-out;
    scrollbar-color: #666 transparent;
  }
  .play-list.expanded {
    opacity: 1;
    transform: none;
    box-shadow: 0 5px 8px rgb(0 0 0 / 14%), 0 1px 14px rgb(0 0 0 / 12%);
  }
  .fullscreen .play-list {
    width: 20vw;
    min-width: 260px;
  }
  .mobile .play-list,
  .fullscreen.mobile .play-list {
    width: 100%;
  }
  .searcher {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background-color: #000;
    border-bottom: 1px solid #333;
  }
  /* Full-width list: keep the input clear of the fullscreen button. */
  .mobile .searcher {
    padding-right: 60px;
  }
  .searcher svg {
    width: 20px;
    height: 20px;
    fill: #999;
    flex: none;
  }
  .searcher:focus-within svg {
    fill: var(--accent);
  }
  .searcher input {
    flex: 1;
    min-width: 0;
    padding: 6px 0;
    border: 0;
    border-bottom: 1px solid #555;
    background: transparent;
    color: #fff;
    font: inherit;
    outline: none;
  }
  .searcher input:focus {
    border-bottom-color: var(--accent);
  }
  .play-list ul {
    list-style: none;
    margin: 0;
    padding: 8px 0;
  }
  .play-list li + li {
    border-top: 1px solid #333;
  }
  .song-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 8px 16px;
    border: 0;
    background: transparent;
    color: #fff;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .song-item:hover {
    background: rgba(255, 255, 255, 0.06);
  }
  .song-item img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    flex: none;
  }
  .song-item__text {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }
  .song-item__name {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .song-item__caption,
  .song-item__time {
    font-size: 12px;
    line-height: 1.5em;
    color: #999;
  }
  .song-item.active,
  .song-item.active .song-item__caption,
  .song-item.active .song-item__time {
    color: var(--accent);
  }
  .inline-icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  .eq {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }
  .eq i {
    width: 3px;
    height: 100%;
    background: var(--accent);
    animation: eq 0.9s ease-in-out infinite;
    transform-origin: bottom;
  }
  .eq i:nth-child(2) { animation-delay: -0.3s; }
  .eq i:nth-child(3) { animation-delay: -0.6s; }
  .eq i:nth-child(4) { animation-delay: -0.45s; }
  .eq i:nth-child(5) { animation-delay: -0.15s; }
  .eq.big {
    height: 50px;
    gap: 5px;
  }
  .eq.big i {
    width: 7px;
  }
  @keyframes eq {
    0%, 100% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .eq i { animation: none; transform: scaleY(0.6); }
  }
</style>
