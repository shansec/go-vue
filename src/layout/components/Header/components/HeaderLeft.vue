<template>
  <div class="m-tool-left">
    <CollapseIcon />
    <BreadCrumb />
  </div>
</template>

<script lang="ts" setup>
  import BreadCrumb from '@/layout/components/Header/components/HeaderLeft/BreadCrumb.vue'
  import CollapseIcon from '@/layout/components/Header/components/HeaderLeft/CollapseIcon.vue'
</script>

<style lang="scss" scoped>
  .m-tool-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
