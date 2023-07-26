## 简介
go-vue 是一个后台前端解决方案项目，它使用了最新的前端技术栈、动态路由、权限验证，并且有着丰富的组件。本项目也参考了很多开源的项目。


### git仓库(欢迎 Star⭐)
- GitHub： —— [https://github.com/shansec/go-vue](https://github.com/shansec/go-vue)

## 项目功能
- 使用 Vue3 开发，单文件组件采用＜script setup＞
- 采用 Vite3 作为项目开发、打包工具
- 登录逻辑，使用vue-router进行路由权限拦截、判断、路由懒加载
- 使用 keep-alive 对整个页面进行缓存，支持多级嵌套页面
- 使用 Pinia状态管理工具，轻量、简单、易用
- 项目集成了 TypeScript
- 使用 Prettier 统一格式化代码，集成 Eslint、代码校验规范
- 各种可视化地图组件

## 安装
```
  # GitHub
  git clone https://github.com/shansec/go-vue.git
```

## 下载依赖
```
 npm install
 cnpm install
 yarn 
 # npm install 安装失败，请升级 nodejs 到 16 以上或者尝试使用以下命令：
  npm install --registry=https://registry.npm.taobao.org
```

## 运行打包
```
 npm run dev
 npm run build 
```

## eslint+prettier
```
# eslint 检测代码
npm run lint

#prettier 格式化代码
npm run format
```

## 文件目录结构
```
go-vue
├─ public                 # 静态资源文件
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ hooks               # 常用 Hooks
│  ├─ layout              # 框架布局
│  ├─ plugins             # 插件配置
│  ├─ router              # 路由管理
│  ├─ store               # pinia 状态管理
│  ├─ styles              # 全局样式
│  ├─ utils               # 工具库
│  ├─ views               # 项目页面
│  ├─ App.vue             # 入口页面
│  └─ main.ts             # 入口文件
├─ .editorconfig          # 全局格式配置
├─ .env.development       # 开发环境配置
├─ .eslintignore          # 忽略 eslint 校验
├─ .eslintrc.js           # eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 style 格式化
├─ .stylelintrc.js        # style 配置
├─ index.html             # 入口 html
├─ package.json           # 依赖管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```
