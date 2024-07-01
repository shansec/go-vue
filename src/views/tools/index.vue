<script lang="js" setup>
import { useTagsSetting } from '@/store/modules/tagsView'
const tagsStore = useTagsSetting()

defineOptions({
  name: 'Tools'
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="el-fade-in-linear">
      <keep-alive :include="tagsStore.keepAliveViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
