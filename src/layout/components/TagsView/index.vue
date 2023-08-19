<template>
  <div class="tag-container">
    <div class="tag-view">
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        class="tabs"
        @tab-click="tabClick"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in tagViews"
          :key="item.name"
          :path="item.path"
          :label="item.title"
          :name="item.path"
          :closable="!(item.meta && item.meta.affix)"
        >
          <template #label>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right-btn">
      <MoreButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsSetting } from '@/store/modules/tags'
import MoreButton from '@/layout/components/TagsView/components/MoreButton.vue'

const route = useRoute()
const router = useRouter()
const tagsSetting = useTagsSetting()
const tagViews = computed(() => tagsSetting.tagViews)

const addTag = () => {
  const { name } = route
  if (name === 'Login') {
    return
  }
  if (name) {
    tagsSetting.addView(route)
  }
  return false
}
const isActive = (path) => {
  return path === route.path
}
const toLastView = (path) => {
  const indexTag = tagViews.value.findIndex((item) => item.path === path)
  const nextTag = tagViews.value[indexTag + 1] || tagViews.value[indexTag - 1]
  if (!nextTag) return
  console.log(path)
  router.push(nextTag.path)
  tagsSetting.addView(nextTag)
  tagsSetting.delView(path)
}
const removeTab = (path) => {
  if (isActive(path)) {
    toLastView(path)
  } else {
    tagsSetting.delView(path)
  }
}
const tabClick = (tabItem) => {
  const path = tabItem.props.name
  router.push(path)
}

const editableTabsValue = computed({
  get: () => {
    return tagsSetting.tagViewValue
  },
  set: (val) => {
    tagsSetting.setButtonMenu(val)
  }
})

onMounted(() => {
  addTag()
})
watch(route, () => {
  addTag()
})
</script>

<style lang="scss" scoped>
@import url('@/style/variables.module.scss');

.tag-container {
  // box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // width: 100%;
  // height: 40px;
  padding: 0 10px;

  .tag-view {
    flex: 1;

    .el-tabs--card :deep(.el-tabs__header) {
      box-sizing: border-box;
      height: 40px;
      padding: 0 10px;
      margin: 0;
      border-bottom: none !important;
    }

    :deep(.el-tabs) {
      .el-tabs__nav {
        border: none;
      }

      .el-tabs__header .el-tabs__item {
        color: #ccc;
        border: none;
      }

      .el-tabs__header .el-tabs__item.is-active {
        color: var(--el-color-primary);
        border-bottom: 2px solid var(--el-color-primary);
      }
    }

    ::v-deep(.el-tabs__item) {
      padding: 0 10px;

      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 6px;
        content: '';
        background: #ccc;
        border-radius: 50%;
      }
    }

    ::v-deep(.el-tabs .el-tabs__header .el-tabs__item.is-active) {
      padding: 0 10px;
      color: var(--el-color-primary);
      border-bottom: 2px solid var(--el-color-primary);

      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 6px;
        content: '';
        background: var(--el-color-primary);
        border-radius: 50%;
      }
    }

    .tabs {
      flex-shrink: 0;
      height: 100%;
    }
  }
}
</style>
