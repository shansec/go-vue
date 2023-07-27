<script setup lang="ts">
import MigrationChart from '@/components/echarts/migrateChart/index.vue'
</script>

<template>
  <div class="echarts-box">
    <migration-chart height="100%" width="100%" id="migration"></migration-chart>
  </div>
</template>

<style lang="scss" scoped>
.echarts-box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #001540;
  box-sizing: border-box;
  .info {
    position: absolute;
    left: 0;
    width: 100%;
    font-weight: bold;
    z-index: 9;
  }
}
</style>
