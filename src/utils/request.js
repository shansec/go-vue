import axios from 'axios'
// 创建请求实例
const instance = axios.create({
  baseURL: '/api',
  // 指定请求超时的毫秒数
  timeout: 5000,
  // 表示跨域请求是否需要凭证
  withCredentials: false,
})
// 前置拦截器
instance.interceptors.request.use(
  function (config) {
    /**
     * 在这里一般会携带前端的参数发送给后台，比如下面的代码：
     * const token = getToken();
     * if(token) {
     *     config.header.token = token
     * }
     */
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
// 后置拦截器
instance.interceptors.request.use(
  function (response) {
    return response
  },
  function (error) {
    const { response } = error
    if (response && response.data) {
      return Promise.reject(error)
    }
    const { message } = error
    console.error(message)
    return Promise.reject(error)
  },
)
// 导出常用的函数
/**
 *
 * @param url
 * @param data
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function post(url, data, params) {
  if (data === void 0) {
    data = {}
  }
  if (params === void 0) {
    params = {}
  }
  return instance({
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
export function get(url, params) {
  if (params === void 0) {
    params = {}
  }
  return instance({
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
export function put(url, data, params) {
  if (data === void 0) {
    data = {}
  }
  if (params === void 0) {
    params = {}
  }
  return instance({
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
export function _delete(url, params) {
  if (params === void 0) {
    params = {}
  }
  return instance({
    method: 'delete',
    url,
    params,
  })
}
export default instance
