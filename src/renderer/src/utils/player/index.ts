import PlayOperation from './PlayOperation'
import VolumeOperation from './VolumeOperation'

class Player {
  ac: AudioContext = new AudioContext()
  sourceNode: MediaElementAudioSourceNode
  gainNode: GainNode = this.ac.createGain()
  destinationNode: AudioDestinationNode = this.ac.destination
  volume: VolumeOperation
  play: PlayOperation

  constructor() {
    const sourceDom = document.createElement('audio')
    sourceDom.crossOrigin = 'anonymous'
    sourceDom.autoplay = false
    sourceDom.volume = 1
    this.sourceNode = this.ac.createMediaElementSource(sourceDom)

    this.sourceNode.connect(this.gainNode)
    this.gainNode.connect(this.destinationNode)

    this.volume = new VolumeOperation(this.gainNode)
    this.play = new PlayOperation(this.sourceNode)
  }
}

export default Player
