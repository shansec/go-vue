<script lang="js" setup>
import { useRouter } from 'vue-router'

import LoginForm from '@/views/login/components/LoginForm/index.vue'
import SwitchDark from '@/components/SwitchDark/index.vue'
import { checkDB } from '@/api/Init'
import { infoMsg } from '@/utils/message'

const router = useRouter()
const toInitialize = async () => {
  const init = await checkDB()
  if (init.data.isInited) {
    infoMsg(init.msg)
  } else {
    await router.push({
      name: 'Init'
    })
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <SwitchDark class="switch_dark" />
      <div class="login-left">
        <img src="../../assets/login/side-logo.png" />
      </div>
      <div class="login-form">
        <LoginForm />
        <el-button type="primary" class="login_btn" @click="toInitialize()">
          初始化
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index';
</style>
