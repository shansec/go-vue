<script lang="js" setup>
import { ref, watch } from 'vue'
const prop = defineProps({
  data: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  parentId: {
    type: String,
    default: '',
    required: true
  }
})
const emit = defineEmits(['getSelectedNode'])
const defaultProps = {
  children: 'children',
  label: 'deptName',
  value: 'deptId'
}
const value = ref('')
const treeRef = ref()
const nodeClick = (node) => {
  emit('getSelectedNode', node)
}
watch(
  () => prop.parentId,
  (newVal) => {
    value.value = treeRef.value.getNode(newVal).data.deptName
  }
)
</script>

<template>
  <div class="tree-container">
    <el-tree-select
      ref="treeRef"
      v-model="value"
      :props="defaultProps"
      :data="prop.data"
      :placeholder="prop.placeholder"
      node-key="deptId"
      check-strictly
      :render-after-expand="false"
      @node-click="nodeClick"
    />
  </div>
</template>
