import type { RequestHandler } from "@builder.io/qwik-city"
import { setSpeakContext, validateLocale } from "qwik-speak"
import { config } from "~/lib/i18n/speak-config"

/**
 * This middleware runs for every request.
 * It sets up the locale based on the URL or browser preferences.
 * Also sets security headers for non-SSG environments.
 */
export const onRequest: RequestHandler = async ({ locale, url, redirect, request, params, headers }) => {
  const pathname = url.pathname
  const supportedLocales = config.supportedLocales.map((l) => l.lang)

  let lang: string | undefined = undefined

  // Check if we have a lang param from the route
  if (params.lang && validateLocale(params.lang)) {
    // Check supported locales
    lang = config.supportedLocales.find((value) => value.lang === params.lang)?.lang
  } else {
    // Extract locale from pathname
    const pathnameLocale = pathname.split("/")[1]

    // If we're at root, redirect to default locale
    if (pathname === "/") {
      throw redirect(302, `/${config.defaultLocale.lang}/`)
    }

    // If the pathname locale is supported, use it
    if (supportedLocales.includes(pathnameLocale)) {
      lang = pathnameLocale
    } else {
      // Otherwise, try to detect from Accept-Language header
      const acceptLanguage = request.headers.get("accept-language")
      const detectedLocale = detectLocaleFromHeader(acceptLanguage, supportedLocales)

      // Redirect to detected or default locale
      const targetLocale = detectedLocale || config.defaultLocale.lang
      throw redirect(302, `/${targetLocale}${pathname}`)
    }
  }

  // Set Qwik locale
  const selectedLang = lang || config.defaultLocale.lang
  locale(selectedLang)

  // Set qwik-speak context
  setSpeakContext(config)

  // Set security headers for non-SSG environments (dev, preview, SSR)
  headers.set("X-Frame-Options", "DENY")
  headers.set("X-Content-Type-Options", "nosniff")
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
}

/**
 * Detect locale from Accept-Language header
 */
function detectLocaleFromHeader(acceptLanguage: string | null, supportedLocales: string[]): string | null {
  if (!acceptLanguage) return null

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, q = "1"] = lang.trim().split(";q=")
      return { locale: locale.toLowerCase(), quality: parseFloat(q) }
    })
    .sort((a, b) => b.quality - a.quality)

  // Find first matching supported locale
  for (const { locale } of languages) {
    const match = supportedLocales.find(
      (supported) => locale.startsWith(supported.toLowerCase()) || supported.toLowerCase().startsWith(locale)
    )
    if (match) return match
  }

  return null
}
