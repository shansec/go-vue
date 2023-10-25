<script lang="js" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import User from '@/api/User'
import { useUserStore } from '@/store/modules/user'
import storage from '@/utils/storage'
import { successMsg } from '@/utils/message'

const router = useRouter()
const userStore = useUserStore()

const userInfo = ref(userStore.getUserInfo)
const form = ref(null)
const user = reactive({
  uid: userInfo.value.ID,
  account: userInfo.value.userName,
  password: '',
  newPassword: '',
  confirmPassword: ''
})
const equalToPassword = (rule, value, callback) => {
  if (user.newPassword !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  password: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ]
})

const submit = async () => {
  form.value.validate((value) => {
    if (value) {
      User.modifyPassword(user)
        .then((response) => {
          if (response.code === 200) {
            storage.clear()
            successMsg('修改密码成功，请重新登录！')
            router.push({ path: '/login' })
          }
        })
        .catch(() => {})
    }
  })
}

const close = () => {
  router.push({ path: '/dashboard' })
}
</script>

<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        v-model="user.password"
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
