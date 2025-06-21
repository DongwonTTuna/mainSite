import { defineConfig } from "vitest/config"
import { paraglideVitePlugin } from "@inlang/paraglide-js"
import { sveltekit } from "@sveltejs/kit/vite"

export default defineConfig({
  plugins: [
    sveltekit(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/i18n/generated"
    })
  ],
  server: {
    port: 3000
  },
  test: {
    include: ["src/__tests__/unit/*.{test,spec}.{js,ts}"]
  }
})
