<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { Sound, Fold, SoundMute } from '@renderer/components/icon'
import { Song } from '@renderer/utils/player/type'
import usePlayerStore from '@renderer/store/usePlayerStore'

interface DataType {
  listShow: boolean
  mute: boolean
  list: Song[]
}

const playerStore = usePlayerStore()
const data: DataType = reactive({
  listShow: false,
  mute: playerStore.player.volume.getVolume() === 0,
  list: []
})
onMounted(() => {
  data.mute = playerStore.player.volume.getVolume() === 0
  initListener()
})

const initListener = (): void => {
  playerStore.player.volume.addListener('afterSetVolume', volumeAfterSetVolume)
  playerStore.player.play.addListener('afterSetSrc', playAfterSetSrc)
}

function volumeAfterSetVolume(): void {
  data.mute = playerStore.player.volume.getVolume() === 0
}
function playAfterSetSrc(): void {
  data.list = playerStore.player.play.getSongList()
}

const removeListener = (): void => {
  playerStore.player.volume.removeListener('afterSetVolume', volumeAfterSetVolume)
  playerStore.player.play.removeListener('afterSetSrc', playAfterSetSrc)
}

onBeforeUnmount(() => {
  removeListener()
})

// 静音
const mute = (): void => {
  playerStore.player.volume.mute()
}

const rowDbClick = (row: Song): void => {
  let _index = 0
  data.list.forEach((item, index) => {
    row.mid === item.mid && (_index = index)
  })
  playerStore.player.play.setSongIndex(_index)
}

const PrefixInteger = (num: number): string => {
  return (Array(2).join('0') + num).slice(-2)
}
const formatTime = (time: number): string => {
  const inter = PrefixInteger(Math.floor(time / 60))
  const decimals = PrefixInteger(Math.floor(time % 60))
  return `${inter}:${decimals}`
}
</script>

<template>
  <div class="right-box">
    <div class="volume" @click="mute">
      <SoundMute v-if="data.mute" />
      <Sound v-else />
    </div>
    <div class="songlist" @click="data.listShow = true">
      <Fold />
    </div>

    <el-drawer
      v-model="data.listShow"
      :show-close="false"
      destroy-on-close
      :with-header="false"
      style="-webkit-app-region: no-drag"
      :z-index="100"
      :size="400"
    >
      <header>
        <span>正在播放</span>
      </header>
      <el-table :data="data.list" stripe height="calc(100% - 30px)" @row-dblclick="rowDbClick">
        <el-table-column prop="name" label="歌曲名称" width="200" show-overflow-tooltip />
        <el-table-column label="歌手" width="80" show-overflow-tooltip>
          <template #default="scope">
            <div>
              <span v-for="(item, index) in scope.row.singer" :key="index">
                {{ item.name }}
                <span v-if="index !== scope.row.singer.length - 1">&nbsp;/&nbsp;</span>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时间" show-overflow-tooltip>
          <template #default="scope">
            <div>
              <span>{{ formatTime(scope.row.duration) }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.right-box {
  position: absolute;
  right: 6px;
  font-size: 28px;
  display: flex;
  align-items: center;
  height: 100%;
  & > * {
    cursor: pointer;
    margin: 0 6px;
  }
}
</style>
