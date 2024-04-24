<script lang="js" setup>
import { computed, ref } from 'vue'

import { useSettingStore } from '@/store/modules/settings.js'
import { THEME_COLOR } from '@/config/index.js'

import SwitchDark from '@/components/SwitchDark/index.vue'

const settingStore = useSettingStore()
// 保持一个子菜单打开
const uniqueOpened = ref(settingStore.uniqueOpened)
// 是否展示侧边栏Logo
const showLogo = ref(settingStore.showLogo)
// 是否显示标签栏
const showTagsView = ref(settingStore.showTagsView)
// 灰色模式
const grey = ref(settingStore.grey)
// 色弱模式
const weakColor = ref(settingStore.weakColor)
// 主题颜色
const themeColor = ref(settingStore.themeColor)
// 预定义颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
])
const drawer = computed({
  get () {
    return settingStore.showThemeSetting
  },
  set () {
    changeTheme('showThemeSetting', !settingStore.showThemeSetting)
  }
})

/**
 * 设置主题的样式
 * @param key 属性名称
 * @param val 属性值
 */
const changeTheme = (key, val) => {
  settingStore.changeThemeSetting(key, val)
}

// const openThemeSetting = () => {
//   drawer.value = true
// }
/**
 * 修改色弱 和 灰色模式
 * @param type grey | weak
 * @param value true | false
 */
const changeGreyAndWeakColor = (type, value) => {
  const body = document.documentElement
  if (!value) {
    return body.setAttribute('style', '')
  }
  if (type === 'grey') {
    body.setAttribute('style', 'filter: grayscale(1)')
  }
  if (type === 'weakColor') {
    body.setAttribute('style', 'filter: invert(80%)')
  }
  changeTheme(type, value)
}
/**
 * 设置主题颜色
 * @param val 颜色值
 */
const changeThemeColor = (val) => {
  if (!val) {
    themeColor.value = THEME_COLOR
  }
  document.documentElement.style.setProperty('--el-color-primary', val)
  changeTheme('themeColor', val)
}
</script>

<template>
  <div class="m-theme-setting">
    <!--    <div class="theme-fix">-->
    <!--      <div-->
    <!--        class="item"-->
    <!--        @click="openThemeSetting"-->
    <!--      >-->
    <!--        <el-icon-->
    <!--          size="30"-->
    <!--          :color="settingStore.themeColor"-->
    <!--        ><brush /></el-icon>-->
    <!--        <span :style="{ color: settingStore.themeColor }">主题设置</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <el-drawer v-model="drawer" size="300px">
      <template #header>
        <h3>主题设置</h3>
      </template>
      <div class="theme-item">
        <label>黑暗模式</label>
        <SwitchDark />
      </div>
      <div class="theme-item">
        <label>显示标签栏</label>
        <el-switch
          v-model="showTagsView"
          @change="(val) => changeTheme('showTagsView', val)"
        />
      </div>
      <div class="theme-item">
        <label>显示侧边栏Logo</label>
        <el-switch
          v-model="showLogo"
          @change="(val) => changeTheme('showLogo', val)"
        />
      </div>
      <div class="theme-item">
        <label>保持一个子菜单打开</label>
        <el-switch
          v-model="uniqueOpened"
          @change="(val) => changeTheme('uniqueOpened', val)"
        />
      </div>
      <div class="theme-item">
        <label>灰色模式</label>
        <el-switch
          v-model="grey"
          @change="(val) => changeGreyAndWeakColor('grey', val)"
        />
      </div>
      <div class="theme-item">
        <label>色弱模式</label>
        <el-switch
          v-model="weakColor"
          @change="(val) => changeGreyAndWeakColor('weakColor', val)"
        />
      </div>
      <div class="theme-item">
        <label>主题颜色</label>
        <el-color-picker
          v-model="themeColor"
          :predefine="predefineColors"
          @change="(val) => changeThemeColor(val)"
        />
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
  padding: 15px 20px 14px;
  margin-bottom: 0;
  border: 0 solid;
  border-bottom: 1px solid #ebeef5;

  button {
    padding-right: 0;
  }
}

.m-theme-setting {
  .theme-fix {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 999;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 5.5px;
    box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
    transform: translateY(-50%);

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;
      margin: 0;
      width: 60px;
      height: 60px;
      color: #3698fd;
      background: #ebf5ff;
      border-radius: 5.5px;
      list-style: none;
      flex-direction: column;
    }
  }

  .theme-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: black;
  }
}
</style>
