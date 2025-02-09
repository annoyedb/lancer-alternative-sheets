import * as fsPromises from "fs/promises";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";
import { defineConfig, Plugin } from "vite";

export default defineConfig({
  esbuild: {
    target: ['es2022'],
    minifyIdentifiers: false,
    minifySyntax: true,
    minifyWhitespace: true,
    keepNames: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: "src/scripts/module.ts",
      output: {
        dir: "dist",
        entryFileNames: "scripts/module.js",
        format: "es",
      },
    },
    minify: "esbuild",
  },
  plugins: [
    scss({
      fileName: "style.css",
      sourceMap: true,
      watch: ["src/**/*.scss",]
    }),
    copy({
      targets: [
        { src: "src/templates", dest: "dist" },
        { src: "src/lang", dest: "dist" },
      ],
      hook: "writeBundle",
    }),
    updateManifest(),
  ]
});

function updateManifest(): Plugin
{
  return {
    name: "update-manifest",
    async writeBundle(): Promise<void>
    {
      const version = process.env.VERSION;
      const contents: string = await fsPromises.readFile(
        "src/module.json",
        "utf-8"
      );
      const manifest = JSON.parse(contents) as Record<
        string,
        unknown
      >;

      if (version)
      {
        manifest["version"] = version;
      }

      await fsPromises.writeFile(
        "dist/module.json",
        JSON.stringify(manifest, null, 4)
      );
    },
  };
}