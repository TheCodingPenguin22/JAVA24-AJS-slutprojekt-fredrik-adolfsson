import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: "https://thecodingpenguin22.github.io/JAVA24-AJS-slutprojekt-fredrik-adolfsson/",
})
