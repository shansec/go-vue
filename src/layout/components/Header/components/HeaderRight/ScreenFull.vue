<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <div class="screen-full">
    <el-tooltip content="全屏" placement="bottom">
      <el-icon style="font-size: 20px" @click="toggle">
        <i v-if="!isFullscreen" class="iconfont icon-fangda"></i>
        <i v-else class="iconfont icon-suoxiao"></i>
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.screen-full {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
