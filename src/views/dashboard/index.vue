<script lang="js" setup>
import EchartsLine from '@/views/dashboard/components/Line/index.vue'
import DashboardTable from '@/views/dashboard/components/Table/index.vue'
import { useWeatherInfo } from '@/views/dashboard/weather'

defineOptions({
  name: 'Dashboard'
})

const weatherInfo = useWeatherInfo()
</script>

<template>
  <BasicLayout bg-color="transparent">
    <template #wrapper>
      <el-card class="card-box">
        <div class="card top-card">
          <div class="top-card-left">
            <div class="top-card-left-title">
              早上好，管理员，请开始一天的工作吧
            </div>
            <div class="top-card-left-dot">{{ weatherInfo }}</div>
            <el-row class="my-8 w-[500px] flex-align">
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex items-center">
                  <el-icon class="dashboard-icon">
                    <sort />
                  </el-icon>
                  今日流量 (3035)
                </div>
              </el-col>
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex items-center">
                  <el-icon class="dashboard-icon">
                    <avatar />
                  </el-icon>
                  总用户数 (1001)
                </div>
              </el-col>
              <el-col :span="8" :xs="24" :sm="8">
                <div class="flex items-center">
                  <el-icon class="dashboard-icon">
                    <comment />
                  </el-icon>
                  好评率 (99%)
                </div>
              </el-col>
            </el-row>
            <div>
              <div class="top-card-left-item">
                前端模块：
                <a
                  style="color: #409eff"
                  target="view_window"
                  href="https://github.com/shansec/go-vue"
                >https://github.com/shansec/go-vue</a>
              </div>
              <div class="top-card-left-item">
                后端模块：
                <a
                  style="color: #409eff"
                  target="view_window"
                  href="https://github.com/shansec/go-vue-admin"
                >https://github.com/shansec/go-vue-admin</a>
              </div>
            </div>
          </div>
          <img src="@/assets/dashboard.png" class="top-card-right" alt />
        </div>
      </el-card>
      <el-card>
        <div class="card-box">
          <div class="card">
            <div class="card-title">数据统计</div>
            <div class="p-4">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="18">
                  <echarts-line />
                </el-col>
                <el-col :xs="24" :sm="6">
                  <dashboard-table />
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-card>
    </template>
  </BasicLayout>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 0;
}

@mixin flex-center {
  display: flex;
  align-items: center;
}

.card-box {
  //padding: 12px 16px;
  margin-bottom: 30px;

  & + .card-box {
    padding-top: 0;
  }
}

.card {
  overflow: hidden;
  padding: 26px 30px;
  height: auto;
  border-radius: 2px;
  box-sizing: border-box;

  .card-title {
    margin-bottom: 10px;
    font-size: 20px;
  }
}

.top-card {
  justify-content: space-between;
  height: 260px;
  // color: #777;

  @include flex-center;

  &-left {
    display: flex;
    height: 100%;
    flex-direction: column;

    &-title {
      font-size: 22px;
      // color: #343844;
    }

    &-dot {
      margin-top: 24px;
      font-size: 16px;
      // color: #6b7687;
    }

    .flex-align {
      margin-top: 10px;

      .items-center {
        display: flex;
        align-items: center;
      }
    }

    &-rows {
      align-items: center;
      margin-top: 18px;
      width: 600px;
      // color: #6b7687;
    }

    &-item {
      + .top-card-left-item {
        margin-top: 14px;
      }

      margin-top: 14px;
    }
  }

  &-right {
    margin-top: 28px;
    width: 600px;
    height: 600px;
  }
}

:deep(.el-card__header) {
  padding: 0;
  border-bottom: none;
}

.card-header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.quick-entrance-title {
  width: 100%;
  height: 30px;
  font-size: 22px;
  color: #333;
  border-bottom: 1px solid #eee;
}

.quick-entrance-items {
  @include flex-center;

  justify-content: center;
  text-align: center;
  color: #333;

  .quick-entrance-item {
    padding: 16px 28px;
    margin-top: -16px;
    margin-bottom: -16px;
    height: auto;
    text-align: center;
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 7px 0 rgb(217 217 217 / 55%);
    }
    // align-items: center;
    &-icon {
      justify-content: center;
      margin: 0 auto;
      width: 50px;
      height: 50px !important;
      border-radius: 8px;

      @include flex-center;

      i {
        font-size: 24px;
      }
    }

    p {
      margin-top: 10px;
    }
  }
}

.echart-box {
  padding: 14px;
}

.dashboard-icon {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: rgb(85 160 248);

  @include flex-center;
}

.flex-center {
  @include flex-center;
}

//小屏幕不显示右侧，将登录框居中
@media (width <= 750px) {
  .card {
    padding: 20px 10px !important;

    .top-card {
      height: auto;

      &-left {
        &-title {
          font-size: 20px !important;
        }

        &-rows {
          align-items: center;
          margin-top: 15px;
        }
      }

      &-right {
        display: none;
      }
    }

    .gva-middle-card {
      &-item {
        line-height: 20px;
      }
    }

    .dashboard-icon {
      font-size: 18px;
    }
  }
}
</style>
