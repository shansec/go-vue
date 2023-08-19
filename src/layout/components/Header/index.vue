<template>
  <div
    class="m-layout-header"
    :style="showTags ? 'height: 90px' : 'height: 50px'"
  >
    <div class="m-header-inner">
      <HeaderLeft />
      <HeaderRight />
    </div>
    <DynamicTags v-if="showTags" />
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/modules/settings'

import HeaderLeft from '@/layout/components/Header/components/HeaderLeft.vue'
import HeaderRight from '@/layout/components/Header/components/HeaderRight.vue'
import DynamicTags from '@/layout/components/TagsView/index.vue'
import { computed } from 'vue'

const settingStore = useSettingStore()
const showTags = computed(() => settingStore.themeConfig.showTagsView)
</script>

<style lang="scss" scoped>
.m-layout-header {
  width: 100%;
  height: 90px;
  box-shadow: 0 1px 4px #00152914;

  .m-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #eee;
  }
}
</style>
