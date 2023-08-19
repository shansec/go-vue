<template>
  <div class="m-tool-right">
    <Search class="item-children" />
    <ScreenFull class="item-children" />
    <Setting class="item-children" />
    <Avatar class="item-children" />
  </div>
</template>

<script lang="ts" setup>
import Avatar from '@/layout/components/Header/components/HeaderRight/Avatar.vue'
import Setting from '@/layout/components/Header/components/HeaderRight/Setting.vue'
import ScreenFull from '@/layout/components/Header/components/HeaderRight/ScreenFull.vue'
import Search from '@/layout/components/Header/components/HeaderRight/Search.vue'
</script>
<style lang="scss" scoped>
.m-tool-right {
  display: flex;
  align-items: center;
  height: 100%;
  // padding-right: 15px;

  .item-children {
    margin-right: 15px;
    height: 100%;
  }
}
</style>
