<template>
  <el-switch
    v-model="themeConfig.idDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="switchDark"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useSettingStore } from '@/store/modules/settings'

const settingStore = useSettingStore()
// 主题设置
const themeConfig = computed(() => settingStore.themeConfig)
const switchDark = () => {
  const body = document.documentElement as HTMLElement
  if (themeConfig.value.idDark) {
    body.setAttribute('class', 'dark')
  } else {
    body.setAttribute('class', '')
  }
}
</script>
