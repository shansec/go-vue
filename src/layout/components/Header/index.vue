<script lang="js" setup>
import { computed, ref, watch } from 'vue'
import { useSettingStore } from '@/store/modules/settings.js'

import HeaderLeft from '@/layout/components/Header/components/HeaderLeft.vue'
import HeaderRight from '@/layout/components/Header/components/HeaderRight.vue'
import DynamicTags from '@/layout/components/TagsView/index.vue'

const settingStore = useSettingStore()
const showTags = computed(() => settingStore.showTagsView)
const collapsed = computed(() => settingStore.collapsed)
const headerType = ref({
  height: '90px',
  width: 'calc(100% - 210px)'
})

watch(
  () => showTags.value,
  (value) => {
    if (value) {
      headerType.value.height = '90px'
    } else {
      headerType.value.height = '50px'
    }
  }
)

watch(
  () => collapsed.value,
  (value) => {
    console.log(value)
    if (value) {
      headerType.value.width = 'calc(100% - 60px)'
    } else {
      headerType.value.width = 'calc(100% - 210px)'
    }
  }
)
</script>

<template>
  <div class="m-layout-header" :style="headerType">
    <div class="m-header-inner">
      <HeaderLeft />
      <HeaderRight />
    </div>
    <DynamicTags v-if="showTags" />
  </div>
</template>

<style lang="scss" scoped>
.m-layout-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 998;
  height: 90px;
  background-color: #fff;
  box-shadow: 0 1px 4px #00152914;
  transition: width 0.28s ease;

  .m-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #eee;
  }
}
</style>
