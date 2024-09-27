<script lang="js" setup>
import { useSettingStore } from '@/store/modules/settings.js'

const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  }
})

const settingStore = useSettingStore()
</script>
<template>
  <div
    class="w-full h-full"
    :style="settingStore.isDark ? '' : `background: ${props.bgColor}`"
  >
    <slot name="wrapper" />
  </div>
</template>
