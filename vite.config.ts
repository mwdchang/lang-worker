import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  base: './',
  worker: {
    format: 'es'
  },
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'langworker',
      fileName: (format) => `langworker.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
  }
})
