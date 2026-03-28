export const baseLocale = "en";
export const locales = ["en", "ko", "ja"] as const;
export const localeCookieName = "site_locale";
export const localeCookieMaxAge = 60 * 60 * 24 * 400;

export type AppLocale = (typeof locales)[number];

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function extractLocaleFromHeader(request: Request): AppLocale | null {
  const header = request.headers.get("accept-language");

  if (!header) {
    return null;
  }

  const candidates = header
    .split(",")
    .map((entry) => entry.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const candidate of candidates) {
    const language = candidate?.split("-")[0];

    if (language && isAppLocale(language)) {
      return language;
    }
  }

  return null;
}

export function hasLocalePrefix(pathname: string): boolean {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  return (
    firstSegment !== undefined &&
    isAppLocale(firstSegment) &&
    firstSegment !== baseLocale
  );
}

export function resolveLocaleFromPathname(pathname: string): AppLocale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  return firstSegment !== undefined && isAppLocale(firstSegment)
    ? firstSegment
    : baseLocale;
}

export function stripLocalePrefix(pathname: string): string {
  if (!hasLocalePrefix(pathname)) {
    return pathname;
  }

  const segments = pathname.split("/").filter(Boolean).slice(1);
  return `/${segments.join("/")}`.replace(/\/$/, "") || "/";
}

export function localizePath(
  url: URL,
  locale: AppLocale,
  pathname: string,
  hash = "",
): string {
  const normalizedPathname = stripLocalePrefix(
    pathname.startsWith("/") ? pathname : `/${pathname}`,
  );
  const localizedPathname =
    locale === baseLocale
      ? normalizedPathname
      : `/${locale}${normalizedPathname}`;

  return `${localizedPathname}${url.search}${hash ? `#${hash.replace(/^#/, "")}` : ""}`;
}

export function resolveRequestLocale(
  pathname: string,
  cookieLocale?: string | null,
  request?: Request,
): AppLocale {
  if (hasLocalePrefix(pathname)) {
    return resolveLocaleFromPathname(pathname);
  }

  if (cookieLocale && isAppLocale(cookieLocale)) {
    return cookieLocale;
  }

  if (request) {
    return extractLocaleFromHeader(request) ?? baseLocale;
  }

  return baseLocale;
}
