import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  base: './',
  worker: {
    format: 'es'
  },
  build: {
    outDir: 'dist/demo',
    target: 'esnext',
    rollupOptions: {
      input: {
        demo: path.resolve(__dirname, 'index.html')
      }
    }
  }
})
