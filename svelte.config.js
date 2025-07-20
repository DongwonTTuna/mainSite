import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      "$i18n": "src/lib/i18n/runtime",
      "$i18n/*": "src/lib/i18n/runtime/*",
      "$views": "src/views"
    },
    files: {
      hooks: {
        server: "src/lib/hooks/server/hooks.server.ts",
        client: "src/lib/hooks/client/hooks.client.ts",
        universal: "src/lib/hooks/universal/hooks.ts"
      }
    }
  }
}

export default config
