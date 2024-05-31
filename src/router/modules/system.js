import Layout from '@/layout/index.vue'

const systemRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/system',
    children: [
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/system/index.vue'),
        meta: { title: '服务器信息', icon: 'service-side', affix: false }
      }
    ]
  }
]

export default systemRoutes
