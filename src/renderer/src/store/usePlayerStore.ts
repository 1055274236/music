// stores/counter.js
import { defineStore } from 'pinia'
import Player from '@renderer/utils/player'

export default defineStore('usePlayerStore', {
  state: () => {
    return {
      player: new Player()
    }
  },

  actions: {}
})
