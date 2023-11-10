<script lang="js" setup>
import CollapseIcon from '@/layout/components/Header/components/CollapseIcon/index.vue'
import BreadCrumb from '@/layout/components/Header/components/BreadCrumb/index.vue'
import Setting from '@/layout/components/Header/components/Setting/index.vue'
import ScreenFull from '@/layout/components/Header/components/ScreenFull/index.vue'
import Avatar from '@/layout/components/Header/components/Avatar/index.vue'
</script>

<template>
  <div class="m-tool-left">
    <CollapseIcon />
    <BreadCrumb />
  </div>
  <div class="m-tool-right">
    <!--    <Search class="item-children" />-->
    <ScreenFull class="item-children" />
    <Setting class="item-children" />
    <Avatar class="item-children" />
  </div>
</template>

<style scoped lang="scss">
.m-tool-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

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
