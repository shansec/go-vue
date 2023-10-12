<script lang="ts" setup>
import BreadCrumb from '@/layout/components/Header/components/BreadCrumb.vue'
import CollapseIcon from '@/layout/components/Header/components/CollapseIcon.vue'
</script>

<template>
  <div class="m-tool-left">
    <CollapseIcon />
    <BreadCrumb />
  </div>
</template>

<style lang="scss" scoped>
.m-tool-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
