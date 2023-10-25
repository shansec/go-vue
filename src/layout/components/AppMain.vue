<script lang="js" setup>
import { computed } from 'vue'
import { useWrapComponents } from '@/hooks/useWrapComponents.js'
import { useSettingStore } from '@/store/modules/settings'

const settingStore = useSettingStore()
const showTags = computed(() => settingStore.showTagsView)
</script>

<template>
  <div
    class="app-main"
    :style="showTags ? 'padding-top: 90px' : 'padding-top: 50px'"
  >
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in">
        <keep-alive>
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
