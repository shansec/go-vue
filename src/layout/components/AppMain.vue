<script lang="js" setup>
import { computed } from 'vue'
import { useWrapComponents } from '@/hooks/use-wrap-components.js'
import { useSettingStore } from '@/store/modules/settings'
import { useTagsSetting } from '@/store/modules/tagsView'

const settingStore = useSettingStore()
const tagsStore = useTagsSetting()
const showTags = computed(() => settingStore.showTagsView)
</script>

<template>
  <div
    class="app-main"
    :style="showTags ? 'padding-top: 99px' : 'padding-top: 59px'"
  >
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsStore.keepAliveRouters">
          <component
            :is="useWrapComponents(Component, route)"
            :key="route.path"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  height: calc(100% - 90px);
  box-sizing: border-box;
  flex: 1;

  .app-main-inner {
    display: flex;
    overflow-x: hidden;
    padding: 20px;
    width: 100%;
    background: #f0f2f5;
    box-sizing: border-box;
    flex: 1;
  }
}
</style>
