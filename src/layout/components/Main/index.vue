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
  box-sizing: border-box;
  display: flex;
  flex: 1;
  width: 100%;
  height: calc(100% - 90px);
  overflow-x: hidden;

  .app-main-inner {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    width: 100%;
    padding: 20px;
    overflow-x: hidden;
    background: #f0f2f5;
  }
}
</style>
