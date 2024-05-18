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
    default () {
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
  emit('pagination', { page: 1, limit: val })
  if (prop.autoScroll) {
    scrollTo(0, 800)
  }
}
const handleCurrentChange = (val) => {
  emit('pagination', { page: val, limit: pageSize.value })
  if (prop.autoScroll) {
    scrollTo(0, 800)
  }
}
const pageSize = computed({
  get () {
    return prop.limit
  },
  set (val) {
    emit('update:limit', val)
  }
})
</script>

<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="prop.background"
      :current-page.sync="prop.currentPage"
      :page-size.sync="prop.limit"
      :layout="prop.layout"
      :page-sizes="prop.pageSizes"
      :total="prop.total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
  padding: 32px 16px;
  background: #fff;
}

.pagination-container.hidden {
  display: none;
}
</style>
