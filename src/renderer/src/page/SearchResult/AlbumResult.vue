<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { SearchResultAlbum } from '@renderer/api/type'
import SongApi from '@renderer/api/SongApi'

const route = useRoute()

interface DataType {
  list: SearchResultAlbum[]
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
onBeforeMount(() => {
  getSearchResult()
})

const getSearchResult = async (): Promise<void> => {
  data.loading = true
  const keyword = (route.params.keyword as string) || '如果'
  const result = await SongApi.getSearchByKey({
    key: keyword,
    mode: 2,
    num: data.num,
    page: data.page
  }).finally(() => {
    data.loading = false
  })
  data.sum === 0 && (data.sum = result.req.data.meta.sum)
  data.list = result.req.data.body.album.list
  console.log(data.list)
}
</script>

<template>
  <div id="songresult">
    <el-table v-loading="data.loading" :data="data.list" stripe style="width: 100%">
      <el-table-column prop="albumName" label="专辑名称" show-overflow-tooltip />
      <el-table-column label="歌手" width="180" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <span v-for="(item, index) in scope.row.singer_list" :key="index">
              {{ item.name }}
              <span v-if="index !== scope.row.singer_list.length - 1">&nbsp;/&nbsp;</span>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="song_count" label="歌曲数量" width="80" show-overflow-tooltip />
      <el-table-column prop="publicTime" label="发布时间" width="180" show-overflow-tooltip />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="data.page"
        :page-size="data.num"
        small
        background
        layout="prev, pager, next"
        :total="data.sum"
        @update:current-page="getSearchResult"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#songresult {
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
