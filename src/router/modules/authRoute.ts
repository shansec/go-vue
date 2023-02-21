import Layout from '@/layout/index.vue'

export default [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'House',
          permission: ['1', '2', '3'],
          affix: true,
        },
      },
    ],
  },
  {
    path: '/homepage',
    name: 'homepage',
    redirect: '/homepage/dashboard',
    component: Layout,
    meta: {
      permission: ['1', '2', '3'],
      title: '安全监控',
      icon: 'CameraFilled',
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          permission: ['1', '2', '3'],
          title: '安全指数监控',
          icon: 'VideoCameraFilled',
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/assetManagement',
    name: 'assetManagement',
    redirect: '/assetManagement/assetList',
    component: Layout,
    meta: {
      permission: ['1', '2', '3'],
      title: '资产管理',
      icon: 'Folder',
    },
    children: [
      {
        path: 'assetList',
        name: 'assetList',
        meta: {
          permission: ['1', '2', '3'],
          title: '资产列表',
          icon: 'Collection',
        },
        component: () => import('@/views/assetManagement/assetList.vue'),
      },
      {
        path: 'assetDetail',
        name: 'assetDetail',
        meta: {
          permission: ['1', '2', '3'],
          title: '资产详情',
          icon: 'Tickets',
        },
        component: () => import('@/views/assetManagement/assetDetail.vue'),
      },
    ],
  },
  // { path: '*', redirect: '/', hidden: true, meta: { permission: ['1', '2', '3'] } },
]
