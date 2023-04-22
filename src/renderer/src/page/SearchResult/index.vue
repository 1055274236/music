<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AlbumResult from './AlbumResult.vue'
import SingerResult from './SingerResult.vue'
import SongResult from './SongResult.vue'
import SongListResult from './SongListResult.vue'
import LyricResult from './LyricResult.vue'

const route = useRoute()

interface DataType {
  activeName: string
}

const data: DataType = reactive({
  activeName: '0'
})
onMounted(() => {})
</script>

<template>
  <div id="searchresult">
    <div class="search-label">搜索 {{ route.params.keyword }}</div>
    <el-tabs v-model="data.activeName" class="demo-tabs">
      <el-tab-pane label="单曲" name="0" lazy><SongResult /></el-tab-pane>
      <el-tab-pane label="歌手" name="1" lazy><SingerResult /></el-tab-pane>
      <el-tab-pane label="专辑" name="2" lazy><AlbumResult /></el-tab-pane>
      <el-tab-pane label="歌单" name="3" lazy><SongListResult /></el-tab-pane>
      <el-tab-pane label="歌词" name="7" lazy><LyricResult /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
#searchresult {
  .search-label {
    font-weight: 600;
    margin-bottom: 12px;
  }
}
</style>
