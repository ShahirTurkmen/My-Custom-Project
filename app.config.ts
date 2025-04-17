import { defineConfig } from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  tsr: {
    appDirectory: "src",
  },
  server: {
    routeRules: {
      "/**": {
        cors: true,

        headers: {
          "Cross-Origin-Resource-Policy": "cross-origin",
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Embedder-Policy": "require-corp",
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          // "Access-Control-Allow-Headers": "*",
          // "Access-Control-Allow-Credentials": "true",
        },
      },
    },
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tailwindcss(),
    ],
  },
});

export default config;
