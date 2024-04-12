<script lang="js" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar } from '@element-plus/icons-vue'

import { login } from '@/api/User.js'
import { useUserStore } from '@/store/modules/user.js'
import storage from '@/utils/storage'
import { successMsg } from '@/utils/message'
import { awaitWrap } from '@/utils/await'

const ruleFormRef = ref(null)
const loading = ref(false)
const registerForm = reactive({
  username: '',
  password: '',
})

const router = useRouter()
const userStore = useUserStore()
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const submitForm = () => {
  loading.value = true
  ruleFormRef.value.validate(async(value) => {
    if (value) {
      const [err, data] = await awaitWrap(login(registerForm))
      if (data !== null) {
        const userData = data.data
        userStore.setToken(userData.token)
        userStore.setUserInfo(userData.user)
        // 存到缓存
        storage.set('token', userData.token)
        successMsg('登录成功')
        router.push({
          path: '/'
        })
        loading.value = false
      } else {
        console.log(err)
      }
    } else {
      loading.value = false
    }
  })
}
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
    :model="registerForm"
    label-width="0"
    :rules="rules"
    class="form"
    @keyup.enter="submitForm()"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
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
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
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
