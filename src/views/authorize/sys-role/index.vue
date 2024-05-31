<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getRoleList, createRole, deleteRole, updateRole } from '@/api/Role.js'
import { successMsg, errorMsg, confirmBox } from '@/utils/message.js'

const roleList = ref()
const roleTreeList = ref([])
const total = ref(0)
const isShowDialog = ref(false)
const title = ref()
const type = ref()
const queryParams = ref({
  page: 1,
  pageSize: 10
})
const roleFormRef = ref()
const roleForm = ref({
  roleId: 0,
  roleName: '',
  parentId: 0
})
const initRoleForm = () => {
  if (roleForm.value) {
    roleFormRef.value.resetFields()
  }
  roleForm.value = { roleId: 0, roleName: '', parentId: 0 }
}
const mustUint = (rule, value, callback) => {
  if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
    return callback(new Error('请输入正整数'))
  }
  return callback()
}
const rules = ref({
  parentId: [{ required: true, message: '父级角色不能为空', trigger: 'blur' }],
  roleId: [
    { required: true, message: '角色编号不能为空', trigger: 'blur' },
    { validator: mustUint, trigger: 'blur', message: '必须为正整数' }
  ],
  roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
})
const customProps = ref({
  value: 'roleId',
  label: 'roleName',
  checkStrictly: true,
  emitPath: false
})

const pageDataChange = (payload) => {
  queryParams.value.page = payload.page
  queryParams.value.pageSize = payload.limit
  requestRoleList()
}
const addRole = () => {
  setOptions()
  openDialog('create')
}
const openDialog = (key) => {
  switch (key) {
    case 'create':
      title.value = '新增角色'
      type.value = key
      break
    case 'update':
      title.value = '编辑角色'
      type.value = key
      break
  }
  isShowDialog.value = true
}
const cancelDialog = () => {
  isShowDialog.value = false
  title.value = ''
  initRoleForm()
}
const editRole = (row) => {
  for (const key in roleForm.value) {
    roleForm.value[key] = row[key]
  }
  setOptions()
  openDialog('update')
}
const setChildRole = (row) => {
  roleForm.value.parentId = row.roleId
  openDialog('create')
}
const setOptions = () => {
  roleTreeList.value = [{ roleId: 0, roleName: '根角色' }]
  setRoleOptions(roleList.value, roleTreeList.value, false)
}
const setRoleOptions = (RoleData, optionsData, disabled) => {
  RoleData &&
    RoleData.forEach((role) => {
      if (role.children && role.children.length) {
        const option = {
          roleId: role.roleId,
          roleName: role.roleName,
          disabled: disabled || role.roleId === roleForm.value.roleId,
          children: []
        }
        setRoleOptions(
          role.children,
          option.children,
          disabled || role.roleId === roleForm.value.roleId
        )
        optionsData.push(option)
      } else {
        const option = {
          roleId: role.roleId,
          roleName: role.roleName,
          disabled: disabled || role.roleId === roleForm.value.roleId
        }
        optionsData.push(option)
      }
    })
}
const confirmSubmit = () => {
  roleFormRef.value.validate(async (value) => {
    if (value) {
      switch (type.value) {
        case 'update':
          {
            const res = await updateRole(roleForm.value)
            if (res.code === 200) {
              successMsg(res.msg)
              requestRoleList()
              isShowDialog.value = false
              title.value = ''
              initRoleForm()
            }
          }
          break
        case 'create':
          {
            const res = await createRole(roleForm.value)
            if (res.code === 200) {
              successMsg(res.msg)
              requestRoleList()
              isShowDialog.value = false
              title.value = ''
              initRoleForm()
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
const removeRole = (data) => {
  const msg = '删除角色之前确保该角色下不含有子角色'
  confirmBox(msg, '确定删除', '取消', 'warning').then(async () => {
    const res = await deleteRole(data)
    if (res.code === 200) {
      successMsg(res.msg)
      requestRoleList()
    }
  })
}
const requestRoleList = async () => {
  const roleRes = await getRoleList(queryParams.value)
  if (roleRes.code === 200) {
    roleList.value = roleRes.data.list
    queryParams.value.page = roleRes.data.page
    queryParams.value.pageSize = roleRes.data.pageSize
    total.value = roleRes.data.total
  }
}
onMounted(() => {
  requestRoleList()
})
</script>
<template>
  <BasicLayout>
    <template #wrapper>
      <div class="role-container">
        <div class="add-btn">
          <custom-el-button type="primary" @click="addRole">
            <template #prefix>
              <svg-icon icon-class="table-add" />
            </template>
            <template #txt> 新增角色 </template>
          </custom-el-button>
        </div>
        <el-table
          :data="roleList"
          style="width: 100%"
          header-row-class-name="header-row"
          row-key="roleId"
          border
        >
          <el-table-column prop="roleId" label="角色编号" />
          <el-table-column prop="roleName" label="角色名称" />
          <el-table-column label="操作">
            <template #default="scope">
              <div class="operate-box">
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="editRole(scope.row)"
                >
                  <el-icon><Edit /></el-icon>
                  编辑
                </el-button>
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="setChildRole(scope.row)"
                >
                  <el-icon><Plus /></el-icon>
                  新增子角色
                </el-button>
                <el-button
                  type="danger"
                  text
                  class="operate-btn"
                  @click="removeRole(scope.row)"
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
        <!--  添加/修改角色信息弹框  -->
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
            ref="roleFormRef"
            :model="roleForm"
            :rules="rules"
            label-width="120px"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="父级角色" prop="parentId">
                  <el-cascader
                    v-model="roleForm.parentId"
                    style="width: 100%"
                    :options="roleTreeList"
                    :props="customProps"
                    :disabled="type === 'create'"
                    :show-all-levels="false"
                    filterable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色编号" prop="roleId">
                  <el-input
                    v-model.number="roleForm.roleId"
                    :disabled="type === 'update'"
                    placeholder="请输入角色编号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input
                    v-model="roleForm.roleName"
                    placeholder="请输入角色名称"
                  />
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
.role-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  .add-btn {
    margin-bottom: 10px;
  }

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
