import { post } from '@/utils/request.js'

export default class User {
  /**
   * 用户登录
   * @param username 用户账号
   * @param password 用户密码
   * @returns user
   */
  static async login(username, password) {
    return post('/base/login', {
      username,
      password
    })
  }

  /**
   * 修改密码
   * @param data data 包含 原密码 和 旧密码
   * @returns string
   */
  static async modifyPassword(data) {
    return post('/user/modifyPassword', data)
  }
}
