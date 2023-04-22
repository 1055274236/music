import BaseOperation from './BaseOperation'
import { Listener } from './type'
type listenerMode = 'beforeSetVolume' | 'afterSetVolume'

class VolumeOperation extends BaseOperation {
  signVolume = 0
  gainNode: GainNode

  private beforeSetVolumeArr: Listener[] = []
  private afterSetVolumeArr: Listener[] = []

  private beforeSetVolume = (): void => this.listenerRun(this.beforeSetVolumeArr)
  private afterSetVolume = (): void => this.listenerRun(this.afterSetVolumeArr)

  constructor(gainNode: GainNode) {
    super()
    this.gainNode = gainNode
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

  setVolume(volume: number): number {
    this.beforeSetVolume()
    if (volume >= 0 && volume <= 1) this.gainNode.gain.value = volume
    this.afterSetVolume()
    return this.getVolume()
  }

  getVolume(): number {
    return this.gainNode.gain.value
  }

  mute(): void {
    if (this.getVolume() === 0) {
      this.setVolume(this.signVolume)
    } else {
      this.signVolume = this.getVolume()
      this.setVolume(0)
    }
  }
}

export default VolumeOperation
