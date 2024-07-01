import Layout from '@/layout/index.vue'

const adminRoutes = [
  {
    path: '/supervisor',
    name: 'supervisor',
    component: Layout,
    meta: { title: '管理员', icon: 'admin', affix: false },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/authorize/sys-role/index.vue'),
        meta: { title: '角色管理', icon: 'role', affix: false, keepAlive: true }
      },
      {
        path: 'menus',
        name: 'Menus',
        component: () => import('@/views/authorize/sys-menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'menu',
          affix: false,
          keepAlive: true
        }
      },
      {
        path: 'api',
        name: 'Api',
        component: () => import('@/views/authorize/sys-api/index.vue'),
        meta: { title: 'api 管理', icon: 'api', affix: false, keepAlive: true }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/authorize/sys-dept/index.vue'),
        meta: { title: '部门管理', icon: 'tree', affix: false, keepAlive: true }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/authorize/sys-user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'user',
          affix: false,
          keepAlive: true
        }
      }
    ]
  }
]

export default adminRoutes
