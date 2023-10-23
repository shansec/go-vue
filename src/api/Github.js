import axios from 'axios'

const service = axios.create()
export default class Github {
  static async Commits(page) {
    return service({
      url: `https://api.github.com/repos/shansec/go-vue/commits?page=${page}`,
      method: 'get'
    })
  }

  static async Members() {
    return service({
      url: `https://api.github.com/orgs/FLIPPED-AURORA/members`,
      method: 'get'
    })
  }
}
