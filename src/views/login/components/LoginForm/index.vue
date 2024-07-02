<script lang="js" setup>
import { onMounted, reactive, ref } from 'vue'
import { UserFilled, PhoneFilled } from '@element-plus/icons-vue'

import { getCaptcha } from '@/api/Captcha'
import { useUserStore } from '@/store/modules/user.js'
import { errorMsg } from '@/utils/message'

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
const userStore = useUserStore()
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
const login = async (loginInfo) => {
  return await userStore.userLogin(loginInfo)
}
const submitForm = () => {
  ruleFormRef.value.validate(async (value) => {
    if (value) {
      const result = await login(loginForm)
      if (!result) {
        requestCaptcha()
      }
    } else {
      errorMsg('请完善必填信息')
      requestCaptcha()
    }
  })
}
const requestCaptcha = async () => {
  const res = await getCaptcha()
  captcha.value = res.data
  loginForm.captchaId = res.data.captchaId
}
// const triLoginMethod = () => {
//   loginForm.isPhoneLogin = !loginForm.isPhoneLogin
// }

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
    <!--    <div class="trigger-box">-->
    <!--      <span @click="triLoginMethod">{{-->
    <!--        loginForm.isPhoneLogin ? '账号登录' : '手机号登录'-->
    <!--      }}</span>-->
    <!--    </div>-->
    <custom-el-button
      :loading="loading"
      type="primary"
      class="login_btn"
      @pointer="submitForm"
    >
      <template #txt> <span>登录</span> </template>
    </custom-el-button>
  </el-form>
</template>
<style lang="scss" scoped>
@import '../../index';
</style>
