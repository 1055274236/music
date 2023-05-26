<script lang="ts" setup>
import SongApi from '@renderer/api/SongApi'
import { reactive, onMounted } from 'vue'
import { GetTopLists } from '@renderer/api/type/getTopLists'

interface DataType {
  topLists?: GetTopLists
}

const data: DataType = reactive({})
onMounted(() => {
  getLists()
})

const getLists = async (): Promise<void> => {
  const result = await SongApi.getTopLists()
  data.topLists = result
}
</script>

<template>
  <div id="ranking">
    <div
      v-for="rankingItem in data.topLists?.data.topList"
      :key="rankingItem.id"
      class="ranking-item"
    >
      <div class="ranking-cover">
        <img :src="rankingItem.picUrl" alt="" />
      </div>
      <div class="ranking-item-content">
        <div
          v-for="(rankingSong, rankingIndex) in rankingItem.songList"
          :key="rankingIndex"
          class="ranking-item-song"
        >
          <div class="song-title">{{ rankingSong.songname }}</div>
          <div class="song-singer">{{ rankingSong.singername }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#ranking {
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  .ranking-item {
    margin: 5px 10px 5px 10px;
    position: relative;
    width: calc(33% - 20px);
    min-width: 200px;
    cursor: pointer;

    &:hover {
      .ranking-item-content {
        opacity: 1;
      }
    }

    .ranking-cover {
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }

    .ranking-item-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #00000060;
      opacity: 0;
      color: white;
      transition: all 0.5s ease;
      padding: 5px;

      &:hover {
        .ranking-item-song {
          top: 10px;
        }
      }

      .ranking-item-song {
        position: relative;
        top: 20px;
        transition: all 0.5s ease;
        margin: 10px 0 10px 0;

        .song-title {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 5px;
        }

        .song-singer {
          text-align: right;
          position: relative;
          right: -50%;
          width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
