import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import {imagetools} from "vite-imagetools";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    imagetools(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
      strategy: ["url", "cookie", "baseLocale"],
      disableAsyncLocalStorage: true,
    }),
  ],
});
