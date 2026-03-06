import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    }
  }
})

//usePolling: true fixes this by making Vite actively check for changes itself every few milliseconds instead of waiting to be notified: