import { post, get } from '@/utils/request.js'

export default class User {
  /**
   * 用户登录
   * @param username 用户账号
   * @param password 用户密码
   * @returns user
   */
  static async login(data) {
    return post('/base/login', data)
  }

  /**
   * 修改密码
   * @param data data 包含 原密码 和 旧密码
   * @returns string
   */
  static async modifyPassword(data) {
    return post('/user/modifyPassword', data)
  }

  /**
   * 获取用户信息
   * @returns user
   */
  static async getUserInfo() {
    return get('/user/getUserInfo')
  }

  /**
   * 修改用户信息
   * @param data 包含了用户信息
   * @returns string
   */
  static async updateUserInfo(data) {
    return post('/user/updateUserInfo', data)
  }
}
