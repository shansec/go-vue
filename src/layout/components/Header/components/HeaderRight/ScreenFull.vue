<template>
  <div class="screen-full">
    <el-tooltip content="全屏" placement="bottom">
      <el-icon style="font-size: 20px" @click="toggle">
        <FullScreen />
      </el-icon>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core'
  const { toggle, isFullscreen } = useFullscreen()
</script>
<style lang="scss" scoped>
  .screen-full {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }</style
>·
