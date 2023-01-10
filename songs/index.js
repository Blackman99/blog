const axios = require('axios')
const fs = require('fs')
const ymal = require('yaml')
const path = require('path')
const songsInfoFilePath = path.resolve(__dirname, './songsInfo.json')
const songInfoRawData = fs.readFileSync(songsInfoFilePath)
const songsInfo = JSON.parse(songInfoRawData)

// Fetch and show the song lyrics in console
const parser = (configItem) => {
  const { songId, lyrics: customLyricsArray, customLyrics = false, songUrl } = configItem
  const singleSong = songsInfo[songId]
  if(singleSong) {
    return
  }
  axios.get(`http://music.163.com/api/song/media?id=${songId}`).then(({
    data: {
      lyric: lyricsString
    }
  }) => {
    const lyricsArray = lyricsString.split('\n').filter(line => line !== '')
    let lyrics = lyricsArray.map(line => {
      let [time, content] = line.split(']')
      time = time.replace(/\[/, '')
      const [min, sec] = time.split(':')
      const seconds = Math.floor((Number(min) * 60 + Number(sec)))
      return [seconds, content]
    })
    console.log(lyrics)
    lyrics = lyrics.filter(arr => arr && arr[0] !== null && arr[1] !== null)
    // Use the music.163.com api
    axios.get(`http://music.163.com/api/song/detail/?ids=[${songId}]`).then(({ data: { songs } }) => {
      const songInfo = songs[0]
      const { 
        name: songName, 
        album: { picUrl: albumCover, name: albumName }, 
        artists: [{ name: singerName }], 
        lMusic: { playTime: duration }
      } = songInfo
      const newSongInfo = {
        songName,
        lyrics: customLyrics ? customLyricsArray : lyrics,
        albumCover,
        albumName,
        singerName,
        songUrl,
        duration
      }
      songsInfo[songId] = newSongInfo
      fs.writeFileSync(songsInfoFilePath, JSON.stringify(songsInfo))
    })
  })
}

const songConfigs = fs.readFileSync(path.resolve(__dirname, './songs.yml'), 'utf-8')
const songConfigsArray = ymal.parse(songConfigs)


songConfigsArray.filter(({ songId }) => !songsInfo[songId]).forEach(parser)