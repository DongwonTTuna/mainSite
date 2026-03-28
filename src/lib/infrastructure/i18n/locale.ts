import {
  baseLocale,
  getLocale,
  localizeUrl,
  locales,
} from "#infrastructure/i18n/paraglide";

export type AppLocale = (typeof locales)[number];

export { baseLocale, locales };

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function getAppLocale(): AppLocale {
  return getLocale();
}

export function resolveLocaleFromPathname(pathname: string): AppLocale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isAppLocale(firstSegment) ? firstSegment : baseLocale;
}

export function localizePath(
  url: URL,
  locale: AppLocale,
  pathname: string,
  hash = "",
): string {
  const localizedUrl = localizeUrl(new URL(pathname, url), { locale });
  localizedUrl.hash = hash;

  return `${localizedUrl.pathname}${localizedUrl.search}${localizedUrl.hash}`;
}
