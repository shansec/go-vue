import { post } from '@/utils/request'

export default class User {
  static async login(username, password) {
    return post('/login', {
      username,
      password,
    })
  }
}
