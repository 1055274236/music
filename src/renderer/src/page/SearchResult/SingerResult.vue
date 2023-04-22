<script lang="ts" setup>
import { reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { SearchResultSinger } from '@renderer/api/type'
import SongApi from '@renderer/api/SongApi'

const route = useRoute()

interface DataType {
  list: SearchResultSinger[]
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
    mode: 1,
    num: data.num,
    page: data.page
  }).finally(() => {
    data.loading = false
  })
  data.sum === 0 && (data.sum = result.req.data.meta.sum)
  data.list = result.req.data.body.singer.list
  console.log(data.list)
}
</script>

<template>
  <div id="songresult">
    <el-table v-loading="data.loading" :data="data.list" stripe style="width: 100%">
      <el-table-column label="歌手名称" show-overflow-tooltip>
        <template #default="scope">
          <div>
            <span>{{ scope.row.singerName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="songNum" label="歌曲数量" width="180" show-overflow-tooltip />
      <el-table-column prop="albumNum" label="专辑数量" width="180" show-overflow-tooltip />
      <el-table-column prop="mvNum" label="MV数量" width="180" show-overflow-tooltip />
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
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
