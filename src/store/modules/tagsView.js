import { defineStore } from 'pinia'
import router from '@/router/index.js'
import { ref } from 'vue'

export const useTagsSetting = defineStore(
  'tagsSetting',
  () => {
    const tagViewValue = ref('/dashboard')
    const tagViews = ref([])
    const keepAliveViews = ref([])

    const setButtonMenu = (val) => {
      tagViewValue.value = val
    }
    const addView = (view) => {
      setButtonMenu(view.path)
      const includeView = tagViews.value.some((v) => v.path === view.path)
      if (includeView) return
      tagViews.value.push({ ...view, title: view.meta.title || 'no-name' })
      addKeepAliveView(view)
    }
    const delView = (path) => {
      const name = findNameByPath(path)
      tagViews.value = tagViews.value.filter((v) => v.path !== path)
      delKeepAliveView(name)
    }
    const toLastView = (path) => {
      const indexTag = tagViews.value.findIndex((item) => item.path === path)
      const nextTag =
        tagViews.value[indexTag + 1] || tagViews.value[indexTag - 1]
      if (!nextTag) return
      router.push(nextTag.path)
      addView(nextTag)
      delView(path)
    }
    const delOtherView = (path) => {
      const name = findNameByPath(path)
      tagViews.value = tagViews.value.filter(
        (item) => item.path === path || item.meta.affix
      )
      delKeepAliveView(name)
    }
    const delAllView = () => {
      tagViews.value = tagViews.value.filter((item) => item.meta.affix)
    }
    const goHome = () => {
      tagViewValue.value = '/dashboard'
      router.push('/dashboard')
    }
    const addKeepAliveView = (view) => {
      if (view && view.meta.keepAlive) {
        keepAliveViews.value.push(view.name)
      }
    }
    const delKeepAliveView = (name) => {
      if (name && keepAliveViews.value.includes(name)) {
        keepAliveViews.value = keepAliveViews.value.filter(
          (item) => item !== name || name === 'Dashboard'
        )
      }
    }
    const delAllKeepAliveView = () => {
      keepAliveViews.value = keepAliveViews.value.filter(
        (item) => item === 'Dashboard'
      )
    }
    const findNameByPath = (path) => {
      const tag = tagViews.value.find((tag) => tag.path === path)
      return tag ? tag.name : null
    }

    return {
      tagViewValue,
      tagViews,
      keepAliveViews,
      setButtonMenu,
      addView,
      delView,
      delAllView,
      goHome,
      addKeepAliveView,
      delKeepAliveView,
      delAllKeepAliveView,
      findNameByPath,
      toLastView,
      delOtherView
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'history',
          storage: localStorage
        }
      ]
    }
  }
)
