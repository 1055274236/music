<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { Song } from '@renderer/utils/player/type'
import { SongListDetailsSonglist } from '@renderer/api/type'
import SongApi from '@renderer/api/SongApi'
import SongListApi from '@renderer/api/SongListApi'
// import Player from '@renderer/utils/player'
import usePlayerStore from '@renderer/store/usePlayerStore'

const route = useRoute()

interface DataType {
  list: SongListDetailsSonglist[]
  disstname: string
  loading: boolean
  imgUrl: string
}

const data: DataType = reactive({
  list: [],
  disstname: 'Un',
  loading: false,
  imgUrl: ''
})
// const player = new Player()
const playerStore = usePlayerStore()
onBeforeMount(() => {
  getList()
})

const getList = async (): Promise<void> => {
  data.loading = true
  const disstid = (route.params['disstid'] as string) || ''
  const result = await SongListApi.getSongListDetail(disstid).finally(() => {
    data.loading = false
  })
  data.disstname = result.cdlist[0].dissname

  const _result = result.cdlist[0].songlist
  data.imgUrl = result.cdlist[0].logo
  data.list = _result.filter((item) => item.pay.pay_play === 0)
  // 接口只支持100位搜索，同时减少表格压力
  data.list.splice(100)
}

const loadSong = async (songIndex = 0): Promise<void> => {
  if (typeof songIndex !== 'number') songIndex = 0
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
  })
  const result = (await SongApi.getMusicPlayLink(song.map((item) => item.mid))).req.data
  song.forEach((item, index) => {
    item.url = (result.sip[0] + result.midurlinfo[index].purl).replace(/ /g, '')
  })
  playerStore.player.play.setSongList(song, songIndex)
}

const rowDbClick = (row: SongListDetailsSonglist): void => {
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
  <div id="songlist">
    <div class="songlist-label">
      <img :src="data.imgUrl" :alt="data.disstname" />{{ data.disstname }}
    </div>

    <div class="songresult-opration">
      <el-button round @click="loadSong(0)"> 播放全部 </el-button>
      <el-button round> 下载全部 </el-button>
    </div>
    <el-table v-loading="data.loading" :data="data.list" stripe @row-dblclick="rowDbClick">
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
  </div>
</template>

<style lang="scss" scoped>
#songlist {
  .songlist-label {
    font-weight: 600;
    margin-bottom: 12px;
    user-select: none;

    img {
      width: 100px;
      height: 100px;

      margin-right: 5px;
      border-radius: 5px;
    }
  }
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
