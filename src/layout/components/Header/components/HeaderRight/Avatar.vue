<template>
  <div class="avatar">
    <el-dropdown>
      <span class="avatar-show">
        <el-avatar
          :size="30"
          class="avatar-content"
          :src="userInfo.headerImg"
        />
        {{ userInfo.nickName }}
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="modifyDialogShow">
            <i class="iconfont icon-xiugaimima"></i>
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <i class="iconfont icon-guanbi"></i>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog
      v-model="modifyDialogVisible"
      :title="modifyDialogTitle"
      width="40%"
    >
      <el-form
        ref="modifyFormRef"
        :model="modifyForm"
        label-width="0"
        :rules="modifyRules"
        class="form"
      >
        <el-form-item prop="account" label="用户名" label-width="100px">
          <!-- 用户名-->
          <el-input
            v-model="modifyForm.account"
            disabled
            placeholder="请输入用户名"
          />
        </el-form-item>
        <!-- 旧密码-->
        <el-form-item prop="password" label="旧密码" label-width="100px">
          <el-input
            v-model="modifyForm.password"
            type="password"
            placeholder="请输入旧密码"
            show-password
          />
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item prop="newPassword" label="新密码" label-width="100px">
          <el-input
            v-model="modifyForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(modifyFormRef)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

import { useUserStore } from '@/store/modules/user'
import { reactive, ref } from 'vue'
import User from '@/api/User'

interface ModifyForm {
  uid: number
  account: string
  password: string
  newPassword: string
}

const router = useRouter()
const userStore = useUserStore()

const userInfo = ref<object>(userStore.getUserInfo())
const modifyDialogVisible = ref<boolean>(false)
const modifyDialogTitle = ref<string>('修改密码')
const modifyFormRef = ref<FormInstance>()
const modifyForm = reactive<ModifyForm>({
  uid: userInfo.value.ID,
  account: userInfo.value.userName,
  password: '',
  newPassword: ''
})
const modifyRules = reactive<FormRules<ModifyForm>>({
  password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
})
// 退出登录并清除缓存
const logout = () => {
  ElMessageBox.confirm('你是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 退出登录清除存储的数据
      window.localStorage.clear()
      // 设置 token 为空
      userStore.setInfoToNUll()
      router.replace('/login')
      ElMessage({
        type: 'success',
        message: '退出登录成功！'
      })
    })
    .catch(() => {
      console.log('取消退出登录')
    })
}
// 弹出修改密码弹出层
const modifyDialogShow = () => {
  modifyDialogVisible.value = true
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      User.modifyPassword(modifyForm)
        .then(() => {
          // 退出登录清除存储的数据
          window.localStorage.clear()
          // 设置 token 为空
          userStore.setInfoToNUll()
          router.replace('/login')
        })
        .catch(() => {
          console.log('修改密码失败')
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;

  .avatar-show {
    display: flex;
    align-items: center;
    height: 50px;

    .avatar-content {
      margin-right: 6px;
    }
  }
}

.form {
  width: 80%;
  margin: 0 auto;
}
</style>
