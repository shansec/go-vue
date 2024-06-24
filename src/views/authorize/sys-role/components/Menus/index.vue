<script lang="js" setup>
import { onMounted, ref, watch } from 'vue'
import { getMenuTree, getSpecialRoleMenu } from '@/api/Menu'

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
    menuList.forEach((menu) => {
      electedMenuId.value.push(menu.ID)
    })
    console.log(electedMenuId.value)
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
      <el-button type="primary">确 定</el-button>
    </div>
    <div class="tree-content">
      <el-scrollbar>
        <el-tree
          ref="menuTree"
          :data="menuTreeList"
          :props="menuProps"
          :default-checked-keys="electedMenuId"
          :filter-node-method="filterNode"
          default-expand-all
          highlight-current
          show-checkbox
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
}
</style>
