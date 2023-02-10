import PlayOperation from './PlayOperation'
import VolumeOperation from './VolumeOperation'

class Player {
  ac: AudioContext = new AudioContext()
  sourceDom!: HTMLMediaElement
  sourceNode: MediaElementAudioSourceNode
  gainNode: GainNode = this.ac.createGain()
  destinationNode: AudioDestinationNode = this.ac.destination
  config = {
    autoplay: false
  }

  constructor(carrier: string | HTMLAudioElement) {
    if (typeof carrier === 'string') {
      const dom = document.querySelector(carrier)
      if (dom instanceof HTMLMediaElement) {
        this.sourceDom = dom
      }
    } else {
      this.sourceDom = carrier
    }
    this.sourceNode = this.ac.createMediaElementSource(this.sourceDom)

    this.sourceNode.connect(this.gainNode)
    this.gainNode.connect(this.destinationNode)
  }

  volume = new VolumeOperation(this.sourceDom, this.gainNode)
  play = new PlayOperation(this.sourceDom, this.gainNode)
}

export default Player
