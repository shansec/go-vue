<script lang="js" setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { confirmBox, successMsg } from '@/utils/message'
import { useUserStore } from '@/store/modules/user.js'
import storage from '@/utils/storage'

const router = useRouter()
const userStore = useUserStore()

const userInfo = ref(userStore.getUserInfo)

// 退出登录并清除缓存
const logout = () => {
  confirmBox('你是否确认退出登录?', '确定', '取消', 'warning')
    .then(() => {
      // 退出登录清除存储的数据
      storage.clear()
      // 设置 token 为空
      userStore.setInfoToNUll()
      router.replace('/login')
      successMsg('退出登录成功')
    })
    .catch(() => {
      console.log('取消退出登录')
    })
}
// 弹出修改密码弹出层
const modifyDialogShow = () => {
  router.push({
    path: '/profile'
  })
}
</script>

<template>
  <div class="avatar">
    <el-dropdown>
      <span class="avatar-show">
        <el-avatar
          :size="30"
          class="avatar-content"
          :src="userInfo.headerImg"
        />
        {{ userInfo.nickName }}
        <el-icon>
          <svg-icon icon-class="header-arrow" />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="modifyDialogShow">
            <svg-icon
              class="svg-icon"
              icon-class="user-setting"
            />
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <svg-icon
              class="svg-icon"
              icon-class="header-logout"
            />
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;

  .avatar-show {
    display: flex;
    align-items: center;
    height: 50px;

    .avatar-content {
      margin-right: 6px;
    }
  }
}

.svg-icon {
  margin-right: 3px;
}

.form {
  margin: 0 auto;
  width: 80%;
}
</style>
