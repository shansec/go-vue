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
    /**
     *
     * @param val 路由的 path
     */
    setButtonMenu(val) {
      this.tagViewValue = val
    },

    /**
     * 向 tagViews 中添加路由信息
     * @param view 路由信息
     * @returns
     */
    addView(view) {
      this.setButtonMenu(view.path)
      const includeView = this.tagViews.some((v) => v.path === view.path)
      // eslint-disable-next-line no-useless-return
      if (includeView) return
      this.tagViews.push({ ...view, title: view.meta.title || 'no-name' })
    },

    /**
     * 删除 tagViews 中路由信息
     * @param path 路由的路径
     */
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
      this.tagViews = this.tagViews.filter((item) => item.path === path || item.meta.affix)
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
