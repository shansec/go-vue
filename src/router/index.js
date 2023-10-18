import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'icon-yuzhiyibiaopan', affix: true }
      }
    ]
  },
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  // 创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
