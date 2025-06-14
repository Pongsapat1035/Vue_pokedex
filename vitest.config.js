// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom', // or 'happy-dom'
    setupFiles: './test/setup.js', // optional
  },
  coverage: {
    exclude: ['src/main.js', 'tailwind.config.js', 'vite.config.js', 'postcss.config.js'],
  }
})
