<script lang="js" setup>
import { scrollTo } from '@/utils/scroll-to'
import { computed, ref } from 'vue'
const props = defineProps({
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
const pageInfo = ref(props)
const emit = defineEmits(['pagination', 'update:page', 'update:limit'])
const handleSizeChange = (val) => {
  emit('pagination', { page: 1, limit: val })
  if (pageInfo.value.autoScroll) {
    scrollTo(0, 800)
  }
}
const handleCurrentChange = (val) => {
  emit('pagination', { page: val, limit: pageSize.value })
  if (pageInfo.value.autoScroll) {
    scrollTo(0, 800)
  }
}
const pageSize = computed({
  get () {
    return pageInfo.value.limit
  },
  set (val) {
    emit('update:limit', val)
  }
})
</script>

<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="pageInfo.background"
      :current-page.sync="pageInfo.currentPage"
      :page-size.sync="pageInfo.limit"
      :layout="pageInfo.layout"
      :page-sizes="pageInfo.pageSizes"
      :total="pageInfo.total"
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
}

.pagination-container.hidden {
  display: none;
}
</style>
