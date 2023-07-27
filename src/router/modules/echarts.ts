import Layout from '@/layout/index.vue'
export const echartsRouter = [
  {
    path: '/echarts',
    name: 'echarts',
    component: Layout,
    redirect: '/echarts/pie',
    meta: {
      title: 'Echarts',
      icon: 'icon-outline-chart-square'
    },
    children: [
      {
        path: '/echarts/pie',
        component: () => import('@/views/echarts/pieChart/index.vue'),
        name: 'pie',
        meta: { title: '饼图', icon: 'icon-pie-chart-sharp', affix: false }
      },
      {
        path: '/echarts/radar',
        component: () => import('@/views/echarts/radarChart/index.vue'),
        name: 'radar',
        meta: { title: '雷达图', icon: 'icon-leidatu', affix: false }
      },
      {
        path: '/echarts/migrate',
        component: () => import('@/views/echarts/migrateChart/index.vue'),
        name: 'migrate',
        meta: { title: '迁徙图', icon: 'icon-leidatu', affix: false }
      }
    ]
  }
]
