<script lang="js" setup>
import { useRoute } from 'vue-router'
import { useTagsSetting } from '@/store/modules/tagsView.js'

const route = useRoute()
const tagsSetting = useTagsSetting()

const delCurrent = () => {
  tagsSetting.toLastView(route.path)
}

const delOther = () => {
  tagsSetting.delOtherView(route.path)
}

const delAllTag = () => {
  tagsSetting.delAllView()
  tagsSetting.goHome()
}
</script>

<template>
  <el-dropdown trigger="hover">
    <el-button
      size="small"
      type="primary"
    >
      <span>更多</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <!--        <el-dropdown-item><el-icon :size="14"><Refresh /></el-icon> 刷新当页</el-dropdown-item>-->
        <el-dropdown-item @click="delCurrent"><el-icon :size="14"><svg-icon icon-class="folder-remove" /></el-icon>
          关闭当前</el-dropdown-item>
        <el-dropdown-item @click="delOther"><el-icon :size="14"><svg-icon icon-class="folder-close" /></el-icon>关闭其他</el-dropdown-item>
        <el-dropdown-item @click="delAllTag"><el-icon :size="14"><svg-icon icon-class="folder-delete" /></el-icon>关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
