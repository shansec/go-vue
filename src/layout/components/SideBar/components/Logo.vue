<template>
  <div :class="isCollaps ? 'collapsed_logo' : 'logo'">
    <img src="@/assets/go-vue.png" alt="logo" />
    <span v-if="!collapsed">Go-Vue</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingStore } from '@/store/modules/settings'

const settingStore = useSettingStore()
const isCollaps = computed(() => settingStore.collapsed)
defineProps({
  collapsed: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 20px;
  background-color: #191a23;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
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
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 20px;
  background-color: #191a23;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
