<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {})

const handleOpen = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]): void => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu default-active="1" class="main-menu" @open="handleOpen" @close="handleClose">
    <div class="label">发现音乐</div>
    <el-menu-item index="1" class="main-menu-item">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss">
.main-menu {
  border-right: none;
  .el-menu-item {
    border-radius: 5px;
    padding: 0 calc(var(--el-menu-base-level-padding) - 5px);
    margin: 2px 5px;
  }
}
</style>
