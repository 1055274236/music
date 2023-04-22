<script setup lang="ts">
import { useToggle, useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-button :icon="isDark ? Moon : Sunny" @click="toggleDark()">
    <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
  </el-button>
</template>
