import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"

/**
 * Root index page
 * The middleware (plugin.ts) handles automatic redirection to default language
 */
export default component$(() => {
  // Middleware will redirect to default language before this renders
  return null
})

export const head: DocumentHead = {
  title: "Lee Dongwon - Interactive Portfolio",
  meta: [
    {
      name: "description",
      content: "Interactive portfolio of Lee Dongwon"
    }
  ]
}
