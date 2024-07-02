import { defineStore } from 'pinia'
import router from '@/router/index.js'
import { ref } from 'vue'

export const useTagsSetting = defineStore(
  'tagsSetting',
  () => {
    const DASHBOARD_NAME = 'Dashboard'
    const currentTagPath = ref('/layout/dashboard')
    const tagViewList = ref([])
    const keepAliveRouters = ref([])

    const setButtonMenu = (val) => {
      currentTagPath.value = val
    }
    const addView = (view) => {
      setButtonMenu(view.path)
      const includeView = tagViewList.value.some((v) => v.path === view.path)
      if (includeView) return
      tagViewList.value.push({ ...view, title: view.meta.title || 'no-name' })
      addKeepAliveView(view)
    }
    const delView = (path) => {
      const name = findNameByPath(path)
      tagViewList.value = tagViewList.value.filter((v) => v.path !== path)
      delKeepAliveView(name)
    }
    const toLastView = (path) => {
      const indexTag = tagViewList.value.findIndex((item) => item.path === path)
      const nextTag =
        tagViewList.value[indexTag + 1] || tagViewList.value[indexTag - 1]
      if (!nextTag) return
      router.push(nextTag.path)
      addView(nextTag)
      delView(path)
    }
    const delOtherView = (path) => {
      const name = findNameByPath(path)
      tagViewList.value = tagViewList.value.filter(
        (item) => item.path === path || item.meta.affix
      )
      delKeepAliveView(name)
    }
    const delAllView = () => {
      tagViewList.value = tagViewList.value.filter((item) => item.meta.affix)
    }
    const goHome = () => {
      currentTagPath.value = '/layout/dashboard'
      router.push({ name: DASHBOARD_NAME })
    }
    const addKeepAliveView = (view) => {
      if (view && view.meta.keepAlive) {
        keepAliveRouters.value.push(view.name)
      }
    }
    const delKeepAliveView = (name) => {
      if (name && keepAliveRouters.value.includes(name)) {
        keepAliveRouters.value = keepAliveRouters.value.filter(
          (item) => item !== name || name === DASHBOARD_NAME
        )
      }
    }
    const delAllKeepAliveView = () => {
      keepAliveRouters.value = keepAliveRouters.value.filter(
        (item) => item === DASHBOARD_NAME
      )
    }
    const findNameByPath = (path) => {
      const tag = tagViewList.value.find((tag) => tag.path === path)
      return tag ? tag.name : null
    }

    return {
      currentTagPath,
      tagViewList,
      keepAliveRouters,
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
