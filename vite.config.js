import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-transform-react-jsx"],
      },
      include: /\.(js|jsx)$/,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
    include: ["react-router-dom", "react-router", "react"],
  },
});
