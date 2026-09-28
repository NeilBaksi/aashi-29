import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' for Vercel, '/aashi-29/' for GitHub Pages (set VITE_BASE=/aashi-29/ in CI)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? '/',
  server: { port: 5729, strictPort: true },
  preview: { port: 5729, strictPort: true },
})
