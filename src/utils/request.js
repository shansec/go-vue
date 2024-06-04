import axios from 'axios'
import { useUserStore } from '@/store/modules/user.js'
import storage from '@/utils/storage'
import { errorMsg } from '@/utils/message'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 9999
})
// axios.defaults.baseURL = '/api'
// request interceptors 接口请求拦截
service.interceptors.request.use(
  (config) => {
    const token = storage.get('token')

    config.headers = {
      'x-token': token,
      ...config.headers
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptors 响应拦截
service.interceptors.response.use(
  (response) => {
    const userStore = useUserStore()
    if (response.headers['new-token']) {
      const token = response.headers['new-token']
      // 存储到 pinia
      userStore.setToken(token)
      // 存储到缓存中
      storage.set('token', token)
    }
    if (response.data.code === 200) {
      if (response.headers.msg) {
        response.data.msg = decodeURI(response.headers.msg)
      }
      return response.data
    } else if (response.data.code === 201) {
      errorMsg(response.data.msg || decodeURI(response.headers.msg))
      return response.data
    } else {
      if (response.data.data || response.data.data.reload) {
        errorMsg(response.data.msg || decodeURI(response.headers.msg))
        userStore.token = ''
        storage.clear()
        router.push({ name: 'Login', replace: true })
      }
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
