<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getMenuList, createMenu, deleteMenu, updateMenu } from '@/api/Menu.js'
import { successMsg, errorMsg, confirmBox } from '@/utils/message.js'

defineOptions({
  name: 'Menus'
})

const menuList = ref()
const menuTreeList = ref([])
const total = ref(0)
const isShowDialog = ref(false)
const title = ref()
const type = ref()
const queryParams = ref({
  page: 1,
  pageSize: 10
})
const menuFormRef = ref()
const menuForm = ref({
  menuId: 0,
  menuName: '',
  parentId: 0
})
const initMenuForm = () => {
  if (menuForm.value) {
    menuFormRef.value.resetFields()
  }
  menuForm.value = { menuId: 0, menuName: '', parentId: 0 }
}
const mustUint = (rule, value, callback) => {
  if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
    return callback(new Error('请输入正整数'))
  }
  return callback()
}
const rules = ref({
  parentId: [{ required: true, message: '父级角色不能为空', trigger: 'blur' }],
  menuId: [
    { required: true, message: '角色编号不能为空', trigger: 'blur' },
    { validator: mustUint, trigger: 'blur', message: '必须为正整数' }
  ],
  menuName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
})
const customProps = ref({
  value: 'menuId',
  label: 'menuName',
  checkStrictly: true,
  emitPath: false
})

const pageDataChange = (payload) => {
  queryParams.value.page = payload.page
  queryParams.value.pageSize = payload.limit
  requestMenuList()
}
const addMenu = () => {
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
  initMenuForm()
}
const editMenu = (row) => {
  for (const key in menuForm.value) {
    menuForm.value[key] = row[key]
  }
  setOptions()
  openDialog('update')
}
const setChildMenu = (row) => {
  menuForm.value.parentId = row.menuId
  openDialog('create')
}
const setOptions = () => {
  menuTreeList.value = [{ menuId: 0, menuName: '根角色' }]
  setMenuOptions(menuList.value, menuTreeList.value, false)
}
const setMenuOptions = (MenuData, optionsData, disabled) => {
  MenuData &&
    MenuData.forEach((menu) => {
      if (menu.children && menu.children.length) {
        const option = {
          menuId: menu.menuId,
          menuName: menu.menuName,
          disabled: disabled || menu.menuId === menuForm.value.menuId,
          children: []
        }
        setMenuOptions(
          menu.children,
          option.children,
          disabled || menu.menuId === menuForm.value.menuId
        )
        optionsData.push(option)
      } else {
        const option = {
          menuId: menu.menuId,
          menuName: menu.menuName,
          disabled: disabled || menu.menuId === menuForm.value.menuId
        }
        optionsData.push(option)
      }
    })
}
const confirmSubmit = () => {
  menuFormRef.value.validate(async (value) => {
    if (value) {
      switch (type.value) {
        case 'update':
          {
            const res = await updateMenu(menuForm.value)
            if (res.code === 200) {
              successMsg(res.msg)
              requestMenuList()
              isShowDialog.value = false
              title.value = ''
              initMenuForm()
            }
          }
          break
        case 'create':
          {
            const res = await createMenu(menuForm.value)
            if (res.code === 200) {
              successMsg(res.msg)
              requestMenuList()
              isShowDialog.value = false
              title.value = ''
              initMenuForm()
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
const removeMenu = (data) => {
  const msg = '删除角色之前确保该角色下不含有子角色'
  confirmBox(msg, '确定删除', '取消', 'warning').then(async () => {
    const res = await deleteMenu(data)
    if (res.code === 200) {
      successMsg(res.msg)
      requestMenuList()
    }
  })
}
const requestMenuList = async () => {
  const menuRes = await getMenuList(queryParams.value)
  if (menuRes.code === 200) {
    menuList.value = menuRes.data.list
    queryParams.value.page = menuRes.data.page
    queryParams.value.pageSize = menuRes.data.pageSize
    total.value = menuRes.data.total
  }
}
onMounted(() => {
  requestMenuList()
})
</script>
<template>
  <BasicLayout>
    <template #wrapper>
      <div class="menu-container">
        <div class="add-btn">
          <custom-el-button type="primary" @pointer="addMenu">
            <template #prefix>
              <svg-icon icon-class="table-add" />
            </template>
            <template #txt> 新增菜单 </template>
          </custom-el-button>
        </div>
        <el-table
          :data="menuList"
          style="width: 100%"
          header-row-class-name="header-row"
          row-key="ID"
          border
        >
          <el-table-column prop="ID" label="ID" width="100" />
          <el-table-column prop="meta.title" label="展示名称" />
          <el-table-column prop="meta" label="图标">
            <template #default="scope">
              <div class="icon">
                <el-icon :size="20">
                  <svg-icon :icon-class="scope.row.meta.icon" />
                </el-icon>
                <span>{{ scope.row.meta.icon }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="路由Name" />
          <el-table-column prop="path" label="路由Path" />
          <el-table-column prop="hidden" label="是否隐藏" width="100">
            <template #default="scope">
              {{ scope.row.hidden ? '隐藏' : '显示' }}
            </template>
          </el-table-column>
          <el-table-column prop="parentId" label="父节点" width="100" />
          <el-table-column prop="component" label="文件路径" min-width="180">
            <template #default="scope">
              {{ scope.row.component ? scope.row.component : '/' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="180">
            <template #default="scope">
              <div class="operate-box">
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="editMenu(scope.row)"
                >
                  <el-icon><Edit /></el-icon>
                  编辑
                </el-button>
                <el-button
                  type="primary"
                  text
                  class="operate-btn"
                  @click="setChildMenu(scope.row)"
                >
                  <el-icon><Plus /></el-icon>
                  新增子角色
                </el-button>
                <el-button
                  type="danger"
                  text
                  class="operate-btn"
                  @click="removeMenu(scope.row)"
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
            ref="menuFormRef"
            :model="menuForm"
            :rules="rules"
            label-width="120px"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="父级角色" prop="parentId">
                  <el-cascader
                    v-model="menuForm.parentId"
                    style="width: 100%"
                    :options="menuTreeList"
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
                <el-form-item label="角色编号" prop="menuId">
                  <el-input
                    v-model.number="menuForm.menuId"
                    :disabled="type === 'update'"
                    placeholder="请输入角色编号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="角色名称" prop="menuName">
                  <el-input
                    v-model="menuForm.menuName"
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
.menu-container {
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

  .icon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
