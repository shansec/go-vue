import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import pinia from '@/store'
import { Message } from '@element-plus/icons-vue'
import storage from '@/utils/storage'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const userStore = useUserStore(pinia)
  const hasToken = storage.get('token')
  if (hasToken) {
    if (to.path === '/login') {
      NProgress.done()
      return { name: 'Home' }
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        return true
      } else {
        try {
          await userStore.getUserInformation()
          return true
        } catch (error) {
          Message.error(error || 'has Error')
          NProgress.done()
          return { name: 'Login' }
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      return true
    } else {
      NProgress.done()
      return { name: 'Login' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
