import { server$ } from "@builder.io/qwik-city"
import type { LoadTranslationFn, Translation, TranslationFn } from "qwik-speak"

/**
 * Dynamic translation loader using import.meta.glob
 */
const translationFiles = import.meta.glob<Translation>("/src/i18n/**/*.json")

/**
 * Server function to load translations
 */
const loadTranslation$: LoadTranslationFn = server$(async (lang: string, asset: string) => {
  const filePath = `/src/i18n/${lang}/${asset}.json`
  const loader = translationFiles[filePath]

  if (!loader) {
    console.warn(`Translation file not found: ${filePath}`)
    return {}
  }

  try {
    const data = await loader()
    // Return the entire data object since our JSON files already have the structure
    return data || {}
  } catch (error) {
    console.error(`Error loading translation: ${filePath}`, error)
    return {}
  }
})

export const translationFn: TranslationFn = {
  loadTranslation$: loadTranslation$
}
