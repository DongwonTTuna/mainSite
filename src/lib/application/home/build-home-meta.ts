import { getProfileContent } from "#application/profile/get-profile-content";
import type { AppLocale } from "#infrastructure/i18n/locale";
import { createPageMeta, type PageMeta } from "#infrastructure/meta/head";

export function buildHomeMeta(locale: AppLocale): PageMeta {
  const profile = getProfileContent(locale);

  return createPageMeta({
    title: profile.name,
    description: profile.heroSummary,
  });
}
