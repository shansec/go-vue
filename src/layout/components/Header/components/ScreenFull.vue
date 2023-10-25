<script lang="js" setup>
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <div class="screen-full">
    <el-tooltip
      content="全屏"
      placement="bottom"
    >
      <el-icon
        :size="16"
        @click="toggle"
      >
        <svg-icon
          v-if="!isFullscreen"
          icon-class="fullscreen"
        />
        <svg-icon
          v-else
          icon-class="exit-fullscreen"
        />
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
