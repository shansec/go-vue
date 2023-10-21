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
      <el-icon style="font-size: 20px" @click="showSetting">
        <i class="iconfont icon-shezhi" />
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
