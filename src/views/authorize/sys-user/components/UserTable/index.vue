<script lang="js" setup>
import { onMounted, ref } from 'vue'
import {
  getUsersInfo,
  updateUserStatus,
  delUserInfo,
  createUser,
  updateUserInfo
} from '@/api/User'
import { getDeptList } from '@/api/Dept'
import { formatTimeToStr } from '@/utils/date'
import { confirmBox, successMsg } from '@/utils/message'
import Treeselect from '@/components/Treeselect/index.vue'

const userList = ref()
const queryParams = ref({
  page: 1,
  pageSize: 10,
  nickName: '',
  phone: '',
  status: ''
})
const total = ref(0)
const userStatus = ref([
  {
    name: '正常',
    value: 1
  },
  {
    name: '禁用',
    value: 2
  }
])
const userSex = ref([
  {
    name: '男',
    value: 1
  },
  {
    name: '女',
    value: 2
  }
])
const title = ref()
const type = ref()
const isShowDialog = ref(false)
const passEditable = ref(true)
const userFormRef = ref()
const activeValue = ref(1)
const inActiveValue = ref(2)
const treeList = ref([])
const userForm = ref({
  username: '',
  nickName: '',
  deptsId: 0,
  password: '',
  email: '',
  phone: '',
  status: '',
  sex: ''
})
const userRules = ref({
  username: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
  nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  deptsId: [{ required: true, message: '归属部门不能为空', trigger: 'blur' }],
  password: [
    { required: passEditable, message: '用户密码不能为空', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: "'请输入正确的邮箱地址",
      trigger: ['blur']
    }
  ],
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ]
})
const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'deptId'
}
const filterStatus = (value) => String(value)
const formReset = () => {
  userForm.value = {
    username: '',
    nickName: '',
    deptsId: 0,
    password: '',
    email: '',
    phone: '',
    status: '',
    sex: ''
  }
}
const requestUserList = ({ page, limit }) => {
  queryParams.value.page = page
  queryParams.value.pageSize = limit
  requestUsersInfo()
}
const formatTime = (rowData) => formatTimeToStr(rowData.CreatedAt)
const updateRowInfo = (row) => {
  const { userName, nickName, deptsId, email, phone, status, sex } = row
  userForm.value.username = userName
  userForm.value.nickName = nickName
  userForm.value.deptsId = deptsId
  userForm.value.email = email
  userForm.value.phone = phone
  userForm.value.status = status
  userForm.value.sex = sex
  passEditable.value = false
  openDialog('update')
  isShowDialog.value = true
}
const requestUsersInfo = async () => {
  const res = await getUsersInfo(queryParams.value)
  userList.value = res.data.list
  queryParams.value.page = res.data.page
  queryParams.value.pageSize = res.data.pageSize
  total.value = res.data.total
}
const requestDept = async () => {
  const res = await getDeptList(queryParams.value)
  treeList.value = res.data.list
}
const showMessage = (scope) => {
  const msg = `确定删除编号为 ${scope.row.ID} 的用户吗？`
  confirmBox(msg, '确定', '取消', 'warning').then(async () => {
    const param = { uuid: scope.row.uuid }
    const res = await delUserInfo(param)
    if (res.code === 200) {
      successMsg(res.msg)
      userList.value = userList.value.filter((user) => {
        return user.uuid !== scope.row.uuid
      })
      total.value = userList.value.length
    }
  })
}
const updateStatus = (mark) => {
  return new Promise((resolve, reject) => {
    const param = { uuid: mark }
    updateUserStatus(param)
      .then((response) => {
        successMsg(response.msg)
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}
const inquireUser = () => {
  queryParams.value.page = 1
  queryParams.value.pageSize = 10
  requestUsersInfo()
}
const resetQuery = () => {
  queryParams.value = {
    page: 1,
    pageSize: 10,
    nickName: '',
    phone: '',
    status: ''
  }
  requestUsersInfo()
}
const setDept = (node) => {
  userForm.value.deptsId = node.deptId
}
const ShowDialog = () => {
  openDialog('create')
}
const openDialog = (key) => {
  switch (key) {
    case 'create':
      title.value = '新增用户'
      type.value = key
      break
    case 'update':
      title.value = '编辑用户'
      type.value = key
      break
  }
  isShowDialog.value = true
}
const confirmCreateUser = () => {
  userFormRef.value.validate(async (value) => {
    if (value && passEditable.value) {
      switch (type.value) {
        case 'create':
          {
            const res = await createUser(userForm.value)
            if (res.code === 200) {
              successMsg(res.msg)
              requestUsersInfo()
              title.value = ''
              isShowDialog.value = false
              formReset()
            }
          }
          break
        case 'update':
          {
            const res = await updateUserInfo(userForm.value)
            if (res.code === 200) {
              successMsg(res.msg)
              requestUsersInfo()
              title.value = ''
              isShowDialog.value = false
              formReset()
            }
          }
          break
        default:
          errorMsg('未知操作')
      }
    }
  })
}
const cancelShow = () => {
  title.value = ''
  isShowDialog.value = false
  passEditable.value = true
  formReset()
}
onMounted(() => {
  requestUsersInfo()
  requestDept()
})
</script>

<template>
  <div class="table">
    <div class="query-box">
      <el-form :model="queryParams" :inline="true" label-width="70px">
        <el-form-item label="用户昵称">
          <el-input
            v-model.trim="queryParams.nickName"
            placeholder="请输入用户昵称"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="queryParams.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="用户状态">
            <el-option
              v-for="status in userStatus"
              :key="status.value"
              :label="status.name"
              :value="filterStatus(status.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <custom-el-button type="primary" @click="inquireUser">
            <template #prefix>
              <svg-icon icon-class="table-search" />
            </template>
            <template #txt> 查询 </template>
          </custom-el-button>
          <custom-el-button type="primary" :plain="true" @click="resetQuery">
            <template #prefix>
              <svg-icon icon-class="table-reset" />
            </template>
            <template #txt> 重置 </template>
          </custom-el-button>
          <custom-el-button type="primary" @click="ShowDialog">
            <template #prefix>
              <svg-icon icon-class="table-add" />
            </template>
            <template #txt> 新增 </template>
          </custom-el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="userList"
      border
      style="width: 100%"
      header-row-class-name="header-row"
    >
      <el-table-column prop="ID" label="编号" width="100" />
      <el-table-column prop="userName" label="登录名" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="邮箱" width="220" />
      <el-table-column prop="sysRole.roleName" label="角色" />
      <el-table-column prop="sysDept.deptName" label="部门" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :disabled="scope.row.sysRole.roleId === 888"
            :active-value="activeValue"
            :inactive-value="inActiveValue"
            :before-change="updateStatus.bind(this, scope.row.uuid)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="CreatedAt"
        label="创建时间"
        width="180"
        :formatter="formatTime"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <div class="operate-box">
            <el-button
              type="primary"
              text
              class="operate-btn"
              @click="updateRowInfo(scope.row)"
            >
              <el-icon><Edit /></el-icon>
              修改
            </el-button>
            <el-button
              v-if="scope.row.sysRole.roleId !== 888"
              type="primary"
              text
              class="operate-btn"
              @click="showMessage(scope)"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.pageSize"
      @pagination="requestUserList"
    />
    <!--  修改/增加用户  -->
    <el-dialog
      v-model="isShowDialog"
      :title="title"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :show-close="false"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input
                v-model="userForm.nickName"
                placeholder="请输入用户昵称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptsId">
              <treeselect
                v-model="userForm.deptsId"
                :data="treeList"
                :cur-value="userForm.deptsId"
                :placeholder="'请选择归属部门'"
                :default-props="defaultProps"
                @get-selected-node="setDept"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input
                v-model="userForm.phone"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="userForm.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username">
              <el-input
                v-model="userForm.username"
                placeholder="请输入用户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input
                v-model="userForm.password"
                placeholder="请输入用户密码"
                type="password"
                :disabled="!passEditable"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select v-model="userForm.sex" placeholder="请选择">
                <el-option
                  v-for="user in userSex"
                  :key="user.value"
                  :label="user.name"
                  :value="user.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="userForm.status">
                <el-radio
                  v-for="status in userStatus"
                  :key="status.value"
                  :label="status.value"
                >{{ status.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <!--            <el-form-item label="岗位">-->
            <!--              <el-select-->
            <!--                v-model="form.postId"-->
            <!--                placeholder="请选择"-->
            <!--                @change="$forceUpdate()"-->
            <!--              >-->
            <!--                <el-option-->
            <!--                  v-for="item in postOptions"-->
            <!--                  :key="item.postId"-->
            <!--                  :label="item.postName"-->
            <!--                  :value="item.postId"-->
            <!--                  :disabled="item.status == 1"-->
            <!--                />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->
          </el-col>
          <el-col :span="12">
            <!--            <el-form-item label="角色">-->
            <!--              <el-select-->
            <!--                v-model="form.roleId"-->
            <!--                placeholder="请选择"-->
            <!--                @change="$forceUpdate()"-->
            <!--              >-->
            <!--                <el-option-->
            <!--                  v-for="item in roleOptions"-->
            <!--                  :key="item.roleId"-->
            <!--                  :label="item.roleName"-->
            <!--                  :value="item.roleId"-->
            <!--                  :disabled="item.status == 1"-->
            <!--                />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->
          </el-col>
          <el-col :span="24">
            <!--            <el-form-item label="备注">-->
            <!--              <el-input-->
            <!--                v-model="form.remark"-->
            <!--                type="textarea"-->
            <!--                placeholder="请输入内容"-->
            <!--              />-->
            <!--            </el-form-item>-->
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmCreateUser">确 定</el-button>
        <el-button @click="cancelShow">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.header-row {
  height: 55px;
  color: #909399;

  & > th {
    background: #f8f8f9 !important;
  }
}

.operate-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  .operate-btn {
    padding: 5px 0 !important;
  }
}
</style>
