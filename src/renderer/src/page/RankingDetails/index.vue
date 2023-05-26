<script lang="ts" setup>
import SongApi from '@renderer/api/SongApi'
import { GetRanks } from '@renderer/api/type/getRanks'
import { reactive, onMounted } from 'vue'
import { Song } from '@renderer/utils/player/type'
import { SearchResultSong } from '@renderer/api/type'
import usePlayerStore from '@renderer/store/usePlayerStore'

interface DataType {
  ranks?: GetRanks
  sum: number
  page: number
  num: number
  isLoading: boolean
}

const playerStore = usePlayerStore()
const data: DataType = reactive({})
onMounted(() => {
  getList()
})

const getList = async (): Promise<void> => {
  const result = await SongApi.getRanks()
  data.ranks = result
}

const loadSong = async (songIndex = 0): Promise<void> => {
  if (typeof songIndex !== 'number') songIndex = 0
  const song: Song[] = []
  data.ranks?.req_1.data.data.song.forEach((item) => {
    const songItem: Song = {
      mid: item.songId.toString(),
      name: item.title,
      singer: [{ mid: item.singerMid, name: item.singerName }],
      album: {
        mid: item.albumMid,
        img: item.cover
      }
    }
    song.push(songItem)
  })
  const result = (await SongApi.getMusicPlayLink(song.map((item) => item.mid))).req.data
  song.forEach((item, index) => {
    item.url = (result.sip[0] + result.midurlinfo[index].purl).replace(/ /g, '')
  })
  playerStore.player.play.setSongList(song, songIndex)
}

const rowDbClick = (row: SearchResultSong): void => {
  for (let i = 0; i < data.list.length; i++) {
    if (data.list[i].mid === row.mid) {
      loadSong(i)
      return
    }
  }
  console.error('该点击数据不属于列表')
}
</script>

<template>
  <div id="songresult">
    <div class="songresult-opration">
      <el-button round @click="loadSong(0)"> 播放全部 </el-button>
      <el-button round> 下载全部 </el-button>
    </div>
    <el-table
      v-loading="data.isLoading"
      :data="data.ranks?.req_1.data.data.song"
      stripe
      @row-dblclick="rowDbClick"
    >
      <el-table-column prop="name" label="歌曲名称" width="280" show-overflow-tooltip />
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
        @update:current-page="getList"
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
