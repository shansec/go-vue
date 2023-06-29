import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    token: '',
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
     * 设置 token 为原始值
     */
    setInfoToNUll(): void {
      this.token = ''
      this.userInfo = {}
    },
    /**
     * 获取 token，用来判断是否已经登录
     */
    getToken(): string {
      return this.token
    },
    /**
     * 登陆成功，存储用户信息
     * @param userData
     */
    setUserInfo(userData: any): void {
      this.userInfo = userData
    },
    /**
     * 获取用户信息
     */
    getUserInfo(): object {
      return this.userInfo
    },
  },
})
