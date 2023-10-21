<script lang="js" setup>
import Avatar from '@/layout/components/Header/components/Avatar.vue'
import Setting from '@/layout/components/Header/components/Setting.vue'
import ScreenFull from '@/layout/components/Header/components/ScreenFull.vue'
// import Search from '@/layout/components/Header/components/Search.vue'
</script>

<template>
  <div class="m-tool-right">
    <!--    <Search class="item-children" />-->
    <ScreenFull class="item-children" />
    <Setting class="item-children" />
    <Avatar class="item-children" />
  </div>
</template>

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
