import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import legacyPlugin from '@vitejs/plugin-legacy'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 需要自动导入的 svg 文件目录（可自行修改）我的路径如下图所示
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 执行icon name的格式（可自行修改）
        symbolId: 'icon-[name]'
      }),
      env.VITE_POSITION === 'open' &&
        codeInspectorPlugin({ bundler: 'vite', hotKeys: ['shiftKey'] }),
      legacyPlugin({
        targets: [
          'Android > 39',
          'Chrome >= 60',
          'Safari >= 10.1',
          'iOS >= 10.3',
          'Firefox >= 54',
          'Edge >= 15'
        ]
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      https: false,
      port: env.VITE_CLI_PORT,
      open: false,
      cors: false,
      proxy: {
        [env.VITE_BASE_API]: {
          target: `${env.VITE_BASE_PATH}:${env.VITE_SERVER_PORT}/${env.VITE_ROUTER_PREFIX}`,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_BASE_API), '')
        }
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        }
      },
      target: 'es2015',
      sourcemap: true,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false
    }
  }
})
