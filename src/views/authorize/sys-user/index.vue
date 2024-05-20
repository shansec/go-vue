<script lang="js" setup>
import UserTable from '@/views/authorize/sys-user/components/UserTable/index.vue'
import DepartTree from '@/views/authorize/sys-user/components/DepartTree/index.vue'
</script>

<template>
  <BasicLayout>
    <template #wrapper>
      <div class="user-container">
        <el-row>
          <el-col :span="4">
            <DepartTree />
          </el-col>
          <el-col :span="20">
            <UserTable />
          </el-col>
        </el-row>
      </div>
    </template>
  </BasicLayout>
</template>

<style scoped lang="scss">
.user-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}
</style>
