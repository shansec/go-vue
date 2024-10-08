<script lang="js" setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsSetting } from '@/store/modules/tagsView.js'
import MoreButton from '../MoreButton/index.vue'

const route = useRoute()
const router = useRouter()
const tagsSetting = useTagsSetting()
const tagViewList = computed(() => tagsSetting.tagViewList)

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
  const indexTag = tagViewList.value.findIndex((item) => item.path === path)
  const nextTag =
    tagViewList.value[indexTag + 1] || tagViewList.value[indexTag - 1]
  if (!nextTag) return
  router.push(nextTag.path)
  tagsSetting.addView(nextTag)
  tagsSetting.delView(path)
}
const removeTab = (path) => {
  console.log(path)
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
    return tagsSetting.currentTagPath
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
          v-for="item in tagViewList"
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

<style lang="scss" scoped>
@import '@/style/variables.module';

.tag-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .tag-view {
    flex: 1;

    .el-tabs--card :deep(.el-tabs__header) {
      display: table-cell;
      padding: 0 10px;
      margin: 0;
      height: 40px;
      box-sizing: border-box;
      border-bottom: none !important;
      vertical-align: middle;
    }

    :deep(.el-tabs) {
      --el-tabs-header-height: 32px;

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

    :deep(.el-tabs__item) {
      padding: 0 10px;
    }

    :deep(.el-tabs .el-tabs__header .el-tabs__item.is-active) {
      padding: 0 10px;
      color: var(--el-color-primary);
      border: 1px solid var(--el-color-primary);
      border-radius: 3px;
    }

    .tabs {
      flex-shrink: 0;
      height: 100%;
    }
  }
}
</style>
