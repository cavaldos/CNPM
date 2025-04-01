import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), tailwindcss()],
  entry: "./src/index.js",
  server: {
    host: "0.0.0.0",
    // Allow the specific domain and potentially subdomains
    allowedHosts: ['coursera.zapto.org', 'bourbon.zapto.org', 'all'],
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    // Allow the specific domain and potentially subdomains
    allowedHosts: ['coursera.zapto.org', 'bourbon.zapto.org', 'all'],
    cors: true

  },

  resolve: {
    alias: [
      {
        find: "~/",
        replacement: "/src/",
      },
    ],
  },
  build: {
    outDir: "dist",
  },
});
