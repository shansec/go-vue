import { defineStore } from 'pinia'
import router from '@/router/index.js'

export const useTagsSetting = defineStore({
  id: 'tagsSetting',
  state: () => ({
    tagViewValue: '/dashboard',
    tagViews: [],
    keepAliveViews: []
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'history',
        storage: localStorage
      }
    ]
  },
  getters: {},
  actions: {
    setButtonMenu (val) {
      this.tagViewValue = val
    },
    addView (view) {
      this.setButtonMenu(view.path)
      const includeView = this.tagViews.some((v) => v.path === view.path)
      if (includeView) return
      this.tagViews.push({ ...view, title: view.meta.title || 'no-name' })
      this.addKeepAliveView(view)
    },
    delView (path) {
      const name = this.findNameByPath(path)
      this.tagViews = this.tagViews.filter((v) => v.path !== path)
      this.delKeepAliveView(name)
    },
    toLastView (path) {
      const indexTag = this.tagViews.findIndex((item) => item.path === path)
      const nextTag = this.tagViews[indexTag + 1] || this.tagViews[indexTag - 1]
      if (!nextTag) return
      router.push(nextTag.path)
      this.addView(nextTag)
      this.delView(path)
    },
    delOtherView (path) {
      const name = this.findNameByPath(path)
      this.tagViews = this.tagViews.filter(
        (item) => item.path === path || item.meta.affix
      )
      this.delKeepAliveView(name)
    },
    delAllView () {
      this.tagViews = this.tagViews.filter((item) => item.meta.affix)
    },
    goHome () {
      this.tagViewValue = '/dashboard'
      router.push('/dashboard')
    },
    addKeepAliveView (view) {
      if (view && view.meta.keepAlive) {
        this.keepAliveViews.push(view.name)
      }
    },
    delKeepAliveView (name) {
      if (name && this.keepAliveViews.includes(name)) {
        this.keepAliveViews = this.keepAliveViews.filter(
          (item) => item !== name || name === 'Dashboard'
        )
      }
    },
    delAllKeepAliveView () {
      this.keepAliveViews = this.keepAliveViews.filter(
        (item) => item === 'Dashboard'
      )
    },
    // 通过页面的 path 获取 页面的 name, 调用时需要注意调用位置
    findNameByPath (path) {
      const tag = this.tagViews.find((tag) => tag.path === path)
      return tag ? tag.name : null
    }
  }
})
