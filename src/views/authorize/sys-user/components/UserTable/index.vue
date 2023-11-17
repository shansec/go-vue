<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getUsersInfo, updateUserStatus, delUserInfo, createUser } from '@/api/User'
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
    value: '1'
  },
  {
    name: '禁用',
    value: '2'
  }
])
const userSex = ref([
  {
    name: '男',
    value: '1'
  },
  {
    name: '女',
    value: '2'
  }
])
const title = ref('添加用户')
const isShowDialog = ref(false)
const userFormRef = ref()
const userForm = ref({
  username: '',
  nickName: '',
  deptId: 0,
  password: '',
  email: '',
  phone: '',
  status: '',
  sex: ''
})
const userRules = {
  username: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
  nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  deptId: [{ required: true, message: '归属部门不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
    { type: 'email', message: "'请输入正确的邮箱地址", trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}
const treeList = ref([])
const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'deptId'
}
const requestUsersInfo = () => {
  getUsersInfo(queryParams.value).then((response) => {
    if (response.code === 200) {
      userList.value = response.data.list
      queryParams.value.page = response.data.page
      queryParams.value.pageSize = response.data.pageSize
      total.value = response.data.total
    }
  })
}
const requestDept = () => {
  getDeptList(queryParams.value).then((res) => {
    if (res.code === 200) {
      treeList.value = res.data.list
    }
  })
}
const requestUserList = ({ page, limit }) => {
  queryParams.value.page = page
  queryParams.value.pageSize = limit
  requestUsersInfo()
}
const formatTime = (rowData) => formatTimeToStr(rowData.CreatedAt)
const updateRowInfo = (scope) => {
  console.log(scope.$index)
}
const showMessage = (scope) => {
  const msg = `确定删除编号为 ${scope.row.ID} 的用户吗？`
  confirmBox(msg, '确定', '取消', 'warning')
    .then(() => {
      const data = { uuid: scope.row.uuid }
      delUserInfo(data).then((res) => {
        successMsg(res.msg)
        userList.value = userList.value.filter((user) => {
          return user.uuid !== scope.row.uuid
        })
      })
    })
    .catch(() => {})
}
const updateStatus = (mark) => {
  return new Promise((resolve, reject) => {
    const data = { uuid: mark }
    updateUserStatus(data)
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
  userForm.value.deptId = node.deptId
}
const ShowDialog = () => {
  title.value = '添加用户'
  isShowDialog.value = true
}
const confirmSubmit = () => {
  createUser(userForm.value).then(res => {
    if (res.code === 200) {
      successMsg(res.msg)
      requestUsersInfo()
    }
  })
}
const cancelShow = () => {
  title.value = ''
  isShowDialog.value = false
  userFormRef.value.resetFields()
}
onMounted(() => {
  requestUsersInfo()
  requestDept()
})
</script>

<template>
  <div class="table">
    <div class="query-box">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="70px"
      >
        <el-form-item label="用户昵称">
          <el-input
            v-model.trim="queryParams.nickName"
            placeholder="请输入用户昵称"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="queryParams.phone"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryParams.status"
            placeholder="用户状态"
          >
            <el-option
              v-for="status in userStatus"
              :key="status.value"
              :label="status.name"
              :value="status.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="inquireUser"
          >
            <svg-icon icon-class="table-search" />
            查询
          </el-button>
          <el-button @click="resetQuery">
            <svg-icon icon-class="table-reset" />
            重置
          </el-button>
          <el-button
            type="primary"
            @click="ShowDialog"
          >
            <svg-icon icon-class="table-add" />
            增加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="userList"
      border
      style="width: 100%"
      header-row-class-name="header-row"
    >
      <el-table-column
        prop="ID"
        label="编号"
        width="100"
      />
      <el-table-column
        prop="userName"
        label="登录名"
        width="180"
      />
      <el-table-column
        prop="nickName"
        label="昵称"
        width="120"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        width="180"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="220"
      />
      <el-table-column
        prop="sysRole.roleName"
        label="部门"
        width="120"
      />
      <el-table-column
        prop="status"
        label="状态"
        width="120"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :disabled="scope.row.ID === 4"
            active-value="1"
            inactive-value="2"
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
              size="small"
              type="primary"
              text
              class="operate-btn"
              @click="updateRowInfo(scope)"
            >
              <svg-icon icon-class="table-update" />
              修改
            </el-button>
            <el-button
              v-if="scope.row.ID !== 4"
              size="small"
              type="danger"
              text
              class="operate-btn"
              @click="showMessage(scope)"
            >
              <svg-icon icon-class="table-delete" />
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
            <el-form-item
              label="用户昵称"
              prop="nickName"
            >
              <el-input
                v-model="userForm.nickName"
                placeholder="请输入用户昵称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="归属部门"
              prop="deptId"
            >
              <treeselect
                v-model="userForm.parentId"
                :data="treeList"
                :placeholder="'请选择归属部门'"
                :default-props="defaultProps"
                @get-selected-node="setDept"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="手机号码"
              prop="phone"
            >
              <el-input
                v-model="userForm.phone"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input
                v-model="userForm.email"
                placeholder="请输入邮箱"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="用户名称"
              prop="username"
            >
              <el-input
                v-model="userForm.username"
                placeholder="请输入用户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="用户密码"
              prop="password"
            >
              <el-input
                v-model="userForm.password"
                placeholder="请输入用户密码"
                type="password"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-select
                v-model="userForm.sex"
                placeholder="请选择"
              >
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
      <div
        slot="footer"
        class="dialog-footer"
        @click="confirmSubmit"
      >
        <el-button
          type="primary"
        >确 定</el-button>
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
