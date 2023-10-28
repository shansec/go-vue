<script lang="js" setup>
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useSettingStore } from '@/store/modules/settings.js'

const settingStore = useSettingStore()
// 主题设置
const idDark = ref(settingStore.idDark)
const switchDark = () => {
  const body = document.documentElement
  if (idDark.value) {
    body.setAttribute('class', 'dark')
  } else {
    body.setAttribute('class', '')
  }
}
</script>

<template>
  <el-switch
    v-model="idDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="switchDark"
  />
</template>
