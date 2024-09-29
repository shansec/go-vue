<script lang="js" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const matchRoute = computed(() =>
  route.matched.filter((item) => item.meta && item.meta.title)
)
/**
 * 点击实现路由跳转
 * @param item 路由信息
 */
const handleLink = (item) => {
  const childLen = item.children.length
  let path = ''
  if (!childLen) {
    path = item.path
  } else {
    path = item.children[0].path
  }
  router.push({
    path: path
  })
}
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item
      v-if="matchRoute[0].meta.title !== '首页'"
      key="homepage"
      :to="{ name: 'Dashboard' }"
    >
      <div class="breadcrumb-item">
        <span class="breadcrumb-title">首页</span>
      </div>
    </el-breadcrumb-item>
    <template v-for="item in matchRoute">
      <el-breadcrumb-item v-if="item.path != '/layout'" :key="item.name">
        <span class="pointer" @click="handleLink(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
