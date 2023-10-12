<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/settings.js'

const settingStore = useSettingStore()
const isCollaps = computed(() => settingStore.collapsed)
defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div :class="isCollaps ? 'collapsed_logo' : 'logo'">
    <img src="@/assets/go-vue.png" alt="logo" />
    <span v-if="!collapsed">Go-Vue</span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: #191a23;

  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  span {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
}

.collapsed_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: #191a23;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
