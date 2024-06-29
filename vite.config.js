import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import env from "./.env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },

  envPrefix: ["VITE_", "TAILORED_"],

  define: {
    "process.env": env,
  },

  base: "./",

  build: {
    outDir: "build",
  },

  server: {
    port: 3000,
  },

  preview: {
    port: 3000,
  },

  logLevel: "info",

  clearScreen: false,

  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
