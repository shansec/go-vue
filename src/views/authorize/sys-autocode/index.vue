<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { createPackage, getPackageList, deletePackage } from '@/api/AutoCode'
import { errorMsg, successMsg, confirmBox } from '@/utils/message'
import { awaitWrap } from '@/utils/await'

const packageList = ref()
const total = ref(0)

const queryParams = ref({
  page: 1,
  pageSize: 10,
  package_name: ''
})
const title = ref('创建包')
const isShowDialog = ref(false)
const packageFormRef = ref()
const form = ref({
  package_name: '',
  label: '',
  desc: ''
})
const rules = ref({
  package_name: [{ required: true, message: '包名不能为空', trigger: 'blur' }],
  label: [{ required: true, message: '展示名不能为空', trigger: 'blur' }],
  desc: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
})

const isEdit = ref(false)
const requestPackages = async() => {
  const [err, data] = await awaitWrap(getPackageList(queryParams.value))
  if (data !== null) {
    packageList.value = data.data.list
    queryParams.value.page = data.data.page
    queryParams.value.pageSize = data.data.pageSize
    total.value = data.data.total
  } else {
    console.log(err)
  }
}
const inquireDept = () => {
  queryParams.value.page = 1
  queryParams.value.pageSize = 10
  requestPackages()
}
const resetQuery = () => {
  queryParams.value = {
    page: 1,
    pageSize: 10,
    package_name: ''
  }
}
const confirmSubmit = () => {
  packageFormRef.value.validate(async(value) => {
    if (value) {
      const [err, data] = await awaitWrap(createPackage(form.value))
      if (data !== null) {
        successMsg(data.msg)
        queryParams.value = {
          page: 1,
          pageSize: 10,
          package_name: ''
        }
        isShowDialog.value = false
        isEdit.value = false
        packageFormRef.value.resetFields()
        await requestPackages()
      } else {
        console.log(err)
      }
    } else {
      errorMsg('请完善必填信息')
    }
  })
}
const cancelDialog = () => {
  isShowDialog.value = false
  isEdit.value = false
  packageFormRef.value.resetFields()
}
const removeDept = (row) => {
  const msg = '确定要删除这条记录吗？'
  confirmBox(msg, '确定删除', '取消', 'warning')
    .then(async() => {
      const [err, data] = await awaitWrap(deletePackage(row))
      if (data !== null) {
        successMsg(data.msg)
        await requestPackages()
      } else {
        console.log(err)
      }
    })
    .catch(() => {})
}
const ShowDialog = () => {
  isShowDialog.value = true
}
onMounted(() => {
  requestPackages()
})
</script>

<template>
  <BasicLayout>
    <template #wrapper>
      <div class="package-container">
        <div class="query-box">
          <el-form
            :model="queryParams"
            :inline="true"
          >
            <el-form-item label="包名">
              <el-input
                v-model.trim="queryParams.package_name"
                placeholder="请输入包名"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="inquireDept"
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
          :data="packageList"
          style="width: 100%"
          header-row-class-name="header-row"
          border
        >
          <el-table-column
            prop="ID"
            label="id"
            width="100"
          />
          <el-table-column
            prop="package_name"
            label="包名"
            width="500"
          />
          <el-table-column
            prop="label"
            label="展示名"
            width="200"
          />
          <el-table-column
            prop="desc"
            label="描述"
            width="220"
          />
          <el-table-column label="操作">
            <template #default="scope">
              <div class="operate-box">
                <el-button
                  size="small"
                  type="danger"
                  text
                  class="operate-btn"
                  @click="removeDept(scope.row)"
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
        />
        <!--  创建包  -->
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
            ref="packageFormRef"
            :model="form"
            :rules="rules"
            label-width="80px"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="包名"
                  prop="package_name"
                >
                  <el-input
                    v-model="form.package_name"
                    placeholder="请输入包名"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="展示名"
                  prop="label"
                >
                  <el-input
                    v-model="form.label"
                    placeholder="请输入展示名"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="描述"
                  prop="desc"
                >
                  <el-input
                    v-model="form.desc"
                    placeholder="请输入描述"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="confirmSubmit"
            >确 定</el-button>
            <el-button @click="cancelDialog">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </template>
  </BasicLayout>
</template>

<style lang="scss">
.package-container {
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
