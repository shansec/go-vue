<script lang="js" setup>
import { onMounted, ref, watch } from 'vue'
import { getMenuTree, getSpecialRoleMenu } from '@/api/Menu'
import { addRoleMenu } from '@/api/Role'
import { infoMsg, successMsg } from '@/utils/message'

defineOptions({
  name: 'Menus'
})

const props = defineProps({
  roleId: {
    type: Number,
    default: 0,
    required: true
  }
})

const menuTree = ref()
const menuTreeList = ref()
const filterText = ref()
const electedMenuId = ref([])
const menuSelected = ref()
const menuProps = ref({
  label: (data, node) => data.meta.title,
  children: 'children'
})
const filterNode = (value, data) => {
  if (!value) return true
  return data.meta.title.indexOf(value) !== -1
}
watch(filterText, (val) => {
  menuTree.value.filter(val)
})
const nodeSelect = () => {
  const menuChecked = menuTree.value.getCheckedNodes(false, true)
  menuSelected.value = menuChecked
}
const addRelation = async () => {
  if (!menuSelected.value) {
    infoMsg('角色权限无修改，无需保存')
  } else {
    const addRes = await addRoleMenu({
      roleId: props.roleId,
      menus: menuSelected.value
    })
    if (addRes.code === 200) {
      successMsg(addRes.msg)
    }
  }
}
const requestMenuTree = async () => {
  const treeData = await getMenuTree()
  if (treeData.code === 200) {
    menuTreeList.value = treeData.data.list
  }
}
const requestRoleMenu = async () => {
  const roleMenu = await getSpecialRoleMenu({ roleId: props.roleId })
  if (roleMenu.code === 200) {
    const menuList = roleMenu.data.list
    const menuListTemp = []
    menuList.forEach((item) => {
      if (!menuList.some((same) => same.parentId === item.ID)) {
        menuListTemp.push(Number(item.ID))
      }
    })
    electedMenuId.value = menuListTemp
  }
}
onMounted(() => {
  requestMenuTree()
  requestRoleMenu()
})
</script>

<template>
  <div class="menu-box">
    <div class="tree-box">
      <el-input
        v-model="filterText"
        placeholder="筛选"
        clearable
        class="cus-input"
      />
      <el-button type="primary" @click="addRelation">确 定</el-button>
    </div>
    <div class="tree-content">
      <el-scrollbar>
        <el-tree
          ref="menuTree"
          :data="menuTreeList"
          :props="menuProps"
          :default-checked-keys="electedMenuId"
          :filter-node-method="filterNode"
          node-key="ID"
          default-expand-all
          highlight-current
          show-checkbox
          @check="nodeSelect"
        />
      </el-scrollbar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.menu-box {
  .tree-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .cus-input {
      width: 50%;
    }
  }

  .tree-content {
    margin-top: 10px;
  }
}

:deep(.el-scrollbar) {
  border: none !important;
}
</style>
