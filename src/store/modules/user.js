import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { login, requestUserInfo } from '@/api/User'
import { useRouterStore } from '@/store/modules/router.js'
import { useSettingStore } from '@/store/modules/settings.js'
import storage from '@/utils/storage'
import { ElLoading } from 'element-plus'
import router from '@/router/index.js'

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const userInfo = ref({})

  const getToken = computed(() => token.value)
  const getUserInfo = computed(() => userInfo.value)

  const loadingInstance = ref(null)
  const settingStore = useSettingStore()

  const setToken = (value) => {
    token.value = value
  }
  const initInfo = () => {
    token.value = ''
    userInfo.value = {}
  }
  const setUserInfo = (userData) => {
    userInfo.value = userData
  }

  const userLogin = async (loginInfo) => {
    loadingInstance.value = ElLoading.service({
      fullscreen: true,
      text: '登录中，请稍候...'
    })
    try {
      const loginRes = await login(loginInfo)
      if (loginRes.code === 200) {
        const userData = loginRes.data
        setToken(userData.token)
        setUserInfo(userData.user)
        settingStore.changeThemeSetting('themeColor', userData.user.themeColor)
        document.documentElement.style.setProperty(
          '--el-color-primary',
          userData.user.themeColor
        )
        // 存到缓存
        storage.set('token', userData.token)

        const routerStore = useRouterStore()
        await routerStore.setAsyncRouter()
        const asyncRouters = routerStore.asyncRouter
        asyncRouters.forEach((asyncRouter) => {
          router.addRoute(asyncRouter)
        })
        console.log(router)
        await router.push({
          name: 'Dashboard'
        })
        loadingInstance.value.close()
        return true
      }
    } catch (e) {
      loadingInstance.value.close()
    }
    loadingInstance.value.close()
  }

  const getAsyncUserInfo = async () => {
    const res = await requestUserInfo()
    if (res.code === 200) {
      const userData = res.data
      setUserInfo(userData.user)
      settingStore.changeThemeSetting('themeColor', userData.user.themeColor)
      document.documentElement.style.setProperty(
        '--el-color-primary',
        userData.user.themeColor
      )
    }
    return res
  }

  return {
    token,
    userInfo,
    getToken,
    getUserInfo,
    setToken,
    initInfo,
    setUserInfo,
    userLogin,
    getAsyncUserInfo
  }
})
