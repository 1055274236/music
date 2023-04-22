<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { SearchResultSong } from '@renderer/api/type'
import { Song } from '@renderer/utils/player/type'
import SongApi from '@renderer/api/SongApi'
import Player from '@renderer/utils/player'

const route = useRoute()

interface DataType {
  list: SearchResultSong[]
  num: number
  page: number
  sum: number
  loading: boolean
}

const data: DataType = reactive({
  list: [],
  num: 20,
  page: 1,
  sum: 0,
  loading: false
})
const player = new Player()
onBeforeMount(() => {
  getSearchResult()
})

const getSearchResult = async (): Promise<void> => {
  data.loading = true
  const keyword = (route.params.keyword as string) || '如果'
  const result = await SongApi.getSearchByKey({
    key: keyword,
    mode: 7,
    num: data.num,
    page: data.page
  }).finally(() => {
    data.loading = false
  })
  data.sum === 0 && (data.sum = result.req.data.meta.sum)
  data.list = result.req.data.body.song.list
  data.list = data.list.filter((item) => item.pay.pay_play === 0)
}

const loadSong = (index = 0): void => {
  const song: Song[] = []
  data.list.forEach((item) => {
    const songItem: Song = {
      mid: item.mid,
      name: item.name,
      duration: item.interval,
      singer: item.singer.map((singerItem) => ({
        mid: singerItem.mid,
        name: singerItem.name
      })),
      album: {
        mid: item.album.mid,
        name: item.album.name,
        img: `https://y.qq.com/music/photo_new/T002R300x300M000${item.album.pmid}.jpg?max_age=2592000`
      }
    }
    song.push(songItem)
    player.play.setSongList(song, index)
  })
}
</script>

<template>
  <div id="songresult">
    <div class="songresult-opration">
      <el-button round @click="loadSong"> 播放全部 </el-button>
      <el-button round> 下载全部 </el-button>
    </div>
    <el-table v-loading="data.loading" :data="data.list" stripe style="width: 100%">
      <el-table-column label="歌曲名称" width="280" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <span v-dompurify-html="scope.row.title_hilight"> </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="180" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <span v-for="(item, index) in scope.row.singer" :key="index">
              {{ item.name }}
              <span v-if="index !== scope.row.singer.length - 1">&nbsp;/&nbsp;</span>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="专辑" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <span>{{ scope.row.album.name }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="data.page"
        :page-size="data.num"
        small
        background
        layout="prev, pager, next"
        :total="data.sum"
        class="mt-4"
        @update:current-page="getSearchResult"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#songresult {
  .songresult-opration {
    margin-bottom: 12px;
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
