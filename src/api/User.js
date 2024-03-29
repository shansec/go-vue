import service from '@/utils/request.js'

/**
 * 添加用户
 * @param data
 * @returns string
 */
export const createUser = (data) => {
  return service({
    url: '/user/register',
    method: 'POST',
    data
  })
}

/**
 * 修改密码
 * @param data data 包含 原密码 和 旧密码
 * @returns string
 */
export const modifyPassword = (data) => {
  return service({
    url: '/user/modifyPassword',
    method: 'POST',
    data
  })
}

/**
 * 用户登录
 * @param username 用户账号
 * @param password 用户密码
 * @returns user
 */
export const login = (data) => {
  return service({
    url: '/base/login',
    method: 'POST',
    data
  })
}

/**
 * 修改用户信息
 * @param data 包含了用户信息
 * @returns string
 */
export const updateUserInfo = (data) => {
  return service({
    url: '/user/updateUserInfo',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns user
 */
export const getUserInfo = () => {
  return service({
    url: '/user/getUserInfo',
    method: 'GET'
  })
}

/**
 * 获取用户列表
 * @returns []user
 */
export const getUsersInfo = (data) => {
  return service({
    url: '/user/getUsersInfo',
    method: 'POST',
    data
  })
}

/**
 * 更改用户信息
 * @returns string
 */
export const updateUserStatus = (data) => {
  return service({
    url: '/user/updateUserStatus',
    method: 'PUT',
    data
  })
}

/**
 * 删除用户信息
 * @returns string
 */
export const delUserInfo = (data) => {
  return service({
    url: '/user/delUserInfo',
    method: 'DELETE',
    data
  })
}
