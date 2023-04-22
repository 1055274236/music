<script lang="ts" setup>
import { reactive, onMounted, computed, watch, ref, Ref, onBeforeUnmount } from 'vue'
import { PlayMode } from '@renderer/utils/player/PlayOperation'
import { useMouseInElement } from '@vueuse/core'
import usePlayerStore from '@renderer/store/usePlayerStore'
import { Pause, LeftButton, RightButton, Play } from '@renderer/components/icon'

interface DataType {
  currentTime: number
  duration: number
  mode: PlayMode
  progressWidth: number
  mouseDown: boolean
  status: 'playing' | 'pause' | 'none'
  getCurrentInter: number
}

const playerStore = usePlayerStore()
const progressElement = ref() as Ref<HTMLElement>
const { elementX, elementWidth } = useMouseInElement(progressElement)
const data: DataType = reactive({
  currentTime: 0,
  duration: 0,
  mode: 'list',
  progressWidth: 3,
  mouseDown: false,
  status: playerStore.player.play.getStatus(),
  getCurrentInter: 0
})

onMounted(() => {
  data.status = playerStore.player.play.getStatus()
  data.duration = playerStore.player.play.getSong().duration || 0
  initListener()
})

onBeforeUnmount(() => {
  removeListener()
})

const initListener = (): void => {
  progressElement.value.addEventListener('mouseenter', progressMouseEnter)
  progressElement.value.addEventListener('mouseleave', progressMouseLever)
  progressElement.value.addEventListener('mousedown', progressMouseDown)
  document.addEventListener('mouseup', progressMouseUp)
  playerStore.player.play.addListener('afterChangePlayStatus', playAfterChangePlayStatus)
  playerStore.player.play.addListener('afterSetSrc', playAfterSetSrc)
}

function progressMouseEnter(): void {
  data.progressWidth = 6
}
function progressMouseLever(): void {
  data.progressWidth = 3
}
function progressMouseDown(): void {
  data.mouseDown = true
}
// 进度条松开
function progressMouseUp(): void {
  if (data.mouseDown) {
    data.mouseDown = false
    if (data.status !== 'none') {
      data.currentTime = Math.floor((elementX.value / elementWidth.value) * data.duration)
      data.currentTime =
        data.currentTime > 0
          ? data.currentTime < data.duration
            ? data.currentTime
            : data.duration
          : 0
      playerStore.player.play.setCurrentTime(Math.floor(data.currentTime))
    }
  }
}
function playAfterChangePlayStatus(): void {
  data.status = playerStore.player.play.getStatus()
}
function playAfterSetSrc(): void {
  data.duration = playerStore.player.play.getSong().duration || 0
}

const removeListener = (): void => {
  data.getCurrentInter && clearInterval(data.getCurrentInter)
  progressElement.value.removeEventListener('mouseenter', progressMouseEnter)
  progressElement.value.removeEventListener('mouseleave', progressMouseLever)
  progressElement.value.removeEventListener('mousedown', progressMouseDown)
  document.removeEventListener('mouseup', progressMouseUp)
  playerStore.player.play.removeListener('afterChangePlayStatus', playAfterChangePlayStatus)
  playerStore.player.play.removeListener('afterSetSrc', playAfterSetSrc)
}

const PrefixInteger = (num: number): string => {
  return (Array(2).join('0') + num).slice(-2)
}
// 进度条点击
const formatCurrent = computed(() => {
  if (!data.mouseDown) {
    const inter = Math.floor(data.currentTime / 60)
    const decimals = Math.floor(data.currentTime % 60)
    return `${PrefixInteger(inter)}:${PrefixInteger(decimals)}`
  }
  let _currentTime = Math.floor((elementX.value / elementWidth.value) * data.duration)
  _currentTime =
    _currentTime > 0 ? (_currentTime < data.duration ? _currentTime : data.duration) : 0
  const inter = Math.floor(_currentTime / 60)
  const decimals = Math.floor(_currentTime % 60)
  return `${PrefixInteger(inter)}:${PrefixInteger(decimals)}`
})
const formatDuration = computed(() => {
  const inter = Math.floor(data.duration / 60)
  const decimals = Math.floor(data.duration % 60)
  return `${PrefixInteger(inter)}:${PrefixInteger(decimals)}`
})
const percentage = computed(() => {
  let _v = 0
  if (!data.mouseDown) _v = (data.currentTime / data.duration) * 100 || 0
  else _v = Math.floor((elementX.value / elementWidth.value) * 100)
  _v = _v > 0 ? (_v < 100 ? _v : 100) : 0
  return _v
})

// 暂停/播放
const songPlay = (): void => {
  if (data.status === 'pause') {
    playerStore.player.play.play()
  } else if (data.status === 'playing') {
    playerStore.player.play.pause()
  }
}

// 切歌
const switchSong = (offset: number): void => {
  if (offset > 0) {
    playerStore.player.play.next(offset)
  } else if (offset < 0) {
    playerStore.player.play.last(offset * -1)
  }
}

// 播放进度监听
watch([(): string => data.status, (): boolean => data.mouseDown], () => {
  if (data.status === 'playing' && !data.mouseDown) {
    data.getCurrentInter && clearInterval(data.getCurrentInter)
    data.getCurrentInter = window.setInterval(() => {
      data.currentTime = playerStore.player.play.getCurrentTime()
    }, 300)
  } else {
    clearInterval(data.getCurrentInter)
  }
})
</script>

<template>
  <div class="mid-box">
    <div class="opration-opration">
      <div class="opration-item" @click="switchSong(-1)">
        <LeftButton />
      </div>
      <div class="opration-item" @click="songPlay">
        <Pause v-if="data.status === 'playing'" /> <Play v-else />
      </div>
      <div class="opration-item" @click="switchSong(1)">
        <RightButton />
      </div>
    </div>
    <div class="opration-progress">
      <div class="current-time">{{ formatCurrent }}</div>
      <div ref="progressElement" class="el-progress">
        <el-progress
          :percentage="percentage"
          :stroke-width="data.progressWidth"
          :show-text="false"
        />
      </div>
      <div class="duration">{{ formatDuration }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mid-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .opration-opration {
    display: flex;
    align-items: center;
    height: 25px;
    & > * {
      font-size: 28px;
      cursor: pointer;
      margin: 0 5px;
    }
  }
  .current-time {
    margin-right: 8px;
  }
  .opration-progress {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-progress {
      width: 100%;
      cursor: pointer;
    }
  }
  .duration {
    margin-left: 8px;
  }
}
</style>
