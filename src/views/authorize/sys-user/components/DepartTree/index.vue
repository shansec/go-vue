<script lang="js" setup>
import { getDeptList } from '@/api/Dept'
import { onMounted, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

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
const treeRef = ref()
const requestDept = () => {
  getDeptList(queryParams.value).then((res) => {
    if (res.code === 200) {
      deptList.value = res.data.list
      queryParams.value.page = res.data.page
      queryParams.value.pageSize = res.data.pageSize
    }
  })
}
const filterTreeNode = (key, data) => {
  return data.deptName.includes(key)
}
watch(
  () => queryParams.value.deptName,
  (key) => {
    treeRef.value.filter(key)
  }
)
onMounted(() => {
  requestDept()
})
</script>

<template>
  <div class="tree">
    <div class="query-box">
      <el-input
        v-model.trim="queryParams.deptName"
        :prefix-icon="Search"
        placeholder="请输入部门名称"
      />
    </div>
    <el-tree
      ref="treeRef"
      :data="deptList"
      :props="defaultProps"
      :default-expand-all="true"
      :filter-node-method="filterTreeNode"
    />
  </div>
</template>

<style lang="scss" scoped>
.tree {
  .query-box {
    padding-right: 10px;
    margin-bottom: 18px;
  }
}
</style>
