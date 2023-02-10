import BaseOperation from './BaseOperation'

type PlayMode = 'one' | 'list' | 'random'

class PlayOperation extends BaseOperation {
  mode: PlayMode
  beforeSetCurrentTime: () => unknown
  afterSetCurrentTime: () => unknown
  beforeSetSrc: () => unknown

  constructor(playerDom: HTMLMediaElement, gainNode: GainNode) {
    super(playerDom, gainNode)

    this.playerDom = playerDom
    // this.playerDom.volume
    this.mode = 'list'
    this.beforeSetCurrentTime = (): void => {}
    this.afterSetCurrentTime = (): void => {}
    this.beforeSetSrc = (): void => {}
  }
  setCurrentTime(time: number): number {
    this.beforeSetCurrentTime()
    if (time >= 0 && time <= this.getDuration()) {
      this.playerDom.currentTime = time
    } else {
      throw new Error('该歌曲无此时间节点！')
    }
    this.afterSetCurrentTime()
    return this.getCurrentTime()
  }

  getCurrentTime(): number {
    return this.playerDom.currentTime
  }

  getDuration(): number {
    return this.playerDom.duration
  }

  setPlayMode(mode: PlayMode): void {
    this.mode = mode
  }

  getPlayMode(): PlayMode {
    return this.mode
  }

  setPlaySrc(src: string): void {
    this.beforeSetSrc()
    this.playerDom.src = src
  }

  getRate(): number {
    return this.playerDom.playbackRate
  }
  setRate(rate: number): number {
    this.playerDom.playbackRate = rate
    return this.getRate()
  }
}

export default PlayOperation
