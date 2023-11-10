import Layout from '@/layout/index.vue'

const deptRoutes = [
  {
    path: '/dept',
    component: Layout,
    redirect: '/dept/index',
    children: [
      {
        path: 'index',
        name: 'Dept',
        component: () => import('@/views/authorize/sys-dept/index.vue'),
        meta: { title: '部门管理', icon: 'tree', affix: false }
      }
    ]
  }
]

export default deptRoutes
