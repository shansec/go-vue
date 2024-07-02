<script setup>
import { defineComponent, reactive, ref } from 'vue'
import { config } from '@/plugins/compose-icon-list'

defineComponent({
  name: 'Icon'
})

const props = defineProps({
  meta: {
    default: () => {},
    type: Object
  }
})
const options = reactive([...config.svgs])
const metaData = ref(props.meta)
if (!metaData.value.icon) {
  metaData.value.icon = ''
}
</script>

<template>
  <div>
    <el-select
      v-model="metaData.icon"
      style="width: 100%"
      clearable
      filterable
      placeholder="请选择"
    >
      <template #prefix>
        <el-icon :size="20">
          <svg-icon :icon-class="metaData.icon" />
        </el-icon>
      </template>
      <el-option
        v-for="item in options"
        :key="item.key"
        class="select-option-item"
        :label="item.label"
        :value="item.key"
      >
        <el-icon :size="20">
          <svg-icon :icon-class="item.label" />
        </el-icon>
        <span>{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<style scoped lang="scss">
.select-option-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
