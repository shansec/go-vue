<template>
  <div class="container-layout" :class="classObj">
    <Sidebar />
    <div class="main-container">
      <MyHeader></MyHeader>
      <Main></Main>
      <ThemeSetting />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { MyHeader, Sidebar, Main } from './components'
import ThemeSetting from '@/components/themeSetting/index.vue'
import { useSettingStore } from '@/store/modules/settings'

const settingStore = useSettingStore()
const classObj = computed(() => {
  return {
    hideSidebar: settingStore.collapsed,
    openSideBar: !settingStore.collapsed
  }
})
</script>
<style lang="scss" scoped>
@import url('@/style/index.scss');

.container-layout {
  width: 100%;
  height: 100%;

  .main-container {
    position: relative;
  }
}
</style>
