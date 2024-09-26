<script lang="js" setup>
import { ref } from 'vue'
const basePath = ref(import.meta.env.VITE_BASE_PATH)
const basePort = ref(import.meta.env.VITE_SERVER_PORT)

defineOptions({
  name: 'FormCreate'
})
</script>
<template>
  <div class="iframe-box">
    <iframe
      width="100%"
      height="100%"
      :src="`${basePath}:${basePort}/form-generator/#/`"
      frameborder="0"
    />
  </div>
</template>
<style scoped>
.iframe-box {
  width: 100%;
  height: 100%;
}
</style>
