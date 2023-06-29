<template>
  <div class="error-404-container">
    <div class="img-prompt">
      <img src="@/assets/errorpage/404_bg.png" alt="404" />
    </div>
    <div class="text-prompt">
      <div class="text-prompt-text">页面不存在！</div>
      <div class="text-prompt-permissions">您没有操作权限...</div>
      <div class="text-prompt-info">请检查URL地址是否正确，或者点击回到首页。</div>
      <div class="text-prompt-return">回到首页</div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .error-404-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .img-prompt {
      width: 600px;

      img {
        width: 100%;
      }
    }

    .text-prompt {
      .text-prompt-text {
        font-size: 32px;
        font-weight: 700;
        line-height: 40px;
        color: #1482f0;
        margin-bottom: 20px;
      }

      .text-prompt-permissions {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: 700;
        margin-bottom: 10px;
      }

      .text-prompt-info {
        font-size: 13px;
        line-height: 21px;
        color: gray;
        margin-bottom: 30px;
      }

      .text-prompt-return {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
      }
    }
  }
</style>
