import { defineStore } from 'pinia'
import router from '@/router'

export const useTagsSetting = defineStore({
  id: 'tagsSetting',
  state: () => ({
    tagViewValue: '/home',
    tagViews: []
  }),
  persist: {
    // 开启数据缓存
    enabled: true,
    strategies: [
      {
        // 本地存储的名称
        key: 'tagsSetting',
        // 本地存储的位置
        storage: localStorage
      }
    ]
  },
  getters: {},
  actions: {
    setButtonMenu(val: string) {
      this.tagViewValue = val
    },
    addView(view) {
      this.setButtonMenu(view.path)
      const includeView = this.tagViews.some((v) => v.path === view.path)
      if (includeView) return
      this.tagViews.push({ ...view, title: view.meta.title || 'no-name' })
    },
    delView(path) {
      this.tagViews = this.tagViews.filter((v) => v.path !== path)
    },
    toLastView(path) {
      const indexTag = this.tagViews.findIndex((item) => item.path === path)
      const nextTag = this.tagViews[indexTag + 1] || this.tagViews[indexTag - 1]
      if (!nextTag) return
      router.push(nextTag.path)
      this.addView(nextTag)
      this.delView(path)
    },
    delOtherView(path) {
      this.tagViews = this.tagViews.filter(
        (item) => item.path === path || item.meta.affix
      )
    },
    delAllView() {
      this.tagViews = this.tagViews.filter((item) => item.meta.affix)
    },
    goHome() {
      this.tagViewValue = '/home'
      router.push('/home')
    }
  }
})
