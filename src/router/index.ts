import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { useUserStore } from '@/store/modules/user'
import jwt_decode from 'jwt-decode'
import { echartsRouter } from '@/router/modules/echarts'

interface extendRoute {
  hidden?: boolean
}

interface isJwt {
  exp: number
}

export const constantRoutes: Array<RouteRecordRaw & extendRoute> = [
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'icon-yuzhiyibiaopan', affix: true }
      }
    ]
  },
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
]

export const asyncRouter = [echartsRouter]

const router = createRouter({
  // 创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录
  history: createWebHistory(),
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.getToken()
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
  if (to.path === '/login') {
    next()
  } else {
    if (!token) {
      next({ path: '/login' })
    } else {
      // 如果包含 token 检查其是否过期
      const decoded_token: isJwt = jwt_decode(token)
      const now = Date.now() / 1000
      if (decoded_token.exp < now) {
        // token 过期跳转到登录页面
        window.localStorage.clear()
        next({ path: '/login' })
      } else {
        next()
      }
    }
  }
})

export default router
