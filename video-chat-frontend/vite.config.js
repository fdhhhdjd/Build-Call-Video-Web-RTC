//* LIB
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env": env,
    },
    plugins: [
      react(),
      viteCompression({
        verbose: false,
        algorithm: "gzip",
        ext: ".gz",
      }),
      viteCompression({
        verbose: true,
        algorithm: "brotliCompress",
        ext: ".br",
      }),
      VitePWA({
        workbox: {
          globPatterns: ["**/*.{js,css,html}"],
        },
      }),
    ],
    server: {
      // Frontend
      port: 9999,
    },
    optimizeDeps: {
      include: ["./src/*.jsx"], // Add commonly used dependencies here
    },
  };
});
