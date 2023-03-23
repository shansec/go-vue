import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    token: null,
    userInfo: {},
  }),
  getters: {},
  actions: {
    login(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        this.token = username
        this.userInfo = userInfo
        resolve(username)
      })
    },
  },
})
