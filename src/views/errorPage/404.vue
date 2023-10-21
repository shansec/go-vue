<script lang="js" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ path: '/dashboard' })
}
</script>

<template>
  <div class="error-404-container">
    <div class="img-prompt">
      <img src="@/assets/errorpage/404_bg.png" alt="404" />
    </div>
    <div class="text-prompt">
      <div class="text-prompt-text">页面不存在！</div>
      <div class="text-prompt-permissions">您没有操作权限...</div>
      <div class="text-prompt-info">
        请检查URL地址是否正确，或者点击回到首页。
      </div>
      <div class="text-prompt-return" @click="goHome">回到首页</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-404-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .img-prompt {
    width: 600px;

    img {
      width: 100%;
    }
  }

  .text-prompt {
    .text-prompt-text {
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: 700;
      line-height: 40px;
      color: #1482f0;
    }

    .text-prompt-permissions {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      color: #222;
    }

    .text-prompt-info {
      margin-bottom: 30px;
      font-size: 13px;
      line-height: 21px;
      color: gray;
    }

    .text-prompt-return {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      font-size: 14px;
      text-align: center;
      color: #fff;
      background: #1482f0;
      border-radius: 100px;
      line-height: 36px;
      cursor: pointer;
    }
  }
}
</style>
