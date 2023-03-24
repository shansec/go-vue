<template>
  <div class="avatar">
    <el-dropdown>
      <span class="avatar-show">
        <el-avatar :size="30" class="avatar-content" :src="userInfo.headerImg" />
        {{ userInfo.nickName }}
        <el-icon><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'

  import { useUserStore } from '@/store/modules/user'
  import { ref } from 'vue'

  const router = useRouter()
  const userStore = useUserStore()

  const userInfo = ref(userStore.userInfo)
  const logout = () => {
    ElMessageBox.confirm('你是否确认退出登录?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        window.sessionStorage.clear()
        router.replace('/login')
        ElMessage({
          type: 'success',
          message: '退出登录成功！',
        })
      })
      .catch(() => {
        console.log('取消退出登录')
      })
  }
</script>

<style lang="scss" scoped>
  .avatar {
    cursor: pointer;

    .avatar-show {
      height: 50px;
      display: flex;
      align-items: center;

      .avatar-content {
        margin-right: 6px;
      }
    }
  }
</style>
