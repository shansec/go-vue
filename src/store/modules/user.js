import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const userInfo = ref({})
  const roles = ref([])

  const getToken = computed(() => token.value)
  const getUserInfo = computed(() => userInfo.value)

  const setToken = (value) => {
    token.value = value
  }
  const initInfo = () => {
    token.value = ''
    userInfo.value = {}
  }
  const setUserInfo = (userData) => {
    userInfo.value = userData
    setRoles()
  }
  const setRoles = () => {
    roles.value.push('admin')
  }

  return {
    token,
    userInfo,
    roles,
    getToken,
    getUserInfo,
    setToken,
    initInfo,
    setUserInfo
  }
})
