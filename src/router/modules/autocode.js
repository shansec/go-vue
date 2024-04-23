import Layout from '@/layout/index.vue'

const autoCodeRoutes = [
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/index',
    children: [
      {
        path: 'index',
        name: 'Package',
        component: () => import('@/views/authorize/sys-autocode/index.vue'),
        meta: { title: '自动化包', icon: 'settings', affix: false }
      }
    ]
  }
]

export default autoCodeRoutes
