<script lang="js" setup>
import { useSettingStore } from '@/store/modules/settings.js'

const settingStore = useSettingStore()

const showSetting = () => {
  settingStore.changeThemeSetting(
    'showThemeSetting',
    !settingStore.showThemeSetting
  )
}
</script>

<template>
  <div class="setting">
    <el-tooltip content="主题设置" placement="bottom">
      <el-icon :size="18" @click="showSetting">
        <svg-icon icon-class="system" />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.setting {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
