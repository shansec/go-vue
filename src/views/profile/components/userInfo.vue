<script lang="js" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import User from '@/api/User'
import storage from '@/utils/storage'
import { errorMsg, successMsg } from '@/utils/message'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})
const rules = {
  nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: "'请输入正确的邮箱地址",
      trigger: ['blur', 'change']
    }
  ],
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' }
    // {
    //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
    //   message: '请输入正确的手机号码',
    //   trigger: 'blur'
    // }
  ]
}
const form = ref(null)
const router = useRouter()
const submit = () => {
  form.value.validate((valid) => {
    if (valid) {
      User.updateUserInfo(props.user).then((response) => {
        if (response.code === 200) {
          storage.clear()
          successMsg(`${response.msg},请重新登录！`)
          router.push({ path: '/login' })
        } else {
          errorMsg(response.msg)
        }
      })
    }
  })
}
const close = () => {
  router.push({ path: '/dashboard' })
}
</script>

<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="用户昵称" prop="nickName">
      <el-input v-model="user.nickName" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="user.phone" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="user.email" maxlength="50" />
    </el-form-item>
    <!--    <el-form-item label="性别">-->
    <!--      <el-radio-group v-model="user.sex">-->
    <!--        <el-radio label="0">男</el-radio>-->
    <!--        <el-radio label="1">女</el-radio>-->
    <!--      </el-radio-group>-->
    <!--    </el-form-item>-->
    <el-form-item>
      <el-button type="primary" size="small" @click="submit">保存</el-button>
      <el-button type="danger" size="small" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>
