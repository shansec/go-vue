<script lang="js" setup>
import { nextTick, onMounted, ref } from 'vue'
import {
  getDeptList,
  createDept,
  delDeptInfo,
  updateDeptInfo
} from '@/api/Dept'
import { formatTimeToStr } from '@/utils/date'
import Treeselect from '@/components/Treeselect/index.vue'
import { errorMsg, successMsg, confirmBox } from '@/utils/message'

defineOptions({
  name: 'Dept'
})

const deptList = ref()
const treeList = ref([])
const total = ref(0)
const deptStatus = ref([
  {
    name: '正常',
    value: '1'
  },
  {
    name: '禁用',
    value: '2'
  }
])
const queryParams = ref({
  page: 1,
  pageSize: 10,
  deptName: '',
  status: ''
})
const title = ref('')
const isShowDialog = ref(false)
const deptFormRef = ref()
const form = ref({
  deptId: 0,
  parentId: 0,
  deptName: '',
  sort: 0,
  leader: '',
  email: '',
  phone: '',
  status: ''
})
const rules = ref({
  parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
  deptName: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
  // sort: [{ required: true, message: '菜单顺序不能为空', trigger: 'blur' }],
  leader: [{ required: true, message: '负责人不能为空', trigger: 'blur' }],
  email: [
    {
      type: 'email',
      required: true,
      message: "'请输入正确的邮箱地址",
      trigger: ['blur', 'change']
    }
  ],
  phone: [
    {
      required: true,
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
const parentId = ref('1')
const isEdit = ref(false)
const type = ref()
const initForm = () => {
  if (form.value) {
    deptFormRef.value.resetFields()
  }
  form.value = {
    deptId: 0,
    parentId: 0,
    deptName: '',
    sort: 0,
    leader: '',
    email: '',
    phone: '',
    status: ''
  }
}
const ShowDialog = () => {
  openDialog('create')
}
const openDialog = (key) => {
  switch (key) {
    case 'create':
      title.value = '添加部门'
      type.value = key
      break
    case 'update':
      title.value = '修改部门'
      type.value = key
      break
  }
  parentId.value = '0'
  form.value.parentId = 0
  isShowDialog.value = true
}
const setParent = (node) => {
  form.value.parentId = node.deptId
  console.log(form.value)
}
const deptCreate = (row) => {
  openDialog('create')
  parentId.value = row.deptId.toString()
  form.value.parentId = row.deptId
  isShowDialog.value = true
}
const formatTime = (rowData) => formatTimeToStr(rowData.CreatedAt)
const inquireDept = () => {
  queryParams.value.page = 1
  queryParams.value.pageSize = 10
  requestDeptOfTable()
}
const resetQuery = () => {
  queryParams.value = {
    page: 1,
    pageSize: 10,
    deptName: '',
    status: ''
  }
}
const cancelDialog = () => {
  isShowDialog.value = false
  title.value = ''
  isEdit.value = false
  initForm()
}
const changeDept = (data) => {
  openDialog('update')
  parentId.value = data.parentId.toString()
  isEdit.value = true
  isShowDialog.value = true
  nextTick(() => {
    form.value = {
      deptId: data.deptId,
      parentId: data.parentId,
      deptName: data.deptName,
      sort: data.sort,
      leader: data.leader,
      email: data.email,
      phone: data.phone,
      status: data.status
    }
  })
}
const requestDeptOfTable = async () => {
  const res = await getDeptList(queryParams.value)
  deptList.value = res.data.list
  queryParams.value.page = res.data.page
  queryParams.value.pageSize = res.data.pageSize
  total.value = res.data.total
}
const requestDeptOfSelect = async () => {
  const res = await getDeptList(queryParams.value)
  const dept = { deptId: 0, deptName: '主类目', parentId: 0, children: [] }
  dept.children = res.data.list
  treeList.value.push(dept)
}
const confirmSubmit = () => {
  deptFormRef.value.validate(async (value) => {
    if (value) {
      switch (type.value) {
        case 'create':
          {
            const res = await createDept(form.value)
            if (res.code === 200) {
              successMsg(res.msg)
              queryParams.value = {
                page: 1,
                pageSize: 10,
                deptName: '',
                status: ''
              }
              isShowDialog.value = false
              title.value = ''
              isEdit.value = false
              initForm()
              requestDeptOfTable()
              requestDeptOfSelect()
            }
          }
          break
        case 'update':
          {
            const res = await updateDeptInfo(form.value)
            if (res.code === 200) {
              successMsg(res.msg)
              queryParams.value = {
                page: 1,
                pageSize: 10,
                deptName: '',
                status: ''
              }
              isShowDialog.value = false
              title.value = ''
              isEdit.value = false
              initForm()
              requestDeptOfTable()
              requestDeptOfSelect()
            }
          }
          break
        default:
          errorMsg('未知操作')
      }
    } else {
      errorMsg('请完善必填信息')
    }
  })
}
const removeDept = (data) => {
  const msg = '删除部门前，确保删除的部门不包含下级部门'
  confirmBox(msg, '确定删除', '取消', 'warning').then(async () => {
    const res = await delDeptInfo(data)
    if (res.code === 200) {
      successMsg(res.msg)
      treeList.value = []
      requestDeptOfTable()
      requestDeptOfSelect()
    }
  })
}

onMounted(() => {
  requestDeptOfTable()
  requestDeptOfSelect()
})
</script>

<template>
  <BasicLayout>
    <template #wrapper>
      <div class="dept-container">
        <div class="query-box">
          <el-form :model="queryParams" :inline="true" label-width="70px">
            <el-form-item label="部门名称">
              <el-input
                v-model.trim="queryParams.deptName"
                placeholder="请输入部门名称"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="queryParams.status" placeholder="部门状态">
                <el-option
                  v-for="status in deptStatus"
                  :key="status.value"
                  :label="status.name"
                  :value="status.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="inquireDept">
                <svg-icon icon-class="table-search" />
                查询
              </el-button>
              <el-button plain @click="resetQuery">
                <svg-icon icon-class="table-reset" />
                重置
              </el-button>
              <el-button plain @click="ShowDialog">
                <svg-icon icon-class="table-add" />
                新增
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="deptList" style="width: 100%" row-key="deptId" border>
          <el-table-column prop="deptName" label="部门名称" />
          <el-table-column prop="sort" label="排序" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag
                v-if="scope.row.status === '1'"
                type="success"
                size="large"
              >可用</el-tag>
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
            <template #default="scope">
              <div class="operate-box">
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="changeDept(scope.row)"
                >
                  <el-icon><Edit /></el-icon>
                  编辑
                </el-button>
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="deptCreate(scope.row)"
                >
                  <el-icon><Plus /></el-icon>
                  新增下级部门
                </el-button>
                <el-button
                  type="danger"
                  text
                  class="operate-btn"
                  @click="removeDept(scope.row)"
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
        />
        <!--  添加/修改部门弹框  -->
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
            ref="deptFormRef"
            :model="form"
            :rules="rules"
            label-width="80px"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="上级部门" prop="parentId">
                  <treeselect
                    v-model="form.parentId"
                    :data="treeList"
                    :placeholder="'请选择上级部门'"
                    :parent-id="parentId"
                    :default-props="defaultProps"
                    :is-edit="isEdit"
                    @get-selected-node="setParent"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门名称" prop="deptName">
                  <el-input
                    v-model="form.deptName"
                    placeholder="请输入部门名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="显示排序" prop="sort">
                  <el-input-number
                    v-model="form.sort"
                    controls-position="right"
                    :min="0"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人" prop="leader">
                  <el-input
                    v-model="form.leader"
                    placeholder="请输入负责人"
                    maxlength="20"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phone">
                  <el-input
                    v-model="form.phone"
                    placeholder="请输入联系电话"
                    maxlength="11"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="form.email"
                    placeholder="请输入邮箱"
                    maxlength="50"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门状态" prop="status">
                  <el-radio-group v-model="form.status">
                    <el-radio
                      v-for="dept in deptStatus"
                      :key="dept.value"
                      :label="dept.value"
                    >{{ dept.name }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            <el-button @click="cancelDialog">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </template>
  </BasicLayout>
</template>

<style lang="scss">
.dept-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  .operate-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .operate-btn {
      padding: 5px 0 !important;
    }
  }
}
</style>
