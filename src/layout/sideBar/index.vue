<script lang="js" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/store/modules/settings.js'
import { useRouterStore } from '@/store/modules/router.js'
import { SubItem, Logo } from '../components/index'

const route = useRoute()
const settingStore = useSettingStore()
const routerStore = useRouterStore()
const collapsed = computed(() => settingStore.collapsed)
const showLogo = computed(() => settingStore.showLogo)
const routers = routerStore.asyncRouter[0].children
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<template>
  <div class="sidebar-container">
    <Logo v-if="showLogo" :collapsed="collapsed" />
    <el-scrollbar
      style="height: calc(100% - 50px)"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :default-active="activeMenu"
        background-color="#191a23"
        text-color="#fff"
        :active-text-color="settingStore.themeColor"
        :collapse-transition="false"
        :unique-opened="settingStore.uniqueOpened"
        class="el-menu-vertical-demo"
        :collapse="collapsed"
      >
        <SubItem
          v-for="route in routers"
          :key="route.path"
          :item="route"
          :base-path="'/layout/' + route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
