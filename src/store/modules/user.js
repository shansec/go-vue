import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    token: '',
    userInfo: {}
  }),
  persist: {
    // 开启数据缓存
    enabled: true,
    strategies: [
      {
        // 本地存储的名称
        key: 'userStore',
        // 本地存储的位置
        storage: localStorage
      }
    ]
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getUserInfo(state) {
      return state.userInfo
    }
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setInfoToNUll() {
      this.token = ''
      this.userInfo = {}
    },
    setUserInfo(userData) {
      this.userInfo = userData
    }
  }
})
