import { defineStore } from 'pinia'
import { THEME_COLOR } from '@/config/index.js'
import { ref, watchEffect } from 'vue'

export const useSettingStore = defineStore('settingStore', () => {
  // 是否收缩
  const collapsed = ref(false)
  // 是否为黑暗模式
  const isDark = ref(localStorage.getItem('theme') === 'dark')
  // 侧边栏的默认宽度
  const sideWidth = ref('300px')
  // 是否只保持一个子菜单的展开
  const uniqueOpened = ref(false)
  // 是否展示主题设置
  const showThemeSetting = ref(false)
  // 是否展示侧边栏Logo
  const showLogo = ref(true)
  // 是否显示标签栏
  const showTagsView = ref(true)
  // 灰色模式
  const grey = ref(false)
  // 色弱模式
  const weakColor = ref(false)
  // 主题颜色
  const themeColor = ref(THEME_COLOR)

  const changeThemeSetting = (key, value) => {
    switch (key) {
      case 'collapsed':
        collapsed.value = value
        break
      case 'uniqueOpened':
        uniqueOpened.value = value
        break
      case 'showThemeSetting':
        showThemeSetting.value = value
        break
      case 'showLogo':
        showLogo.value = value
        break
      case 'showTagsView':
        showTagsView.value = value
        break
      case 'grey':
        grey.value = value
        break
      case 'weakColor':
        weakColor.value = value
        break
      case 'themeColor':
        themeColor.value = value
        break
    }
  }

  watchEffect(() => {
    const body = document.documentElement
    if (isDark.value) {
      body.classList.add('dark')
      body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      body.classList.add('light')
      body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  })

  const changeDark = (dark) => {
    isDark.value = dark
  }

  return {
    collapsed,
    isDark,
    sideWidth,
    uniqueOpened,
    showThemeSetting,
    showLogo,
    showTagsView,
    grey,
    weakColor,
    themeColor,
    changeThemeSetting,
    changeDark
  }
})
