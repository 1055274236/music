<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import SongListsVue from './SongLists/index.vue'
import ReCommendVue from './Recommend/index.vue'
import RankingVue from './Ranking/index.vue'

interface DataType {
  activeName: string
}

const data: DataType = reactive({
  activeName: 'recommend'
})
onMounted(() => {})

const tableChange = (activeName: string): void => {
  console.log(activeName)
}
</script>

<template>
  <div id="home">
    <el-tabs v-model="data.activeName" class="demo-tabs" @tab-change="tableChange">
      <el-tab-pane label="推荐" name="recommend" lazy><ReCommendVue /></el-tab-pane>
      <el-tab-pane label="歌单" name="songlist" lazy><SongListsVue /></el-tab-pane>
      <el-tab-pane label="榜单" name="ranking" lazy><RankingVue /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped></style>
