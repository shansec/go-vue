<script lang="js" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar, Lock } from '@element-plus/icons-vue'

import User from '@/api/User.js'
import { useUserStore } from '@/store/modules/user.js'
import storage from '@/utils/storage'
import { errorMsg, successMsg } from '@/utils/message'

const ruleFormRef = ref(null)
const loading = ref(false)
const loginForm = reactive({
  account: 'admin',
  password: 'admin'
})
const router = useRouter()
const userStore = useUserStore()
const rules = reactive({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const submitForm = async() => {
  loading.value = true
  ruleFormRef.value.validate((value) => {
    if (value) {
      User.login(loginForm.account, loginForm.password)
        .then((res) => {
          if (res.code === 200) {
            const userData = res.data
            userStore.setToken(userData.token)
            userStore.setUserInfo(userData.user)
            // 存到缓存
            storage.set('token', userData.token)
            successMsg('登录成功')
            router.push({
              path: '/'
            })
          }
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    } else {
      errorMsg('输入正确的账号密码才能提交哦~')
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="avatar_box">
    <img
      src="@/assets/go-vue.png"
      alt="头像"
    >
    <h2 class="title">Go-Vue</h2>
  </div>
  <el-form
    ref="ruleFormRef"
    :model="loginForm"
    label-width="0"
    :rules="rules"
    class="form"
    @keyup.enter="submitForm()"
  >
    <el-form-item prop="account">
      <el-input
        v-model="loginForm.account"
        :prefix-icon="Avatar"
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        :prefix-icon="Lock"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button
        :loading="loading"
        type="primary"
        class="login_btn"
        @click="submitForm()"
      >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
@import '../index';
</style>
