import type { AppLocale } from "#infrastructure/i18n/locale";
import { localizePath } from "#infrastructure/i18n/locale";

export const homeSectionAnchors = {
  intro: "intro",
  experience: "experience",
  projects: "projects",
  skills: "skills",
  contact: "contact",
} as const;

export type HomeSectionAnchor = keyof typeof homeSectionAnchors;

export function getHomeSectionHref(section: HomeSectionAnchor): `#${string}` {
  return `#${homeSectionAnchors[section]}`;
}

export function getLocalizedHomeSectionHref(
  url: URL,
  locale: AppLocale,
  section: HomeSectionAnchor,
): string {
  return localizePath(url, locale, "/", homeSectionAnchors[section]);
}
