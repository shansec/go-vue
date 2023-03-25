import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    token: null,
    userInfo: {},
  }),
  persist: {
    // 开启数据缓存
    enabled: true,
    strategies: [
      {
        // 本地存储的名称
        key: 'userStore',
        // 本地存储的位置
        storage: localStorage,
      },
    ],
  },
  getters: {},
  actions: {
    /**
     * 登陆成功，存储token
     * @param token
     */
    setToken(token: string): void {
      this.token = token
    },
    /**
     * 登陆成功，存储用户信息
     * @param userData
     */
    setUserInfo(userData: any): void {
      this.userInfo = userData
    },
  },
})
