<script lang="ts" setup>
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
    <el-icon :size="20">
      <Expand
        v-if="collapsed"
        @click="changeCollapsed"
      />
      <Fold
        v-else
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
