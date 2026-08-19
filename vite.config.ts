import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "i-img-uploader",
      fileName: (format: any) => `i-img-uploader.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM', 
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    }
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json'
    })
  ],
})
