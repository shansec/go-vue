<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getApiList, createApi, deleteApi, updateApi } from '@/api/Api'
import { errorMsg, successMsg, confirmBox } from '@/utils/message'

defineOptions({
  name: 'Api'
})

const apiList = ref()
const total = ref(0)
const methods = ref([
  {
    name: 'POST(新增)',
    value: 'POST'
  },
  {
    name: 'GET(查询)',
    value: 'GET'
  },
  {
    name: 'PUT(修改)',
    value: 'PUT'
  },
  {
    name: 'DELETE(删除)',
    value: 'DELETE'
  }
])
const queryParams = ref({
  page: 1,
  pageSize: 10,
  path: '',
  description: '',
  apiGroup: '',
  method: ''
})
const title = ref('')
const type = ref('')
const index = ref(0)
const isShowDialog = ref(false)
const apiFormRef = ref()
const form = ref({
  path: '',
  description: '',
  apiGroup: '',
  method: ''
})
const initForm = () => {
  if (form.value) {
    apiFormRef.value.resetFields()
  }
  form.value = {
    path: '',
    description: '',
    apiGroup: '',
    method: ''
  }
}
const rules = ref({
  path: [{ required: true, message: 'api 路径不能为空', trigger: 'blur' }],
  description: [
    { required: true, message: 'api 描述不能为空', trigger: 'blur' }
  ],
  apiGroup: [
    { required: true, message: 'api 所属组不能为空', trigger: 'blur' }
  ],
  method: [{ required: true, message: 'api 方法类型不能为空', trigger: 'blur' }]
})

const ShowDialog = () => {
  openDialog('create')
}

const openDialog = (key) => {
  switch (key) {
    case 'create':
      title.value = '添加 api'
      type.value = key
      break
    case 'update':
      title.value = '修改 api'
      type.value = key
      break
  }
  isShowDialog.value = true
}

const inquireApi = () => {
  queryParams.value.page = 1
  queryParams.value.pageSize = 10
  requestApi()
}
const resetQuery = () => {
  queryParams.value = {
    page: 1,
    pageSize: 10,
    path: '',
    description: '',
    apiGroup: '',
    method: ''
  }
}

const pageDataChange = (payload) => {
  queryParams.value.page = payload.page
  queryParams.value.pageSize = payload.limit
  requestApi()
}

const cancelDialog = () => {
  isShowDialog.value = false
  title.value = ''
  initForm()
}
const getNextId = () => {
  return Math.max(...apiList.value.map((api) => api.ID)) + 1
}
const requestApi = async () => {
  const res = await getApiList(queryParams.value)
  apiList.value = res.data.list
  queryParams.value.page = res.data.page
  queryParams.value.pageSize = res.data.pageSize
  total.value = res.data.total
}

const confirmSubmit = () => {
  apiFormRef.value.validate(async (value) => {
    if (value) {
      switch (type.value) {
        case 'update':
          {
            const res = await updateApi(form.value)
            if (res.code === 200) {
              successMsg(res.msg)
              apiList.value.forEach((row, index) => {
                if (row.ID === form.value.ID) {
                  apiList.value[index] = { ...row, ...form.value }
                }
              })
              isShowDialog.value = false
              title.value = ''
              initForm()
            }
          }
          break
        case 'create':
          {
            const res = await createApi(form.value)
            if (res.code === 200) {
              successMsg(res.msg)
              form.value.ID = getNextId()
              apiList.value.push({ ...form.value })
              isShowDialog.value = false
              title.value = ''
              initForm()
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
const removeApi = (data, index) => {
  const msg = '是否删除 api 记录？'
  confirmBox(msg, '确定删除', '取消', 'warning').then(async () => {
    const res = await deleteApi(data)
    if (res.code === 200) {
      successMsg(res.msg)
      apiList.value.splice(index, 1)
    }
  })
}
const changeApi = (row, $index) => {
  form.value = JSON.parse(JSON.stringify(row))
  index.value = $index
  openDialog('update')
}
onMounted(() => {
  requestApi()
})
</script>

<template>
  <BasicLayout>
    <template #wrapper>
      <div class="api-container">
        <div class="query-box">
          <el-form :model="queryParams" :inline="true">
            <el-form-item label="路径">
              <el-input
                v-model.trim="queryParams.path"
                placeholder="请输入 api 路径"
              />
            </el-form-item>
            <el-form-item label="中文描述">
              <el-input
                v-model.trim="queryParams.description"
                placeholder="请输入 api 中文描述"
              />
            </el-form-item>
            <el-form-item label="所属组">
              <el-input
                v-model.trim="queryParams.description"
                placeholder="请输入 api 所属组"
              />
            </el-form-item>
            <el-form-item label="method">
              <el-select v-model="queryParams.method" placeholder="方法类型">
                <el-option
                  v-for="status in methods"
                  :key="status.value"
                  :label="status.name"
                  :value="status.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <custom-el-button type="primary" @pointer="inquireApi">
                <template #prefix>
                  <svg-icon icon-class="table-search" />
                </template>
                <template #txt> 查询 </template>
              </custom-el-button>
              <custom-el-button :plain="true" @pointer="resetQuery">
                <template #prefix>
                  <svg-icon icon-class="table-reset" />
                </template>
                <template #txt> 重置 </template>
              </custom-el-button>
              <custom-el-button type="primary" @pointer="ShowDialog">
                <template #prefix>
                  <svg-icon icon-class="table-add" />
                </template>
                <template #txt> 新增 </template>
              </custom-el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="apiList"
          style="width: 100%"
          header-row-class-name="header-row"
          row-key="apiId"
          border
        >
          <el-table-column prop="ID" label="ID" width="100" />
          <el-table-column prop="path" label="api路径" />
          <el-table-column prop="description" label="api中文描述" />
          <el-table-column prop="apiGroup" label="api所属组" />
          <el-table-column prop="method" label="method" width="150" />
          <el-table-column label="操作">
            <template #default="scope">
              <div class="operate-box">
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="changeApi(scope.row, scope.$index)"
                >
                  <el-icon><Edit /></el-icon>
                  编辑
                </el-button>
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="removeApi(scope.row, scope.$index)"
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
          @pagination="pageDataChange"
        />
        <!--  添加/修改 api 弹框  -->
        <el-dialog
          v-model="isShowDialog"
          :title="title"
          width="500px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :destroy-on-close="true"
          :show-close="false"
        >
          <el-form
            ref="apiFormRef"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="路径" prop="path">
                  <el-input v-model="form.path" placeholder="请输入 api 路径" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述" prop="description">
                  <el-input
                    v-model="form.description"
                    placeholder="请输入 api 描述"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="所属组" prop="apiGroup">
                  <el-input
                    v-model="form.apiGroup"
                    placeholder="请输入 api 所属组"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="api 方法类型" prop="method">
                  <el-select v-model="form.method" placeholder="方法类型">
                    <el-option
                      v-for="status in methods"
                      :key="status.value"
                      :label="status.name"
                      :value="status.value"
                    />
                  </el-select>
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
.api-container {
  padding: 20px;
  width: 100%;
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
