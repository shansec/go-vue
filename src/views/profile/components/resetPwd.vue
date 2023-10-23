<script lang="js" setup>
import User from '@/api/User'
import { reactive } from 'vue'

const user = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const equalToPassword = (rule, value, callback) => {
  if (this.user.newPassword !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ]
})

const submit = async () => {
  User.modifyPassword(user)
    .then(() => {
      // // 退出登录清除存储的数据
      // window.localStorage.clear()
      // // 设置 token 为空
      // userStore.setInfoToNUll()
      // router.replace('/login')
    })
    .catch(() => {
      console.log('修改密码失败')
    })
}

const close = () => {
  // this.$store.dispatch('tagsView/delView', this.$route)
  // this.$router.push({ path: '/index' })
  console.log('close')
}
</script>

<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        placeholder="请输入旧密码"
        type="password"
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        placeholder="请输入新密码"
        type="password"
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        placeholder="请确认密码"
        type="password"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="submit">保存</el-button>
      <el-button type="danger" size="small" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>
