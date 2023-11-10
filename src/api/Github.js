import axios from 'axios'

const service = axios.create()
export const Commits = (page) => {
  return service({
    url: `https://api.github.com/repos/shansec/go-vue/commits?page=${page}`,
    method: 'get'
  })
}

export const Members = () => {
  return service({
    url: `https://api.github.com/orgs/FLIPPED-AURORA/members`,
    method: 'get'
  })
}
