<script lang="js" setup>
import { onMounted, ref } from 'vue'
import BasicLayout from '@/components/BasicLayout/index.vue'
import DictionaryDetail from '@/views/authorize/sys-dictionary/components/DictionaryDetail/index.vue'
import {
  createDictionary,
  deleteDictionary,
  getDictionary,
  getDictionaryInfoList,
  updateDictionary
} from '@/api/Dictionary'
import { confirmBox, successMsg } from '@/utils/message'

defineOptions({
  name: 'Dictionary'
})
const selectID = ref(1)
const formData = ref({
  name: null,
  type: null,
  status: null,
  desc: null
})
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入字典名（中）',
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      message: '请输入字典名（英）',
      trigger: 'blur'
    }
  ],
  desc: [
    {
      required: true,
      message: '请输入描述',
      trigger: 'blur'
    }
  ]
})
const dictionaryData = ref([])
const dialogFormVisible = ref(false)
const type = ref('')
const dialogForm = ref()

const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    name: null,
    type: null,
    status: true,
    desc: null
  }
}
const addDictionary = () => {
  openDialog('create')
}
const openDialog = (key) => {
  switch (key) {
    case 'create':
      type.value = key
      break
    case 'update':
      type.value = key
      break
  }
  dialogFormVisible.value = true
}
const selectDictionary = (id) => {
  selectID.value = id
}
const updateDictionaryFunc = async (row) => {
  const res = await getDictionary({ ID: row.ID, status: row.status })
  if (res.code === 200) {
    formData.value = res.data.resDictionary
    openDialog('update')
  }
}
const requestDictionaryList = async () => {
  const res = await getDictionaryInfoList()
  if (res.code === 200) {
    dictionaryData.value = res.data
  }
}
const confirmSubmit = async () => {
  dialogForm.value.validate(async (valid) => {
    if (valid) {
      let res = null
      switch (type.value) {
        case 'create':
          res = await createDictionary(formData.value)
          break
        case 'update':
          res = await updateDictionary(formData.value)
          break
        default:
          res = await createDictionary(formData.value)
          break
      }
      if (res.code === 200) {
        successMsg(res.msg)
        closeDialog()
        await requestDictionaryList()
      }
    }
  })
}
const deleteDictionaryFunc = async (row) => {
  await confirmBox('确定要删除吗？', '确定', '取消', 'warning').then(
    async () => {
      const res = await deleteDictionary({ ID: row.ID })
      if (res.code === 200) {
        successMsg(res.msg)
        await requestDictionaryList()
      }
    }
  )
}
onMounted(() => {
  requestDictionaryList()
})
</script>
<template>
  <BasicLayout bg-color="transparent">
    <template #wrapper>
      <div class="dictionary-container">
        <div class="dict-box flex gap-4">
          <div class="w-64 bg-white p-4">
            <div class="flex justify-between items-center">
              <span class="text font-bold">字典列表</span>
              <el-button type="primary" @click="addDictionary">
                新增
              </el-button>
            </div>
            <el-scrollbar class="mt-4" style="height: calc(100vh - 220px)">
              <div
                v-for="dictionary in dictionaryData"
                :key="dictionary.ID"
                class="rounded flex justify-between items-center px-2 py-4 cursor-pointer mt-2 hover:bg-blue-50 group bg-gray-50"
                :class="selectID === dictionary.ID && 'active'"
                @click="selectDictionary(dictionary.ID)"
              >
                <span class="max-w-[160px] truncate">{{
                  dictionary.name
                }}</span>
                <div>
                  <el-icon
                    class="group-hover:text-blue-500"
                    :class="
                      selectID === dictionary.ID
                        ? 'text-white-800'
                        : 'text-blue-500'
                    "
                    @click="updateDictionaryFunc(dictionary)"
                  >
                    <Edit />
                  </el-icon>
                  <el-icon
                    class="ml-2 group-hover:text-red-500"
                    :class="
                      selectID === dictionary.ID
                        ? 'text-white-800'
                        : 'text-red-500'
                    "
                    @click="deleteDictionaryFunc(dictionary)"
                  >
                    <Delete />
                  </el-icon>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div class="flex-1 bg-white">
            <DictionaryDetail :dictionary-i-d="selectID" />
          </div>
        </div>
        <el-dialog
          v-model="dialogFormVisible"
          :before-close="closeDialog"
          :title="type === 'create' ? '添加字典' : '修改字典'"
        >
          <el-form
            ref="dialogForm"
            :model="formData"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item label="字典名（中）" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入字典名（中）"
                clearable
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="字典名（英）" prop="type">
              <el-input
                v-model="formData.type"
                placeholder="请输入字典名（英）"
                clearable
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="状态" prop="status" required>
              <el-switch
                v-model="formData.status"
                active-text="开启"
                inactive-text="停用"
              />
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input
                v-model="formData.desc"
                placeholder="请输入描述"
                clearable
                :style="{ width: '100%' }"
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
  </BasicLayout>
</template>
<style lang="scss" scoped>
.dictionary-container {
  .dict-box {
    width: 100%;
    height: 100%;

    .active {
      color: #fff;
      background-color: var(--el-color-primary) !important;
    }
  }
}
</style>
