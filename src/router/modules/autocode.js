import Layout from '@/layout/index.vue'

const autoCodeRoutes = [
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/package',
    children: [
      {
        path: 'package',
        name: 'Package',
        component: () => import('@/views/authorize/sys-autocode/index.vue'),
        meta: { title: '自动化包', icon: 'settings', affix: false }
      }
    ]
  }
]

export default autoCodeRoutes
