<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const pieChartsRef = ref<HTMLElement | null>()

const legend = {
  bottom: '20'
}
const toolbox = {
  show: true,
  feature: {
    mark: { show: true },
    dataView: { show: false, readOnly: true },
    restore: { show: false },
    saveAsImage: { show: false }
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
        { value: 40, name: '红色' },
        { value: 38, name: '粉色' },
        { value: 32, name: '黄色' },
        { value: 30, name: '白色' },
        { value: 28, name: '紫色' },
        { value: 26, name: '单层花瓣' },
        { value: 22, name: '重瓣' },
        { value: 18, name: '蔷薇形' }
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
.echarts-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  .echarts-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: white;
  }
}
</style>
