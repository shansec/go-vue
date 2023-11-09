<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getUsersInfo, updateUserStatus, delUserInfo } from '@/api/User'
import { formatTimeToStr } from '@/utils/date'
import { confirmBox, successMsg } from '@/utils/message'

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
onMounted(() => {
  requestUsersInfo()
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
              :value="status.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inquireUser">
            <svg-icon icon-class="table-search" />
            查询
          </el-button>
          <el-button @click="resetQuery">
            <svg-icon icon-class="table-reset" />
            重置
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
      <el-table-column prop="ID" label="编号" width="100" />
      <el-table-column prop="userName" label="登录名" width="180" />
      <el-table-column prop="nickName" label="昵称" width="120" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="email" label="邮箱" width="220" />
      <el-table-column prop="sysRole.roleName" label="部门" width="120" />
      <el-table-column prop="status" label="状态" width="120">
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
