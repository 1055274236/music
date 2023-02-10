class BaseOperation {
  volume = 1

  playerDom!: HTMLMediaElement
  gainNode!: GainNode

  constructor(playerDom: HTMLMediaElement, gainNode: GainNode) {
    this.playerDom = playerDom
    this.gainNode = gainNode
  }
}

export default BaseOperation
