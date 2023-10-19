import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      https: false,
      // port: env.VITE_CLI_PORT,
      open: true,
      cors: false,
      proxy: {
        [env.VITE_BASE_API]: {
          target: `${env.VITE_BASE_PATH}`,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + env.VITE_BASE_API), '')
        },
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
