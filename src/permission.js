import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import pinia from '@/store'
import { Message } from '@element-plus/icons-vue'
import storage from '@/utils/storage'
import { awaitWrap } from '@/utils/await'
import { getUserInfo } from '@/api/User'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const userStore = useUserStore(pinia)
  const hasToken = storage.get('token')
  if (hasToken) {
    if (to.path === '/login') {
      NProgress.done()
      return { name: 'Dashboard' }
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        return true
      } else {
        const [err, data] = await awaitWrap(getUserInfo())
        if (data !== null) {
          const user = data.data.user
          userStore.setUserInfo(user)
        } else {
          Message.error(err || 'has Error')
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
