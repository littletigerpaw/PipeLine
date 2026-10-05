import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_UNSPLASH_ACCESS_KEY': JSON.stringify(
      process.env.VITE_UNSPLASH_ACCESS_KEY || '',
    ),
  },
})
