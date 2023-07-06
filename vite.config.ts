import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve, join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/style/variables.module.scss')}";`
        },
        math: 'strict',
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  // 公共基础路径
  base: './',
  // 作为静态资源服务的文件夹
  publicDir: 'public',
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    }
  },
  server: {
    // 是否开启 https
    // https: false,
    // 端口号
    // port: 8080,
    // 端口被占用直接退出
    // strictPort: true,
    // 监听所有地址
    // host: '0.0.0.0',
    // 是否自动打开浏览器
    open: false,
    // 是否允许跨域
    cors: false,
    // 自定义代理规则
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    // Vite 服务器默认会忽略对 .git/ 和 node_modules/ 目录的监听。
    watch: {}
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    // 设置最终构建的浏览器兼容目标
    target: 'es2015',
    // 构建是否生成map文件
    sourcemap: true,
    // chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
    // 指定输出路径（相对于项目根目录）
    outDir: 'customDist'
  }
})
