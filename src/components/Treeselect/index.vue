<script lang="js" setup>
import { nextTick, ref, watch } from 'vue'
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
    required: false
  },
  defaultProps: {
    type: Object,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: false,
    default: false
  }
})
const emit = defineEmits(['getSelectedNode'])
const value = ref('')
const treeRef = ref()
const nodeClick = (node) => {
  emit('getSelectedNode', node)
}
nextTick(() => {
  watch(
    () => prop.parentId,
    (newVal) => {
      if (!newVal) return
      value.value = treeRef.value.getNode(newVal).data.deptName
    },
    { immediate: true }
  )
})
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
      :disabled="prop.isEdit"
      @node-click="nodeClick"
    />
  </div>
</template>
