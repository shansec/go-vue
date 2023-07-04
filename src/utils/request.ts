import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'
import { ElMessage, ElNotification } from 'element-plus'
import { log } from 'console'

const service = axios.create({
  baseURL: '/api',
  timeout: 99999,
})
// axios.defaults.baseURL = '/api'
// request interceptors 接口请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore()

    config.headers = {
      'x-token': userStore.token,
      ...config.headers
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// response interceptors 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const userStore = useUserStore()
    if(response.headers['new-token']) {
      userStore.setToken(response.headers['new-token'])
    }
    if (response.data.code === 0) {
      ElMessage({
        message: response.data.msg,
        type: 'success'
      })
    } else {
      ElMessage({
        message: response.data.msg,
        type: 'error'
      })
    }
    return response.data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 *
 * @param url
 * @param data
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function post(url, data = {}, params = {}) {
  return service({
    method: 'post',
    url,
    data,
    params,
  })
}

/**
 *
 * @param url
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function get(url, params = {}) {
  return service({
    method: 'get',
    url,
    params,
  })
}

/**
 *
 * @param url
 * @param data
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function put(url, data = {}, params = {}) {
  return service({
    method: 'put',
    url,
    data,
    params,
  })
}

/**
 *
 * @param url
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @private
 */
export function _delete(url, params = {}) {
  return service({
    method: 'delete',
    url,
    params,
  })
}

export default service
