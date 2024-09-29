<script lang="js" setup>
import { computed, ref, watch } from 'vue'
import { useSettingStore } from '@/store/modules/settings.js'
import {
  DynamicTags,
  Setting,
  CollapseIcon,
  BreadCrumb,
  ScreenFull,
  Avatar,
  Search
} from '../components/index'

const settingStore = useSettingStore()
const showTags = computed(() => settingStore.showTagsView)
const collapsed = computed(() => settingStore.collapsed)
const headerType = ref({
  height: '99px',
  width: 'calc(100% - 210px)'
})

watch(
  () => showTags.value,
  (value) => {
    if (value) {
      headerType.value.height = '99px'
    } else {
      headerType.value.height = '59px'
    }
  }
)

watch(
  () => collapsed.value,
  (value) => {
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
      <div class="m-tool-left">
        <CollapseIcon />
        <BreadCrumb />
      </div>
      <div class="m-tool-right">
        <Search class="item-children" />
        <ScreenFull class="item-children" />
        <Setting class="item-children" />
        <Avatar class="item-children" />
      </div>
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
  height: 99px;
  background-color: #fff;
  box-shadow: 0 1px 4px #00152914;
  transition: width 0.28s ease;

  .m-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 59px;
    border-bottom: 1px solid #eee;

    .m-tool-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .m-tool-right {
      display: flex;
      align-items: center;
      height: 100%;

      .item-children {
        margin-right: 15px;
        height: 100%;
      }
    }
  }
}
</style>
