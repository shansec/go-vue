<script lang="js" setup>
import { computed } from 'vue'
import { MHeader, Sidebar, Main } from './index'
import ThemeSetting from '@/components/ThemeSetting/index.vue'
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
      <MHeader />
      <Main />
      <ThemeSetting />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/variables.module';
@import '@/style/sidebar';

.container-layout {
  width: 100%;
  height: 100%;

  .main-container {
    position: relative;
  }
}
</style>
