<script lang="js" setup>
import { useSettingStore } from '@/store/modules/settings.js'

const settingStore = useSettingStore()
</script>
<template>
  <div
    class="basic-layout"
    :style="settingStore.isDark ? '' : 'background: #fff'"
  >
    <slot name="wrapper" />
  </div>
</template>

<style lang="scss" scoped>
.basic-layout {
  width: 100%;
  height: 100%;
}
</style>
