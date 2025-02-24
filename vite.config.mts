import foundryvtt from "vite-plugin-foundryvtt";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";
import { defineConfig } from "vite";
import path from "path";
import MANIFEST from "./src/module.json";

const substitutions = {
  version: process.env.VERSION,
  download: process.env.ARCHIVE_URL,
}

export default defineConfig({
  base: "/modules/lancer-alternative-sheets",
  server: {
    port: 30001,
    open: "/",
    proxy: {
      "^(?!/modules/lancer-alternative-sheets/)": "http://localhost:30000/",
      "/socket.io": {
        target: "ws://localhost:30000",
        ws: true,
      },
    },
  },
  esbuild: {
    target: ['es2022'],
    minifyIdentifiers: false,
    minifySyntax: true,
    minifyWhitespace: true,
    keepNames: true,
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      name: "lancer-alternative-sheets",
      entry: "src/scripts/module.ts",
      formats: ["es"],
    },
  },
  plugins: [
    foundryvtt(MANIFEST, { type: "module", substitutions }),
    svelte({
      preprocess: sveltePreprocess(),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});
