import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'LoqlyWeb',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'index.esm.js'
        if (format === 'cjs') return 'index.cjs.js'
        if (format === 'umd') return 'index.umd.js'
        return `index.${format}.js`
      },
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
})
