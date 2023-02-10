import BaseOperation from './BaseOperation'

class VolumeOperation extends BaseOperation {
  signVolume = -1
  beforeSetVolume: () => unknown
  afterSetVolume: () => unknown

  constructor(playerDom: HTMLMediaElement, gainNode: GainNode) {
    super(playerDom, gainNode)
    this.beforeSetVolume = (): void => {}
    this.afterSetVolume = (): void => {}
    this.gainNode = gainNode
    this.playerDom = playerDom
  }

  onBeforeSetVolume(func: () => unknown): void {
    this.beforeSetVolume = func
  }
  onAfterSetVolume(func: () => unknown): void {
    this.afterSetVolume = func
  }

  setVolume(volume: number): number {
    this.beforeSetVolume()
    if (volume >= 0 && volume <= 1) this.gainNode.gain.value = volume
    this.afterSetVolume()
    return this.getVolume()
  }

  getVolume(): number {
    return this.gainNode.gain.value
  }

  lowerVolume(volume: number): number {
    const v = this.getVolume() - volume
    return this.setVolume(v)
  }

  mute(): void {
    this.signVolume = this.getVolume()
    this.gainNode.gain.exponentialRampToValueAtTime(0, this.playerDom.currentTime + 1)
  }
  cancelMute(): void {
    this.gainNode.gain.exponentialRampToValueAtTime(this.signVolume, this.playerDom.currentTime + 1)
  }
}

export default VolumeOperation
