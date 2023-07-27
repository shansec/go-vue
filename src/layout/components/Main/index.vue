<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in">
        <keep-alive>
          <component :is="useWrapComponents(Component, route)" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { useWrapComponents } from '@/hooks/useWrapComponents'
</script>
<style lang="scss" scoped>
.app-main {
  flex: 1;
  display: flex;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - 90px);

  .app-main-inner {
    flex: 1;
    display: flex;
    overflow-x: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: #f0f2f5;
  }
}
</style>
