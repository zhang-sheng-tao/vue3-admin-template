import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [ 'vue', 'vue-router','pinia'], 
      dts: false
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
  ],
  server:{
    host:true,
    proxy:{
      '/admin': {
        target: 'http://sentrytest.hengshunits.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, '')
      },
    },
  },
  // 添加 @
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
