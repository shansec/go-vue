<script lang="ts" setup>
import { ref } from 'vue'
import { resolve } from 'path-browserify'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})
// 为了解决只有一个子路由展示问题
const onlyChild = ref(null)
const hasOneShowingChild = (parent, children = []) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    }
    // 临时设置
    onlyChild.value = item
    return true
  })
  // 只有一个字路由时，默认情况下会显示该子路由器
  if (showingChildren.length === 1) {
    return true
  }
  // 如果没有要显示的子路由器，则显示父路由
  if (showingChildren.length === 0) {
    onlyChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}
// 为了解决只有一个子路由展示问题
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return resolve(props.basePath, routePath)
}
</script>

<template>
  <template v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item, item.children)">
      <router-link :to="props.basePath">
        <el-menu-item :index="resolvePath(onlyChild.path)">
          <el-icon :size="20">
            <!--            <component :is="onlyChild.meta.icon"></component>-->
            <i class="iconfont" :class="onlyChild.meta.icon"></i>
          </el-icon>
          <template #title>{{ onlyChild.meta.title }}</template>
        </el-menu-item>
      </router-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <el-icon :size="20">
          <!--          <component :is="item.meta.icon"></component>-->
          <i class="iconfont" :class="item.meta.icon"></i>
        </el-icon>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
      <sub-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>
