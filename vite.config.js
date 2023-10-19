import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    https: false,
    port: 5157,
    open: true,
    cors: false,
    proxy: {
      '/api': {
        // target: 'http://localhost:8080',
        target:
          'https://symmetrical-space-telegram-q4jp9rvjx5xf65wp-8080.app.github.dev/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
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
})
