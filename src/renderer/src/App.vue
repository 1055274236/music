<script setup lang="ts">
import Menu from '@renderer/components/Menu.vue'
import TopMenu from './components/TopMenu.vue'
import BottomPlayer from './components/BottomPlayer/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh; width: 100vw; overflow: hidden">
      <el-header><TopMenu /></el-header>
      <el-container>
        <el-aside width="200px"><Menu /></el-aside>
        <el-main class="main-main">
          <router-view v-slot="{ Component, route }">
            <!-- 使用任何自定义过渡和回退到 `fade` -->
            <transition :name="route.meta.transition as string || 'fade'">
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </router-view>
          <el-backtop target=".main-main" :right="30" :bottom="100" />
        </el-main>
      </el-container>
      <el-footer><BottomPlayer /></el-footer>
    </el-container>
  </div>
</template>

<style lang="scss">
@import './assets/css/base.scss';
@import './assets/css/theme.scss';
@import './assets/css/transition.scss';
.common-layout {
  .el-header {
    --el-header-padding: 0;
  }
  .el-footer {
    --el-footer-padding: 0;
  }
  .main-main {
    border-left: solid 1px var(--el-menu-border-color);
    height: calc(100vh - 120px);
    overflow: auto;
  }
}
</style>
