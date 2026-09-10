import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Give this project its own port so it never collides with another
    // dev server (5173 is Vite's default and is often already taken).
    port: 5180,
    // Fail loudly instead of silently sliding to 5181, 5182, ...
    strictPort: true,
    // Open the correct URL in the browser automatically
    open: true,
  },
})
