<script lang="js" setup>
import { scrollTo } from '@/utils/scroll-to'
import { computed } from 'vue'
const prop = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    }
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['pagination', 'update:page', 'update:limit'])
const handleSizeChange = (val) => {
  console.log(val)
  emit('pagination', { page: prop.currentPage, limit: val })
  if (prop.autoScroll) {
    scrollTo(0, 800)
  }
}
const handleCurrentChange = (val) => {
  emit('pagination', { page: val, limit: pageSize })
  if (prop.autoScroll) {
    scrollTo(0, 800)
  }
}
const currentPage = computed({
  get() {
    return this.page
  },
  set(val) {
    emit('update:page', val)
  }
})
const pageSize = computed({
  get() {
    return this.limit
  },
  set(val) {
    emit('update:limit', val)
  }
})
</script>

<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.pagination-container {
  padding: 32px 16px;
  background: #fff;
}

.pagination-container.hidden {
  display: none;
}
</style>
