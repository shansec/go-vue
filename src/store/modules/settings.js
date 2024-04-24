import { defineStore } from 'pinia'
import { THEME_COLOR } from '@/config/index.js'

export const useSettingStore = defineStore({
  id: 'settingStore',
  state: () => ({
    // 是否收缩
    collapsed: false,
    idDark: false,
    sideWidth: '300px',
    // 是否只保持一个子菜单的展开
    uniqueOpened: true,
    // 是否展示主题设置
    showThemeSetting: false,
    // 是否展示侧边栏Logo
    showLogo: true,
    // 是否显示标签栏
    showTagsView: true,
    // 灰色模式
    grey: false,
    // 色弱模式
    weakColor: false,
    // 主题颜色
    themeColor: THEME_COLOR
  }),
  actions: {
    CHANGE_SETTING (key, value) {
      if (Reflect.has(this, key)) {
        this[key] = value
      }
    },
    changeThemeSetting (key, val) {
      this.CHANGE_SETTING(key, val)
    }
  }
})
