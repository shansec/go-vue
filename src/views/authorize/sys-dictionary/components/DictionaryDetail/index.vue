<script lang="js" setup>
import { onMounted, ref, watch } from 'vue'
import { confirmBox, successMsg } from '@/utils/message'
import {
  createDictionaryDetail,
  deleteDictionaryDetail,
  getDictionaryDetail,
  getDictionaryDetailList,
  updateDictionaryDetail
} from '@/api/DictionaryDetail'
import { formatDate, formatBoolean } from '@/utils/format'

defineOptions({
  name: 'DictionaryDetail'
})

const props = defineProps({
  dictionaryID: {
    type: Number,
    default: 0
  }
})

const dialogFormVisible = ref(false)
const type = ref('')
const tableData = ref([])
const total = ref(0)
const dialogForm = ref()
const queryParams = ref({
  page: 1,
  pageSize: 10
})
const formData = ref({
  label: null,
  value: null,
  extend: null,
  status: null,
  sort: null
})
const rules = ref({
  label: [
    {
      required: true,
      message: '请输入展示值',
      trigger: 'blur'
    }
  ],
  value: [
    {
      required: true,
      message: '请输入字典值',
      trigger: 'blur'
    }
  ],
  sort: [
    {
      required: true,
      message: '排序标记',
      trigger: 'blur'
    }
  ]
})
const openDialog = (key) => {
  type.value = key
  dialogFormVisible.value = true
}
const addDictionaryItem = () => {
  openDialog('create')
}
const pageDataChange = (payload) => {
  queryParams.value.page = payload.page
  queryParams.value.pageSize = payload.limit
}
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    label: null,
    value: null,
    extend: null,
    status: null,
    sort: null,
    sysDictionaryID: props.dictionaryID
  }
}
const requestDictionaryDetailList = async () => {
  const res = await getDictionaryDetailList({
    page: queryParams.value.page,
    pageSize: queryParams.value.pageSize,
    sysDictionaryID: props.dictionaryID
  })
  if (res.code === 200) {
    tableData.value = res.data.list
    total.value = res.data.total
    queryParams.value.page = res.data.page
    queryParams.value.pageSize = res.data.pageSize
  }
}
const confirmSubmit = async () => {
  dialogForm.value.validate(async (valid) => {
    if (valid) {
      let res = null
      formData.value.sysDictionaryID = props.dictionaryID
      switch (type.value) {
        case 'create':
          res = await createDictionaryDetail(formData.value)
          break
        case 'update':
          res = await updateDictionaryDetail(formData.value)
          break
        default:
          res = await createDictionaryDetail(formData.value)
          break
      }
      if (res.code === 200) {
        successMsg(res.msg)
        closeDialog()
        await requestDictionaryDetailList()
      }
    }
  })
}
const deleteDictionaryDetailFunc = async (row) => {
  await confirmBox('确定要删除吗？', '确定', '取消', 'warning').then(
    async () => {
      const res = await deleteDictionaryDetail({ ID: row.ID })
      if (res.code === 200) {
        successMsg(res.msg)
        await requestDictionaryDetailList()
      }
    }
  )
}
const updateDictionaryDetailFunc = async (row) => {
  const res = await getDictionaryDetail({ ID: row.ID })
  if (res.code === 200) {
    formData.value = res.data.resDictionaryDetailInfo
    openDialog('update')
  }
}

watch(
  () => props.dictionaryID,
  () => {
    requestDictionaryDetailList()
  }
)

onMounted(() => {
  requestDictionaryDetailList()
})
</script>

<template>
  <div>
    <div class="box-border p-4">
      <div class="flex justify-between">
        <span class="text font-bold">字典详细内容</span>
        <el-button
          type="primary"
          icon="plus"
          @click="addDictionaryItem"
        >新增字典项</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        row-key="ID"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label="日期" width="180">
          <template #default="scope">{{
            formatDate(scope.row.CreatedAt)
          }}</template>
        </el-table-column>

        <el-table-column align="left" label="展示值" prop="label" />

        <el-table-column align="left" label="字典值" prop="value" />

        <el-table-column align="left" label="扩展值" prop="extend" />

        <el-table-column
          align="left"
          label="启用状态"
          prop="status"
          width="120"
        >
          <template #default="scope">{{
            formatBoolean(scope.row.status)
          }}</template>
        </el-table-column>

        <el-table-column
          align="left"
          label="排序标记"
          prop="sort"
          width="120"
        />

        <el-table-column align="left" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              @click="updateDictionaryDetailFunc(scope.row)"
            >变更</el-button>
            <el-button
              type="primary"
              link
              icon="delete"
              @click="deleteDictionaryDetailFunc(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="gva-pagination">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.page"
          :limit.sync="queryParams.pageSize"
          @pagination="pageDataChange"
        />
      </div>
    </div>

    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      :title="type === 'create' ? '添加字典项' : '修改字典项'"
    >
      <el-form
        ref="dialogForm"
        :model="formData"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item label="展示值" prop="label">
          <el-input
            v-model="formData.label"
            placeholder="请输入展示值"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="字典值" prop="value">
          <el-input
            v-model="formData.value"
            placeholder="请输入字典值"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="扩展值" prop="extend">
          <el-input
            v-model="formData.extend"
            placeholder="请输入扩展值"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="启用状态" prop="status" required>
          <el-switch
            v-model="formData.status"
            active-text="开启"
            inactive-text="停用"
          />
        </el-form-item>
        <el-form-item label="排序标记" prop="sort">
          <el-input-number
            v-model.number="formData.sort"
            placeholder="排序标记"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="confirmSubmit">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
