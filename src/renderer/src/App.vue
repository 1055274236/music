<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import Playder from '@renderer/utils/player/index'
const MainAudio = ref<HTMLMediaElement>()
let player: Playder

onMounted(() => {
  if (MainAudio.value !== undefined) {
    player = new Playder(MainAudio.value)
    provide('player', player)
  }
})
</script>

<template>
  <div>
    <audio ref="MainAudio" crossorigin="anonymous" autoplay="false"></audio>
  </div>
</template>

<style lang="less">
@import './assets/css/base.scss';
</style>
