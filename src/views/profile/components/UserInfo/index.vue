<script lang="js" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { updateUserInfo } from '@/api/User'
import storage from '@/utils/storage'
import { successMsg } from '@/utils/message'

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
const userInfo = ref(props.user)
const submit = () => {
  form.value.validate(async (valid) => {
    if (valid) {
      const res = await updateUserInfo(userInfo.value)
      if (res.code === 200) {
        storage.clear()
        successMsg(`${data.msg},请重新登录！`)
        await router.push({ name: 'Login' })
      }
    }
  })
}
const close = () => {
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <el-form ref="form" :model="userInfo" :rules="rules" label-width="80px">
    <el-form-item label="用户昵称" prop="nickName">
      <el-input v-model="userInfo.nickName" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="userInfo.phone" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userInfo.email" maxlength="50" />
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
