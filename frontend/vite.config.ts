import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "localhost",
  },
  resolve: {
    alias: {
      "@": path.join(path.resolve(__dirname, "./src")),
      "@assets": path.join(path.resolve(__dirname, "./src/assets")),
      "@components": path.join(path.resolve(__dirname, "./src/components")),
      "@contexts": path.join(path.resolve(__dirname, "./src/contexts")),
      "@configs": path.join(path.resolve(__dirname, "./src/configs")),
      "@pages": path.join(path.resolve(__dirname, "./src/pages")),
      "@utils": path.join(path.resolve(__dirname, "./src/utils")),
      "@hooks": path.join(path.resolve(__dirname, "./src/hooks")),
    },
  },
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
});
