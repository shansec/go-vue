import Layout from '@/layout/index.vue'
export const echartsRouter = [
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/pie',
    name: 'echarts',
    meta: {
      tile: 'Echarts',
      icon: 'icon-shezhi',
      affix: false
    },
    children: [
      {
        path: '/echarts/pie',
        component: () => import('@/views/echarts/pieChart/index.vue'),
        name: '饼图',
        meta: {
          tile: '饼图',
          icon: 'icon-shezhi',
          affix: false
        }
      }
    ]
  }
]
