import { defineStore } from 'pinia'
import { THRME_COLOR } from '@/config'

export const useSettingStore = defineStore({
  id: 'settingStore',
  state: () => ({
    // 是否收缩
    collapsed: false,
    themeConfig: {
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
      themeColor: THRME_COLOR
    }
  }),
  actions: {
    /**
     * 改变主题的样式
     * @param key 主题设置的 key
     * @param val 主题设置的 val
     */
    changeThemeSetting(key, val) {
      this.themeConfig[key] = val
    }
  }
})
