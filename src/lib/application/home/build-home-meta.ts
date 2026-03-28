import { buildLocalizedProfile } from "#application/profile/build-localized-profile";
import type { AppLocale } from "#infrastructure/i18n/locale";
import { createPageMeta, type PageMeta } from "#infrastructure/meta/head";

export function buildHomeMeta(locale: AppLocale): PageMeta {
  const profile = buildLocalizedProfile(locale);

  return createPageMeta({
    title: profile.name,
    description: profile.heroSummary,
  });
}
