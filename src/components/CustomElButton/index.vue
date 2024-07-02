<script lang="js" setup>
import { useSettingStore } from '@/store/modules/settings.js'
import { computed, defineComponent } from 'vue'

defineComponent({
  name: 'CustomElButton'
})
defineProps({
  size: {
    type: String,
    default: 'default'
  },
  type: {
    type: String,
    default: ''
  },
  text: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const settingStore = useSettingStore()
const isDark = computed(() => settingStore.isDark)
const color = computed(() => settingStore.themeColor)
</script>
<template>
  <el-button
    :size="size"
    :type="type"
    :plain="false"
    :text="text"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :color="color"
    :dark="isDark"
    @click="() => $emit('pointer')"
  >
    <div :class="isDark ? '' : 'icon-color'">
      <slot name="prefix" />
      <slot name="txt" />
      <slot name="suffix" />
    </div>
  </el-button>
</template>
<style scoped lang="scss">
.icon-color {
  color: #fff;
}
</style>
