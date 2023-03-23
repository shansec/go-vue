<template>
  <div class="avatar_box">
    <img src="../../../assets/go-vue.png" alt="头像" />
    <h2 class="title">Go-Vue</h2>
  </div>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="0" :rules="rules" class="form">
    <el-form-item prop="account">
      <!-- 用户名-->
      <el-input v-model="ruleForm.account" :prefix-icon="Avatar" />
    </el-form-item>
    <!-- 密码-->
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" :prefix-icon="Lock" type="password" show-password />
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button
        :loading="loading"
        type="primary"
        class="login_btn"
        @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { Avatar, Lock } from '@element-plus/icons-vue'

  import User from '@/api/User'

  interface FormState {
    account: string
    password: string
  }
  const ruleFormRef = ref<FormInstance>()
  const loading = ref(false)
  const ruleForm = reactive<FormState>({
    account: '',
    password: '',
  })
  const router = useRouter()
  const rules = reactive<FormRules>({
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  })
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        loading.value = true
        const res = User.login(ruleForm.account, ruleForm.password)
        console.log(res)
        // if (ruleForm.account === 'admin' && ruleForm.password === '123456') {
        //   ElNotification({
        //     type: 'success',
        //     title: '登录成功',
        //     message: '欢迎回来',
        //   })
        //   router.replace('/')
        // } else {
        //   ElNotification({
        //     type: 'error',
        //     title: '登录失败',
        //     message: '账户或密码有误',
        //   })
        // }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
