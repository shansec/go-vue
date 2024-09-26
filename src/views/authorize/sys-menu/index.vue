<script lang="js" setup>
import { onMounted, ref } from 'vue'
import { getMenuList, createMenu, deleteMenu, updateMenu } from '@/api/Menu.js'
import { successMsg, errorMsg, confirmBox } from '@/utils/message.js'
import Icon from './components/Icon/index.vue'

defineOptions({
  name: 'Menus'
})

const menuList = ref()
const menuTreeList = ref([])
const total = ref(0)
const isShowDialog = ref(false)
const isCanEdit = ref(false)
const title = ref()
const type = ref()
const queryParams = ref({
  page: 1,
  pageSize: 10
})
const menuFormRef = ref()
const menuForm = ref({
  parentId: 0,
  ID: 0,
  path: '',
  name: '',
  hidden: false,
  component: '',
  sort: 0,
  meta: {
    keepAlive: true,
    title: '',
    icon: '',
    affix: false
  }
})
const initMenuForm = () => {
  if (menuForm.value) {
    menuFormRef.value.resetFields()
  }
  menuForm.value = {
    parentId: 0,
    ID: 0,
    path: '',
    name: '',
    hidden: false,
    component: '',
    sort: 0,
    meta: {
      keepAlive: true,
      title: '',
      icon: '',
      affix: false
    }
  }
}
const rules = ref({
  parentId: [{ required: true, message: '父级菜单不能为空', trigger: 'blur' }],
  path: [{ required: true, message: '路由Path不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '路由Name不能为空', trigger: 'blur' }],
  component: [{ required: true, message: '文件路径不能为空', trigger: 'blur' }],
  'meta.title': [
    { required: true, message: '展示名称不能为空', trigger: 'blur' }
  ],
  'meta.icon': [{ required: true, message: '请选择图标', trigger: 'blur' }]
})
const customProps = ref({
  value: 'ID',
  label: 'title',
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
      title.value = '新增菜单'
      type.value = key
      break
    case 'update':
      title.value = '编辑菜单'
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
  if (row.parentId !== 0) {
    isCanEdit.value = true
  }
  for (const key in menuForm.value) {
    menuForm.value[key] = row[key]
  }
  setOptions()
  openDialog('update')
}
const setChildMenu = (row) => {
  console.log(row)
  menuForm.value.parentId = row.ID
  openDialog('create')
}
const setOptions = () => {
  menuTreeList.value = [{ ID: 0, title: '根菜单' }]
  setMenuOptions(menuList.value, menuTreeList.value, false)
}
const setMenuOptions = (MenuData, optionsData, disabled) => {
  MenuData &&
    MenuData.forEach((menu) => {
      if (menu.children && menu.children.length) {
        const option = {
          ID: menu.ID,
          title: menu.meta.title,
          disabled: disabled || menu.ID === menuForm.value.ID,
          children: []
        }
        setMenuOptions(
          menu.children,
          option.children,
          disabled || menu.ID === menuForm.value.ID
        )
        optionsData.push(option)
      } else {
        const option = {
          ID: menu.ID,
          title: menu.meta.title,
          disabled: disabled || menu.ID === menuForm.value.ID
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
  const msg = '此操作会删除所有角色下该菜单，是否删除'
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
          <el-table-column prop="meta" label="图标" width="180">
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
          <el-table-column prop="parentId" label="父节点" width="90" />
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
                  新增子菜单
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
              <el-col :span="12">
                <el-form-item label="路由Name" prop="name">
                  <el-input
                    v-model="menuForm.name"
                    placeholder="唯一英文字符串"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路由Path" prop="path">
                  <el-input
                    v-model="menuForm.path"
                    placeholder="建议与路由Name匹配，例如User --> user"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="父级菜单" prop="parentId">
                  <el-cascader
                    v-model="menuForm.parentId"
                    style="width: 100%"
                    :options="menuTreeList"
                    :props="customProps"
                    :disabled="!isCanEdit"
                    :show-all-levels="false"
                    filterable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否隐藏" prop="hidden">
                  <el-select
                    v-model="menuForm.hidden"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="隐藏" :value="true" />
                    <el-option label="显示" :value="false" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展示名称" prop="meta.title">
                  <el-input
                    v-model="menuForm.meta.title"
                    placeholder="请输入展示名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序标记" prop="meta.title">
                  <el-input-number v-model="menuForm.sort" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="图标" prop="meta.icon">
                  <Icon :meta="menuForm.meta" style="width: 100%" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文件路径" prop="component">
                  <el-input
                    v-model="menuForm.component"
                    placeholder="页面:views/xxx/xxx.vue"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="KeepAlive" prop="meta.keepAlive">
                  <el-select
                    v-model="menuForm.meta.keepAlive"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="是" :value="true" />
                    <el-option label="否" :value="false" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="CloseTab" prop="meta.affix">
                  <el-select
                    v-model="menuForm.meta.affix"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option label="是" :value="true" />
                    <el-option label="否" :value="false" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="confirmSubmit">确 定</el-button>
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
