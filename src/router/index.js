import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/init',
    name: 'Init',
    component: () => import('@/views/init/index.vue'),
    hidden: true,
    meta: { title: '初始化' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/:catchAll(.*)',
    hidden: true,
    component: () => import('@/views/error/index.vue')
  }
]

const router = createRouter({
  // 创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
