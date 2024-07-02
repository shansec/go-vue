import { defineStore } from 'pinia'
import { ref } from 'vue'
import { asyncRouterHandle } from '@/utils/asyncRouter'
import { getRoleMenu } from '@/api/Menu'

const notLayoutRouterArr = []

const formatRouter = (routers, parent) => {
  const routerRes = []

  // 遍历路由器列表
  routers &&
    routers.forEach((item) => {
      const baseRouter = {
        path: item.path,
        name: item.name,
        hidden: item.hidden,
        component: item.component,
        meta: item.meta,
        children: []
      }

      const hasSingleChild =
        Array.isArray(item.children) && item.children.length === 1
      if (hasSingleChild) {
        const child = item.children[0]
        Object.assign(baseRouter, {
          path: child.path,
          name: child.name,
          hidden: child.hidden,
          component: child.component,
          meta: child.meta
        })
      }

      baseRouter.children =
        Array.isArray(item.children) && item.children.length > 1
          ? formatRouter(item.children, item)
          : []

      // 将处理后的路由添加到结果数组
      routerRes.push(baseRouter)
    })
  return routerRes
}

export const useRouterStore = defineStore('routerStore', () => {
  const asyncRouter = ref([])
  const asyncRouterFlag = ref(0)
  // 从后台获取动态路由
  const setAsyncRouter = async () => {
    asyncRouterFlag.value++
    const baseRouter = [
      {
        path: '/layout',
        name: 'Layout',
        component: 'layout/index.vue',
        meta: {
          title: '底层layout'
        },
        children: []
      }
    ]
    if (notLayoutRouterArr.length !== 0) {
      baseRouter.push(...notLayoutRouterArr)
    }
    const asyncRouterRes = await getRoleMenu()
    baseRouter[0].children.push(...formatRouter(asyncRouterRes.data.list))
    asyncRouterHandle(baseRouter)
    asyncRouter.value = baseRouter
    return true
  }

  return {
    setAsyncRouter,
    asyncRouter,
    asyncRouterFlag
  }
})
