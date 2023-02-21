<template>
  <div :class="collapsed ? 'collapsed_logo' : 'logo'">
    <img src="@/assets/go-vue.png" alt="logo" />
    <span v-if="!collapsed">Go-Vue</span>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useSettingStore } from '@/store/modules/settings'

  const settingStore = useSettingStore()
  const collapsed = computed(() => settingStore.collapsed)
  defineProps({
    collapsed: {
      type: Boolean,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .logo {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    background-color: #191a23;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .collapsed_logo {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    background-color: #191a23;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
</style>
