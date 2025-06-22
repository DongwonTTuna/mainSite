import * as runtime from "./generated/runtime"
import * as messages from "./generated/messages/_index"
export const index = runtime
export const m = messages

export function detectAndSetBrowserLocale(): void {
  if (typeof window === "undefined") return

  const cookieName = "PARAGLIDE_LOCALE"
  const hasCookie = document.cookie.includes(cookieName)

  if (!hasCookie && navigator?.languages?.length) {
    const languages = navigator.languages.map((lang) => ({
      fullTag: lang.toLowerCase(),
      baseTag: lang.split("-")[0]?.toLowerCase()
    }))

    for (const lang of languages) {
      if (runtime.isLocale(lang.fullTag)) {
        runtime.setLocale(lang.fullTag, { reload: false })
        window.location.reload()
        return
      } else if (runtime.isLocale(lang.baseTag)) {
        runtime.setLocale(lang.baseTag, { reload: false })
        window.location.reload()
        return
      }
    }
  }
}
