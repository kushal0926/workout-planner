import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Optimize production bundle
    minify: "terser",
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react")) {
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: process.env.VITE_API_URL || "http://localhost:5001",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
