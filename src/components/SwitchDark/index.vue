<script lang="js" setup>
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useSettingStore } from '@/store/modules/settings.js'

const settingStore = useSettingStore()
// 主题设置
const isDark = ref(settingStore.isDark)
const switchDark = () => {
  settingStore.changeDark(isDark.value)
}
</script>

<template>
  <el-switch
    v-model="isDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="switchDark"
  />
</template>
