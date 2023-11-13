<script lang="js" setup>
import { getDeptList } from '@/api/Dept'
import { onMounted, ref } from 'vue'

const deptList = ref()
const queryParams = ref({
  page: 1,
  pageSize: 10,
  deptName: ''
})
const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'deptId'
}
const requestDept = () => {
  getDeptList(queryParams.value).then((res) => {
    if (res.code === 200) {
      deptList.value = res.data.list
      queryParams.value.page = res.data.page
      queryParams.value.pageSize = res.data.pageSize
    }
  })
}
onMounted(() => {
  requestDept()
})
</script>

<template>
  <div class="tree">
    <div class="query-box">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="70px"
      >
        <el-form-item label="部门名称">
          <el-input
            v-model.trim="queryParams.deptName"
            placeholder="请输入部门名称"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-tree
      :data="deptList"
      :props="defaultProps"
      :default-expand-all="true"
    />
  </div>
</template>
