import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), tailwindcss()],
  entry: "./src/index.js",
  server: {
    host: "0.0.0.0", // default: 'localhost'
    allowedHosts: ['bourbon.zapto.org','coursera.zapto.org'],
  },
  preview: {
    host: "0.0.0.0",
    port: 81,
    strictPort: true,
    allowedHosts: [
      'bourbon.zapto.org',
      'coursera.zapto.org',
      '.zapto.org' // wildcard subdomains (nếu cần)
    ],
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
