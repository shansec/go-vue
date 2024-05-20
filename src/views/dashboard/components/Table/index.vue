<template>
  <div class="commit-table">
    <div class="commit-table-title">更新日志</div>
    <div class="log">
      <div v-for="(item, key) in dataTimeline" :key="key" class="log-item">
        <div class="flex-1 flex key-box">
          <span class="key" :class="key < 3 && 'top'">{{ key + 1 }}</span>
        </div>
        <div class="flex-5 flex message">{{ item.message }}</div>
        <div class="flex-3 flex form">{{ item.from }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Commits } from '@/api/Github'
import { formatTimeToStr } from '@/utils/date.js'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'DashboardTable'
})

const loading = ref(true)
const dataTimeline = ref([])

const loadCommits = async () => {
  const res = await Commits(0)
  loading.value = false
  res.data.forEach((element, index) => {
    if (element.commit.message && index < 10) {
      dataTimeline.value.push({
        from: formatTimeToStr(element.commit.author.date, 'yyyy-MM-dd'),
        title: element.commit.author.name,
        showDayAndMonth: true,
        message: element.commit.message
      })
    }
  })
}

onMounted(() => {
  loadCommits()
})
</script>

<style lang="scss" scoped>
.commit-table {
  height: 400px;
  background-color: #fff;

  &-title {
    font-weight: 600;
    margin-bottom: 12px;
  }

  .log {
    &-item {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;

      .key-box {
        justify-content: center;
      }

      .key {
        &.top {
          color: #fff;
          background: #314659;
        }

        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        text-align: center;
        color: rgba($color: #000, $alpha: 65%);
        background: #f0f2f5;
        border-radius: 50%;
      }

      .message {
        color: rgb(0 0 0 / 65%);
      }

      .form {
        margin-left: 12px;
        color: rgb(0 0 0 / 65%);
      }

      .flex {
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .flex-1 {
        flex: 1;
      }

      .flex-2 {
        flex: 2;
      }

      .flex-3 {
        flex: 3;
      }

      .flex-4 {
        flex: 4;
      }

      .flex-5 {
        flex: 5;
      }
    }
  }
}
</style>
