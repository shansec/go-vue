<script lang="js" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { initDB } from '@/api/Init'
import { successMsg } from '@/utils/message'

const router = useRouter()
const formRef = ref()
const form = reactive({
  dbType: 'mysql',
  host: '127.0.0.1',
  port: '3306',
  userName: 'root',
  password: '',
  dbName: 'may_db'
})
const rules = reactive({
  dbType: [{ required: true, message: '请选择数据库类型', trigger: 'blur' }],
  host: [{ required: true, message: '请输入数据库链接', trigger: 'blur' }],
  port: [{ required: true, message: '请输入数据库端口', trigger: 'blur' }],
  userName: [
    { required: true, message: '请输入数据库用户名', trigger: 'blur' }
  ],
  dbName: [{ required: true, message: '请输入数据库名称', trigger: 'blur' }]
})

const onSubmit = () => {
  formRef.value.validate(async (value) => {
    if (value) {
      const init = await initDB(form)
      if (init.code === 200) {
        successMsg(init.msg)
        await router.push({
          name: 'Login'
        })
      }
    } else {
      errorMsg('参数校验不通过')
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-left">
        <img src="../../assets/login/side-logo.png" />
      </div>
      <div class="login-form">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="100px"
          size="large"
        >
          <el-form-item label="数据库类型" prop="dbType">
            <el-select v-model="form.dbType" placeholder="请选择" class="full">
              <el-option key="mysql" label="mysql" value="mysql" />
            </el-select>
          </el-form-item>
          <el-form-item label="host" prop="host">
            <el-input v-model="form.host" placeholder="请输入数据库链接" />
          </el-form-item>
          <el-form-item label="port" prop="port">
            <el-input v-model="form.port" placeholder="请输入数据库端口" />
          </el-form-item>
          <el-form-item label="userName" prop="userName">
            <el-input
              v-model="form.userName"
              placeholder="请输入数据库用户名"
            />
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入数据库密码（没有则为空）"
            />
          </el-form-item>
          <el-form-item label="dbName" prop="dbName">
            <el-input v-model="form.dbName" placeholder="请输入数据库名称" />
          </el-form-item>
          <el-form-item>
            <div style="text-align: right">
              <el-button type="primary" @click="onSubmit">立即初始化</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 25px;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  box-sizing: border-box;

  .login-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 8px;

    .switch_dark {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .login-left {
      width: 50%;

      img {
        width: 100%;
        max-width: 900px;
      }
    }

    .login-form {
      position: relative;
      padding: 25px 40px;
      width: 50%;
      max-width: 480px;
      border-radius: 10px;
      box-shadow: 0 2px 12px #0000001a;
      box-sizing: border-box;

      .full {
        flex: 1;
      }

      :deep .el-form-item--large {
        margin-bottom: 15px;
      }
    }
  }
}

@media (width <= 850px) {
  .login-container {
    padding: 10px;
  }

  .login-box {
    .login-form {
      width: 88%;

      .title {
        font-size: 20px;
      }
    }
  }

  .login-left {
    display: none;
  }
}
</style>
