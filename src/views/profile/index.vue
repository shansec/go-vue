<script lang="js" setup>
import { onMounted, ref } from 'vue'
import userAvatar from './components/UserAvatar/index.vue'
import userInfo from './components/UserInfo/index.vue'
import resetPwd from './components/ResetPwd/index.vue'
import { getUserInfo } from '@/api/User'

const user = ref({})
const activeTab = ref('userinfo')
const roleName = ref(null)
const deptName = ref(null)

const getUser = () => {
  getUserInfo().then((response) => {
    user.value = response.data.user
    roleName.value = user.value.sysRole.roleName
    deptName.value = '技术部'
  })
}
onMounted(() => {
  getUser()
})
</script>

<template>
  <BasicLayout>
    <template #wrapper>
      <el-row :gutter="10">
        <el-col
          :span="6"
          :xs="24"
        >
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>个人信息</span>
            </div>
            <div>
              <div class="text-center">
                <userAvatar :user="user" />
              </div>
              <ul class="list-group">
                <li class="list-group-item">
                  <svg-icon icon-class="user" />用户名称
                  <div class="pull-right">{{ user.nickName }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="phone" />手机号码
                  <div class="pull-right">{{ user.phone }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="email" />用户邮箱
                  <div class="pull-right">{{ user.email }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="tree" />所属部门
                  <div class="pull-right">{{ roleName }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="peoples" />所属角色
                  <div class="pull-right">{{ deptName }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="date" />创建日期
                  <div class="pull-right">{{ user.CreatedAt }}</div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="18"
          :xs="24"
        >
          <el-card>
            <div
              slot="header"
              class="clearfix"
            >
              <span>基本资料</span>
            </div>
            <el-tabs v-model="activeTab">
              <el-tab-pane
                label="基本资料"
                name="userinfo"
              >
                <userInfo :user="user" />
              </el-tab-pane>
              <el-tab-pane
                label="修改密码"
                name="resetPwd"
              >
                <resetPwd :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </BasicLayout>
</template>

<style lang="scss" scoped>
.box-card {
  .clearfix {
    font-size: 18px;
  }

  .text-center {
    text-align: center;
  }

  .list-group {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    width: 100%;
    flex-direction: column;

    .list-group-item {
      padding: 18px 0;
      width: 100%;
      border-top: 1px solid #e7eaec;

      .svg-icon {
        margin-right: 5px;
      }

      .pull-right {
        float: right;
      }
    }
  }
}
</style>
