import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 99999,
})
// axios.defaults.baseURL = '/api'
// request interceptors 接口请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore()
    const token: string = userStore.token

    if (token) {
      config.headers['Authorization'] = token
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
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

/**
 * @description 显示错误消息
 * @param opt 传入参数
 * @param err 错误消息
 * @param type  消息信息
 * @param duration  消息持续时间
 */
function showERRMessage(opt, err, type: any = 'error', duration = 5000) {
  ElMessage({
    message: err.msg,
    type: type,
    duration: duration,
  })
}

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
