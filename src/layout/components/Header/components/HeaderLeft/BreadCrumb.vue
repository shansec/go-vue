<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-if="matchRoute[0].meta.title !== '首页'" key="homepage" :to="{ path: '/home' }">
      <div class="breadcrumb-item">
        <span class="breadcrumb-title">首页</span>
      </div>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in matchRoute" :key="item.name" :to="{ path: item.path }">
      <span @click="handleLink(item)">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const matchRoute = computed(() => route.matched.filter((item) => item.meta && item.meta.title))
/**
 * 点击实现路由跳转
 * @param item 路由信息
 */
const handleLink = (item) => {
  router.push({
    path: item.path
  })
}
</script>

<style scoped></style>
