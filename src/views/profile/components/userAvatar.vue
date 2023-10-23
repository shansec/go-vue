<script lang="js" setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { VueCropper } from 'vue-cropper'

defineProps({
  user: {
    type: Object,
    default: null
  }
})
const open = ref(false)
const title = ref('修改头像')
const userStore = useUserStore()
const options = reactive({
  // 裁剪图片的地址
  img: userStore.userInfo.headerImg,
  // 是否默认生成截图框
  autoCrop: true,
  // 默认生成截图框宽度
  autoCropWidth: 200,
  // 默认生成截图框高度
  autoCropHeight: 200,
  // 固定截图框大小 不允许改变
  fixedBox: true
})
const previews = reactive({})
const cropper = ref(null)

// 编辑头像
const editCropper = () => {
  open.value = true
}
// 覆盖默认的上传行为
const requestUpload = () => {}
// 向左旋转
const rotateLeft = () => {
  cropper.value.rotateLeft()
}
// 向右旋转
const rotateRight = () => {
  cropper.value.rotateRight()
}
// 图片缩放
const changeScale = (num) => {
  num = num || 1
  cropper.value.changeScale(num)
}
// 上传预处理
const beforeUpload = (file) => {
  if (file.type.indexOf('image/') === -1) {
    // this.msgError('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
  } else {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.options.img = reader.result
    }
  }
}
// 上传图片
const uploadImg = () => {
  cropper.value.getCropBlob((data) => {
    const formData = new FormData()
    formData.append('upload[]', data)
    console.log('头像上传')
    // uploadAvatar(formData).then((response) => {
    //   if (response.code === 200) {
    //     this.open = false
    //     this.options.img = process.env.VUE_APP_BASE_API + response.data
    //     // this.msgSuccess(response.msg)
    //   } else {
    //     // this.msgError(response.msg)
    //   }
    //   cropper.value.clearCrop()
    // })
  })
}
// 实时预览
const realTime = (data) => {
  previews.value = data
}
</script>

<template>
  <div>
    <img
      :src="options.img"
      title="点击上传头像"
      class="img-circle img-lg"
      @click="editCropper"
    />
    <el-dialog
      v-model="open"
      :title="title"
      width="800px"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :auto-crop="options.autoCrop"
            :auto-crop-width="options.autoCropWidth"
            :auto-crop-height="options.autoCropHeight"
            :fixed-box="options.fixedBox"
            @realTime="realTime"
          />
        </el-col>
        <el-col :xs="24" :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload
            action="#"
            :http-request="requestUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small">
              上传
              <i class="el-icon-upload el-icon--right" />
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <el-button icon="el-icon-plus" size="small" @click="changeScale(1)" />
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          />
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          />
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          />
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <el-button type="primary" size="small" @click="uploadImg()"
            >提 交</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.img-lg {
  width: 120px;
  height: 120px;
}

.img-circle {
  border-radius: 50%;
}
</style>
