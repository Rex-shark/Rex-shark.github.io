import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              // 設計範本（/templates）各 chunk 共用的 class 合併工具：
              // 不指定的話 rolldown 會把它們併進首頁入口 chunk，首頁多載入約 29KB
              name: 'templates-shared',
              test: /[\\/]node_modules[\\/](tailwind-merge|clsx)[\\/]|[\\/]src[\\/]templates[\\/]lib[\\/]cn\.ts$/,
            },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
