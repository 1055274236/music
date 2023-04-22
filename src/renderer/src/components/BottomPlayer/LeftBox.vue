<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { Song } from '@renderer/utils/player/type'
import { Picture } from '@element-plus/icons-vue'
import usePlayerStore from '@renderer/store/usePlayerStore'

interface DataType {
  song: Song
}

const playerStore = usePlayerStore()
const data: DataType = reactive({
  song: { mid: '', name: 'undefind', url: '', singer: [] }
})
onMounted(() => {
  data.song = playerStore.player.play.getSong()
  initListener()
})

const initListener = (): void => {
  playerStore.player.play.addListener('afterSetSrc', playAfterSetSrc)
}

function playAfterSetSrc(): void {
  data.song = playerStore.player.play.getSong()
}

const removeListener = (): void => {
  playerStore.player.play.removeListener('afterSetSrc', playAfterSetSrc)
}

onBeforeUnmount(() => {
  removeListener()
})
</script>

<template>
  <div class="left-box">
    <div class="song-img">
      <el-image :src="data.song.album?.img">
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <!-- <img :src="data.song.album?.img" /> -->
    </div>

    <div class="song-info">
      <div class="song-name">
        <span>{{ data.song.name }}</span>
      </div>
      <div v-if="data.song.singer?.length ?? 0 > 0" class="song-singer">
        <span
          v-for="(singerItem, singerIndex) in data.song.singer"
          :key="singerIndex"
          class="singer-name"
        >
          <span v-if="singerIndex < (data.song.singer?.length || 1) - 1">{{
            singerItem.name + '&nbsp;/&nbsp;'
          }}</span>
          <span v-else>{{ singerItem.name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.left-box {
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  width: 20%;
  .song-img {
    margin-right: 6px;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    display: inline-block;
    width: 40px;
    box-sizing: border-box;
    vertical-align: top;
    .el-img {
      width: 100%;
      height: 100%;
    }
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: var(--el-fill-color-light);
      color: var(--el-text-color-secondary);
      font-size: 30px;
      .el-icon {
        font-size: 20px;
      }
    }
  }
  .song-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 46px);
    overflow: hidden;
    & > * {
      position: relative;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
