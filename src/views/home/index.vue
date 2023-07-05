<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="people-info">
          <div class="people-info-detail">
            <el-avatar :size="50" :src="userInfo.headerImg" />
            <div>昵称：{{ userInfo.userName }}</div>
            <div>职业：前端小白</div>
            <div>公司：小公司</div>
            <div>年龄：未知</div>
            <div>性别：男</div>
            <div>现住址：中国-河南-郑州</div>
            <div>邮箱：x201906140415h@163.com</div>
            <div>技术栈：JavaScript、Vue、Node、JQuery、CSS、HTML</div>
          </div>
          <el-divider />
          <div class="people-info-label">
            <h5>个性标签</h5>
            <div class="label-list">
              <template v-for="label in labelList">
                <el-tag>{{ label }}</el-tag>
              </template>
            </div>
          </div>
          <el-divider />
          <div class="people-info-motto">
            <h5>favorite words</h5>
            <div class="favorite-words">知之真切笃实处，即是行；行之明觉精察处，即是知。</div>
          </div>
          <el-divider />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="project-info"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { reactive, ref } from 'vue';

  const userStore = useUserStore()
  const userInfo = reactive<object>(userStore.getUserInfo())
  const labelList = ref<Array<string>>(['读书', '敲代码', '听音乐', '冥想'])
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: #f0f2f5;

  .people-info {
    height: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 4px;

    div {
      margin-bottom: 5px;
    }

    .people-info-label {
      .label-list {
        span {
          margin-right: 10px;
        }
      }
    }
  }

  .project-info {
    height: 100%;
    width: 100%;
  }
}
</style>