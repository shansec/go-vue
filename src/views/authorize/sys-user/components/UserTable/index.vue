<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getUsersInfo, updateUserStatus, delUserInfo } from '@/api/User'
import { formatTimeToStr } from '@/utils/date'
import { confirmBox, successMsg } from '@/utils/message'

const userList = ref()
const queryParams = ref({
  page: 1,
  pageSize: 10
})
const total = ref(0)
const getUsersInfos = () => {
  getUsersInfo({
    page: queryParams.value.page,
    pageSize: queryParams.value.pageSize
  }).then((response) => {
    if (response.code === 200) {
      userList.value = response.data.list
      queryParams.value.page = response.data.page
      queryParams.value.pageSize = response.data.pageSize
      total.value = response.data.total
    }
  })
}
const getUsersInfoss = (e) => {
  console.log(e)
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
onMounted(() => {
  getUsersInfos()
})
</script>

<template>
  <div class="table">
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
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="getUsersInfoss()"
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
