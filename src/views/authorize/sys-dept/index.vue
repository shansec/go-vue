<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getDeptList } from '@/api/Dept'
import { formatTimeToStr } from '@/utils/date'

const deptList = ref()
const total = ref(0)
const queryParams = ref({
  page: 1,
  pageSize: 10,
  deptName: '',
  status: ''
})
const formatTime = (rowData) => formatTimeToStr(rowData.CreatedAt)
const requestDept = () => {
  getDeptList(queryParams.value).then((res) => {
    if (res.code === 200) {
      deptList.value = res.data.list
      queryParams.value.page = res.data.page
      queryParams.value.pageSize = res.data.pageSize
      total.value = res.data.total
    }
  })
}

onMounted(() => {
  requestDept()
})
</script>

<template>
  <div class="dept-container">
    <el-table
      :data="deptList"
      style="width: 100%"
      header-row-class-name="header-row"
      row-key="deptId"
      border
    >
      <el-table-column prop="deptName" label="部门名称" width="500" />
      <el-table-column prop="sort" label="排序" width="160" />
      <el-table-column prop="status" label="状态" width="180">
        <template #default="scope">
          <el-tag v-if="scope.row.status === '1'" type="success" size="large"
            >可用</el-tag
          >
          <el-tag v-else type="danger" size="large">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreatedAt"
        label="创建时间"
        width="220"
        :formatter="formatTime"
      />
      <el-table-column label="操作">
        <template #default>
          <div class="operate-box">
            <el-button size="small" type="primary" text class="operate-btn">
              <svg-icon icon-class="table-update" />
              修改
            </el-button>
            <el-button size="small" type="danger" text class="operate-btn">
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
    />
  </div>
</template>

<style lang="scss">
.dept-container {
  padding: 20px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;

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
}
</style>
