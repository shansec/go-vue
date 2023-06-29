import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import {useUserStore} from '@/store/modules/user';
interface extendRoute {
  hidden?:boolean
}

export const routesSet = []
// const roleType = '1'

// function permissionRouter(router = routesSet) {
//   return router.filter((item) => {
//     if (item.children) item.children = permissionRouter(item.children);
//     return item.meta.permission.includes(roleType);
//   });
//   return router
// }
export const constantRoutes: Array<RouteRecordRaw&extendRoute> = [
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'icon-shezhi', affix: true },
      },
    ],
  },
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true },
]
const router = createRouter({
  // 创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录
  history: createWebHistory(),
  routes: constantRoutes,
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
      next()
    }
  }
})

export default router
