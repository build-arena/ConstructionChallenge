import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Deployed as a project site under build-arena/ConstructionChallenge,
// served at https://build-arena.github.io/ConstructionChallenge/
export default defineConfig({
  base: "/ConstructionChallenge/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
