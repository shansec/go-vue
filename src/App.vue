<script lang="js" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>
