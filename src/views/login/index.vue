<script lang="ts" setup>
import LoginForm from '@/views/login/components/LoginForm.vue'
import SwitchDark from '@/components/switchDark/index.vue'
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <SwitchDark class="switch_dark" />
      <div class="login-left">
        <img src="../../assets/login/side-logo.png" alt="" />
      </div>
      <div class="login-form">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index';
</style>
