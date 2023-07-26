<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const pieChartsRef = ref<HTMLElement | null>()

const legend = {
  top: 'bottom'
}
const toolbox = {
  show: true,
  feature: {
    mark: { show: true },
    dataView: { show: true, readOnly: false },
    restore: { show: true },
    saveAsImage: { show: true }
  }
}
let option = {
  legend,
  toolbox,
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
}
onMounted(() => {
  let charts = echarts.init(pieChartsRef.value)
  charts.setOption(option)
})
</script>
<template>
  <div class="echarts-container">
    <div ref="pieChartsRef" class="echarts-box"></div>
  </div>
</template>
<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 100%;
  background: white;
}
</style>
