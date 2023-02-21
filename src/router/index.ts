import { createRouter, createWebHistory } from 'vue-router'
import baseRoute from '@/router/modules/base'
import authRoute from '@/router/modules/authRoute'

const routes1 = [...baseRoute, ...authRoute]
// const roleType = '1'

function permissionRouter(router = routes1) {
  // return router.filter((item) => {
  //   if (item.children) item.children = permissionRouter(item.children);
  //   return item.meta.permission.includes(roleType);
  // });
  return router
}
export const routes = permissionRouter()
const router = createRouter({
  // 创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录
  history: createWebHistory(),
  routes,
  // 在页面之间导航时控制滚动的函数。可以返回一个 Promise 来延迟滚动
  // 这个功能只在支持 history.pushState 的浏览器中可用
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: '#app',
          top: 0,
          behavior: 'smooth',
        })
      }, 500)
    })
  },
})

router.beforeEach((to, from, next) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
  next()
})

export default router
