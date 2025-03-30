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
    port: 8080,
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
