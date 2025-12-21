import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path"; // Import the resolve function from the 'path' module

// vitejs.dev
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Maps '@' to the 'src' directory
      // Or map 'src' directly:
      // 'src': resolve(__dirname, 'src'),
    },
  },
});
