import Layout from '@/layout/index.vue'

const userRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/authorize/sys-user/index.vue'),
        meta: { title: '用户管理', icon: 'user', affix: false }
      }
    ]
  }
]

export default userRoutes
