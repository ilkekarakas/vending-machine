import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/vending-machine/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
  },
})
