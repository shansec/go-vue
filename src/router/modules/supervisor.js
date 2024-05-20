import Layout from '@/layout/index.vue'

const adminRoutes = [
  {
    path: '/supervisor',
    component: Layout,
    meta: { title: '管理员', icon: 'admin', affix: false },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/authorize/sys-user/index.vue'),
        meta: { title: '用户管理', icon: 'user', affix: false }
      },
      {
        path: 'api',
        name: 'Api',
        component: () => import('@/views/authorize/sys-api/index.vue'),
        meta: { title: 'api 管理', icon: 'api', affix: false }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/authorize/sys-dept/index.vue'),
        meta: { title: '部门管理', icon: 'tree', affix: false }
      }
    ]
  }
]

export default adminRoutes
