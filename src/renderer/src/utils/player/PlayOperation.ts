import { error } from 'console'
import BaseOperation from './BaseOperation'

import { Listener, Song } from './type'

export type PlayMode = 'one' | 'list' | 'random'
type listenerMode =
  | 'beforeSetCurrentTime'
  | 'afterSetCurrentTime'
  | 'beforeSetSrc'
  | 'afterSetSrc'
  | 'beforeChangeSongList'
  | 'afterChangeSongList'
  | 'beforeChangePlayStatus'
  | 'afterChangePlayStatus'

class PlayOperation extends BaseOperation {
  private mode: PlayMode
  private sourceNode: MediaElementAudioSourceNode
  private status: 'pause' | 'playing' | 'none' = 'none'

  private beforeSetCurrentTimeArr: Listener[] = []
  private afterSetCurrentTimeArr: Listener[] = []
  private beforeSetSrcArr: Listener[] = []
  private afterSetSrcArr: Listener[] = []
  private beforeChangeSongListArr: Listener[] = []
  private afterChangeSongListArr: Listener[] = []
  private beforeChangePlayStatusArr: Listener[] = []
  private afterChangePlayStatusArr: Listener[] = []

  private beforeSetCurrentTime = (): void => this.listenerRun(this.beforeSetCurrentTimeArr)
  private afterSetCurrentTime = (): void => this.listenerRun(this.afterSetCurrentTimeArr)
  private beforeSetSrc = (): void => this.listenerRun(this.beforeSetSrcArr)
  private afterSetSrc = (): void => this.listenerRun(this.afterSetSrcArr)
  private beforeChangeSongList = (): void => this.listenerRun(this.beforeChangeSongListArr)
  private afterChangeSongList = (): void => this.listenerRun(this.afterChangeSongListArr)
  private beforeChangePlayStatus = (): void => this.listenerRun(this.beforeChangePlayStatusArr)
  private afterChangePlayStatus = (): void => this.listenerRun(this.afterChangePlayStatusArr)

  private songList: Song[] = []
  private songIndex = -1

  constructor(sourceNode: MediaElementAudioSourceNode) {
    super()

    this.sourceNode = sourceNode
    this.mode = 'list'

    this.mountListener()
  }

  private mountListener(): void {
    this.sourceNode.mediaElement.addEventListener('play', () => {
      this.changePlayStatus('playing')
    })
    this.sourceNode.mediaElement.addEventListener('pause', () => {
      this.changePlayStatus('pause')
    })
    this.sourceNode.mediaElement.addEventListener('ended', () => {
      this.next()
    })
  }

  addListener(event: listenerMode, fun: () => unknown): string {
    const id = new Date().getTime().toString()
    const item = { id, fun }
    eval(`this.${event}Arr`).push(item)
    return id
  }
  removeListener(event: listenerMode, index: string | (() => unknown)): void {
    this.listenerDelete(eval(`this.${event}Arr`), index)
  }

  setCurrentTime(time: number): number {
    this.beforeSetCurrentTime()
    if (time >= 0 && time <= this.getDuration()) {
      this.sourceNode.mediaElement.currentTime = time
    } else {
      throw new Error('该歌曲无此时间节点！')
    }
    this.afterSetCurrentTime()
    return this.getCurrentTime()
  }
  getCurrentTime(): number {
    return this.sourceNode.mediaElement.currentTime
  }
  getDuration(): number {
    return this.sourceNode.mediaElement.duration
  }

  getStatus(): 'playing' | 'pause' | 'none' {
    return this.sourceNode.mediaElement.src ? this.status : 'none'
  }
  changePlayStatus(playStatus: 'playing' | 'pause'): void {
    this.beforeChangePlayStatus()
    this.status = playStatus
    this.afterChangePlayStatus()
  }

  setPlayMode(mode: PlayMode): void {
    this.mode = mode
  }
  getPlayMode(): PlayMode {
    return this.mode
  }

  setPlaySrc(src: string): void {
    this.beforeSetSrc()
    this.pause()
    this.sourceNode.mediaElement.src = src
    this.play()
    this.afterSetSrc()
  }

  // 修改播放速度
  getRate(): number {
    return this.sourceNode.mediaElement.playbackRate
  }
  setRate(rate: number): number {
    this.sourceNode.mediaElement.playbackRate = rate
    return this.getRate()
  }

  getSong(): Song {
    return this.songIndex !== -1
      ? this.songList[this.songIndex]
      : {
          mid: '',
          name: 'undefind',
          album: { mid: '', name: 'undefind' },
          singer: [{ mid: '', name: 'undefind' }]
        }
  }
  getSongList(): Song[] {
    return this.songList
  }
  private changeSongList(songList: Song[], index = 0): Song[] {
    this.beforeChangeSongList()
    this.songList = songList
    this.songIndex = index
    this.afterChangeSongList()
    return this.songList
  }
  setSongList(songList: Song[], index = 0): Song[] {
    songList = this.changeSongList(songList, index)
    index = index < songList.length ? index : 0
    if (songList.length > 0) this.setPlaySrc(songList[index].url as string)
    return songList
  }
  setSongIndex(index: number): void {
    if (index < 0 || index >= this.songList.length) console.error('setSongIndex Error')
    else {
      this.songIndex = index
      this.setPlaySrc(this.getSongList()[index].url as string)
    }
  }
  addSong(songItem: Song, place: 'next' | 'start' | 'end' = 'next'): Song[] {
    const songList = this.getSongList()
    switch (place) {
      case 'start':
        songList.unshift(songItem)
        break
      case 'end':
        songList.push(songItem)
        break
      default:
        songList.splice(this.songIndex + 1, 0, songItem)
        break
    }
    return this.changeSongList(songList)
  }

  next(n = 1): Song {
    if (this.mode === 'one') {
      n = 0
    } else if (this.mode === 'random') {
      n = Math.ceil(Math.random() * this.songList.length)
    }
    n %= this.songList.length
    this.songIndex =
      this.songIndex + n >= this.songList.length
        ? this.songIndex + n - this.songList.length
        : this.songIndex + n
    const song = this.songList[this.songIndex]
    if (song.url) this.setPlaySrc(song.url)
    return this.songList[this.songIndex]
  }
  last(n = 1): Song {
    if (this.mode === 'one') {
      n = 0
    } else if (this.mode === 'random') {
      n = Math.ceil(Math.random() * this.songList.length)
    }
    n %= this.songList.length
    this.songIndex =
      this.songIndex - n < 0 ? this.songList.length + this.songIndex - n : this.songIndex - n
    const song = this.songList[this.songIndex]
    if (song.url) this.setPlaySrc(song.url)
    return this.songList[this.songIndex]
  }

  play(): void {
    this.sourceNode.mediaElement.play()
  }
  pause(): void {
    this.sourceNode.mediaElement.pause()
  }
}

export default PlayOperation
