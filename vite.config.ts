import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (
            id.includes("react") ||
            id.includes("scheduler") ||
            id.includes("react-dom") ||
            id.includes("react-router")
          ) {
            return "react-vendor";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("class-variance-authority") ||
            id.includes("cmdk") ||
            id.includes("lucide-react")
          ) {
            return "ui-vendor";
          }

          if (
            id.includes("@tanstack") ||
            id.includes("@supabase") ||
            id.includes("zod") ||
            id.includes("react-hook-form") ||
            id.includes("@hookform")
          ) {
            return "data-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
