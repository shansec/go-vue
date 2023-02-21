<template>
  <div class="setting">
    <el-tooltip content="主题设置" placement="bottom">
      <el-icon style="font-size: 20px" @click="showSetting"><Setting /></el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
  import { useSettingStore } from '@/store/modules/settings'

  const settingStore = useSettingStore()

  const showSetting = () => {
    settingStore.changeThemeSetting('showThemeSetting', !settingStore.themeConfig.showThemeSetting)
  }
</script>

<style lang="scss" scoped>
  .setting {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
