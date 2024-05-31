<script lang="js" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserFilled, PhoneFilled } from '@element-plus/icons-vue'

import { login } from '@/api/User.js'
import { getCaptcha } from '@/api/Captcha'
import { useUserStore } from '@/store/modules/user.js'
import { useSettingStore } from '@/store/modules/settings.js'
import storage from '@/utils/storage'
import { successMsg } from '@/utils/message'

const ruleFormRef = ref(null)
const loading = ref(false)
const loginForm = reactive({
  username: 'admin',
  password: 'admin',
  phone: '13412345678',
  isPhoneLogin: false,
  captcha: '',
  captchaId: ''
})
const captcha = ref({})
const router = useRouter()
const userStore = useUserStore()
const settingStore = useSettingStore()
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  captcha: [{ message: '请输入验证码', trigger: 'blur' }]
})
const submitForm = () => {
  loading.value = true
  ruleFormRef.value.validate(async (value) => {
    if (value) {
      const res = await login(loginForm)
      if (res.code === 200) {
        const userData = res.data
        userStore.setToken(userData.token)
        userStore.setUserInfo(userData.user)
        settingStore.changeThemeSetting('themeColor', userData.user.themeColor)
        document.documentElement.style.setProperty(
          '--el-color-primary',
          userData.user.themeColor
        )
        // 存到缓存
        storage.set('token', userData.token)
        successMsg('登录成功')
        await router.push({
          name: 'Dashboard'
        })
        loading.value = false
      }
    } else {
      loading.value = false
    }
  })
}
const requestCaptcha = async () => {
  const res = await getCaptcha()
  rules.captcha.push({
    max: res.data.captchaLength,
    min: res.data.captchaLength,
    message: `请输入${res.data.captchaLength}位验证码`,
    trigger: 'blur'
  })
  captcha.value = res.data
  loginForm.captchaId = res.data.captchaId
}
const triLoginMethod = () => {
  loginForm.isPhoneLogin = !loginForm.isPhoneLogin
}

onMounted(() => {
  requestCaptcha()
})
</script>

<template>
  <div class="avatar_box">
    <img src="../../../../assets/go-vue.png" alt="头像" />
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
        <template v-if="!loginForm.isPhoneLogin">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名">
              <template #suffix>
                <el-icon><UserFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item prop="phone">
            <el-input v-model="loginForm.phone" placeholder="请输入手机号">
              <template #suffix>
                <el-icon><PhoneFilled /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </template>
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
          <el-input v-model="loginForm.captcha" placeholder="请输入验证码" />
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
    <div class="trigger-box">
      <span @click="triLoginMethod">{{
        loginForm.isPhoneLogin ? '账号登录' : '手机号登录'
      }}</span>
    </div>
    <el-button
      :loading="loading"
      type="primary"
      class="login_btn"
      @click="submitForm()"
    >
      登录
    </el-button>
  </el-form>
</template>
<style lang="scss" scoped>
@import '../../index';
</style>
