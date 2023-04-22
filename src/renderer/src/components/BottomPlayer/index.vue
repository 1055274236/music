<script lang="ts" setup>
import LeftBox from './LeftBox.vue'
import MidBox from './MidBox.vue'
import RightBox from './RightBox.vue'
</script>

<template>
  <div id="player-box">
    <LeftBox />
    <MidBox />
    <RightBox />
  </div>
</template>

<style lang="scss" scoped>
#player-box {
  height: 100%;
  position: relative;
  user-select: none;
  // box-shadow: 1px 1px 17px #d9d4c7;
  border-top: solid 1px var(--el-menu-border-color);
  z-index: 10;
}
</style>
