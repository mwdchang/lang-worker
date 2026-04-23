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
      name: 'langworker', // global name for UMD/IIFE builds (if needed)
      fileName: (format) => `langworker.${format}.js`,
      formats: ['es'] // or ['es', 'cjs'] if you want both
    },
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
  }
})
