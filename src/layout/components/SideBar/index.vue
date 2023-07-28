<template>
  <div class="sidebar-container">
    <Logo :collapsed="collapsed" v-if="showLogo" />
    <el-scrollbar style="height: calc(100% - 50px)" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        background-color="#191a23"
        text-color="#fff"
        :active-text-color="settingStore.themeConfig.themeColor"
        :collapse-transition="false"
        :unique-opened="settingStore.themeConfig.uniqueOpened"
        class="el-menu-vertical-demo"
        :collapse="collapsed"
      >
        <SubItem v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { constantRoutes } from '@/router'
import { useSettingStore } from '@/store/modules/settings'
import SubItem from '@/layout/components/SubMenu/SubItem.vue'
import Logo from '@/layout/components/SideBar/components/Logo.vue'

const route = useRoute()
const settingStore = useSettingStore()
const collapsed = computed(() => settingStore.collapsed)
const showLogo = computed(() => settingStore.themeConfig.showLogo)

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>
