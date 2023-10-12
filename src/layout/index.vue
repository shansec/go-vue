<script lang="ts" setup>
import { computed } from 'vue'
import { MyHeader, Sidebar, Main } from './components/index.js'
import ThemeSetting from '@/components/themeSetting/index.vue'
import { useSettingStore } from '@/store/modules/settings.js'

const settingStore = useSettingStore()
const classObj = computed(() => {
  return {
    hideSidebar: settingStore.collapsed,
    openSideBar: !settingStore.collapsed
  }
})
</script>

<template>
  <div class="container-layout" :class="classObj">
    <Sidebar />
    <div class="main-container">
      <MyHeader />
      <Main />
      <ThemeSetting />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/index';

.container-layout {
  width: 100%;
  height: 100%;

  .main-container {
    position: relative;
  }
}
</style>
