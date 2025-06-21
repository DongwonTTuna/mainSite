import type { Handle } from "@sveltejs/kit"
import { getLocale } from "$lib/i18n/generated/runtime"
import { m } from "$lib/i18n"

export const handleParaglide: Handle = async ({ event, resolve }) => {
  const locale = getLocale()
  const textDirection = "ltr"

  // Replace Paraglide placeholders in HTML
  return resolve(event, {
    transformPageChunk: ({ html }) => {
      return html
        .replace("%paraglide.lang%", locale)
        .replace("%paraglide.textDirection%", textDirection)
        .replace("%paraglide.locale%", locale)
        .replace("%paraglide.page_title%", m.page_title())
        .replace("%paraglide.page_description%", m.page_description())
        .replace("%paraglide.og_title%", m.og_title())
        .replace("%paraglide.og_description%", m.og_description())
        .replace("%paraglide.twitter_title%", m.twitter_title())
        .replace("%paraglide.twitter_description%", m.twitter_description())
    }
  })
}
