import { post } from '@/utils/request'

export default class User {
  static async login(username, password) {
    return post('/base/login', {
      username,
      password,
    })
    // return service({
    //   url: '/base/login',
    //   method: 'post',
    //   data: {
    //     username: username,
    //     password: password,
    //   },
    // })
  }
}
