import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Accept connections from any IP
    port: 5173,
    strictPort: true, // Optional: Fail if the port is already in use
  }
});