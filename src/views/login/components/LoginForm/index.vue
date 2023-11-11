<script lang="js" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar } from '@element-plus/icons-vue'

import { login } from '@/api/User.js'
import { getCaptcha } from '@/api/Captcha'
import { useUserStore } from '@/store/modules/user.js'
import storage from '@/utils/storage'
import { errorMsg, successMsg } from '@/utils/message'

const ruleFormRef = ref(null)
const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: 'admin',
  captcha: '',
  captchaId: ''
})
const captcha = ref({})
const router = useRouter()
const userStore = useUserStore()
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' }
  ]
})
const submitForm = async() => {
  loading.value = true
  ruleFormRef.value.validate((value) => {
    if (value) {
      login(loginForm)
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
          } else {
            errorMsg(res.msg)
            requestCaptcha()
          }
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    } else {
      loading.value = false
    }
  })
}
const requestCaptcha = () => {
  getCaptcha()
    .then((response) => {
      if (response.code === 200) {
        captcha.value = response.data
        loginForm.captchaId = response.data.captchaId
      } else {
        errorMsg(response.msg)
      }
    })
    .catch((err) => {
      errorMsg(err)
    })
}

onMounted(() => {
  requestCaptcha()
})
</script>

<template>
  <div class="avatar_box">
    <img
      src="../../../../assets/go-vue.png"
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
    <el-row>
      <el-col :span="24">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            :suffix-icon="Avatar"
            placeholder="请输入用户名"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-form-item prop="captcha">
          <el-input
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-image
          class="captcha"
          :src="captcha.picPath"
          @click="requestCaptcha"
        />
      </el-col>
    </el-row>
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
@import '../../index';
</style>
