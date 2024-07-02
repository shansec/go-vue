import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import { useRouterStore } from './store/modules/router.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['Login', 'Init']

const getRouter = async (userStore) => {
  const routerStore = useRouterStore()
  await routerStore.setAsyncRouter()
  await userStore.getAsyncUserInfo()
  const asyncRouters = routerStore.asyncRouter
  asyncRouters.forEach((asyncRouter) => {
    router.addRoute(asyncRouter)
  })
}

router.beforeEach(async (to, from) => {
  const routerStore = useRouterStore()
  NProgress.start()
  const userStore = useUserStore()
  to.meta.matched = [...to.matched]
  const token = userStore.token
  // 在白名单中的判断情况
  document.title = getPageTitle(to.meta.title)
  if (to.meta.client) {
    return true
  }
  if (whiteList.indexOf(to.name) > -1) {
    if (token) {
      if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
        await getRouter(userStore)
      }
      // token 可以解析但是却是不存在的用户 id 或角色 id 会导致无限调用
      if (userStore.userInfo.sysRole.defaultRouter != null) {
        if (router.hasRoute(userStore.userInfo.sysRole.defaultRouter)) {
          return { name: userStore.userInfo.sysRole.defaultRouter }
        } else {
          return { path: '/layout/404' }
        }
      } else {
        // 强制退出账号
        userStore.initInfo()
        return {
          name: 'Login'
        }
      }
    } else {
      return true
    }
  } else {
    // 不在白名单中并且已经登录的时候
    if (token) {
      // 添加flag防止多次获取动态路由和栈溢出
      if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
        await getRouter(userStore)
        if (userStore.token) {
          if (router.hasRoute(userStore.userInfo.sysRole.defaultRouter)) {
            return { ...to, replace: true }
          } else {
            return { path: '/layout/404' }
          }
        } else {
          return {
            name: 'Login'
          }
        }
      } else {
        if (to.matched.length) {
          return true
        } else {
          return { path: '/layout/404' }
        }
      }
    }
    // 不在白名单中并且未登录的时候
    if (!token) {
      return {
        name: 'Login'
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(() => {
  // 路由发生错误后销毁进度条
  NProgress.remove()
})
