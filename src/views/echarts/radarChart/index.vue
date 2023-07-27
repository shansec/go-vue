<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const radarChartsRef = ref<HTMLElement | null>()

let option = {
  legend: {
    data: ['电影', '阅读'],
    bottom: '20'
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '历史', max: 6500 },
      { name: '人文', max: 16000 },
      { name: '推理', max: 30000 },
      { name: '悬疑', max: 38000 },
      { name: '小说', max: 52000 },
      { name: '科幻', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '电影'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '阅读'
        }
      ]
    }
  ]
}
onMounted(() => {
  let charts = echarts.init(radarChartsRef.value)
  charts.setOption(option)
})
</script>
<template>
  <div class="echarts-container">
    <div ref="radarChartsRef" class="echarts-box"></div>
  </div>
</template>
<style lang="scss" scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .echarts-box {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
