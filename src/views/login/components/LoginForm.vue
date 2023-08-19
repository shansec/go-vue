<template>
  <div class="avatar_box">
    <img src="../../../assets/go-vue.png" alt="头像" />
    <h2 class="title">Go-Vue</h2>
  </div>
  <el-form
    ref="ruleFormRef"
    :model="loginForm"
    label-width="0"
    :rules="rules"
    class="form"
    @keyup.enter="submitForm(ruleFormRef)"
  >
    <el-form-item prop="account">
      <!-- 用户名-->
      <el-input
        v-model="loginForm.account"
        :prefix-icon="Avatar"
        placeholder="请输入用户名"
      />
    </el-form-item>
    <!-- 密码-->
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
        @click="submitForm(ruleFormRef)"
        >登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { Avatar, Lock } from '@element-plus/icons-vue'

import User from '@/api/User'
import { useUserStore } from '@/store/modules/user'

interface LoginForm {
  account: string
  password: string
}

const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const loginForm = reactive<LoginForm>({
  account: 'admin',
  password: 'admin'
})
const router = useRouter()
const userStore = useUserStore()
const rules = reactive<FormRules<LoginForm>>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      User.login(loginForm.account, loginForm.password)
        .then((res) => {
          const userData = res.data
          userStore.setToken(userData.token)
          userStore.setUserInfo(userData.user)

          router.push({
            path: '/'
          })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
@import url('../index.scss');
</style>
