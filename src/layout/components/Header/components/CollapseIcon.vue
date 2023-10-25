<script lang="js" setup>
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/settings.js'

const settingStore = useSettingStore()
const collapsed = computed(() => settingStore.collapsed)
const changeCollapsed = () => {
  settingStore.collapsed = !settingStore.collapsed
}
</script>

<template>
  <div class="folder">
    <el-icon :size="22">
      <svg-icon
        v-if="collapsed"
        icon-class="header-expand"
        @click="changeCollapsed"
      />
      <svg-icon
        v-else
        icon-class="header-fold"
        @click="changeCollapsed"
      />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.folder {
  display: flex;
  align-items: center;
  padding: 0 15px;
}
</style>
