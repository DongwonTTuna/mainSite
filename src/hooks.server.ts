import type { Handle, RequestEvent } from "@sveltejs/kit";
import {
  baseLocale,
  cookieName,
  extractLocaleFromHeader,
  localizeUrl,
  locales,
} from "$lib/paraglide/runtime";
import { paraglideMiddleware } from "$lib/paraglide/server";

const localizedSegments = locales.filter((locale) => locale !== baseLocale);

function isDocumentRequest(request: Request) {
  return request.headers.get("Sec-Fetch-Dest") === "document";
}

function hasExplicitLocalePrefix(url: URL) {
  const firstSegment = url.pathname.split("/").filter(Boolean)[0];
  return localizedSegments.some((locale) => locale === firstSegment);
}

function getInitialLocaleRedirectResponse(event: RequestEvent) {
  const { request } = event;
  const url = new URL(request.url);

  if (!isDocumentRequest(request) || hasExplicitLocalePrefix(url)) {
    return null;
  }

  const cookieLocale = event.cookies.get(cookieName);
  const preferredLocale =
    cookieLocale ?? extractLocaleFromHeader(request) ?? baseLocale;

  if (preferredLocale === baseLocale) {
    return null;
  }

  const redirectUrl = localizeUrl(url, { locale: preferredLocale });

  if (redirectUrl.href === url.href) {
    return null;
  }

  const headers: Record<string, string> = {
    Location: redirectUrl.href,
  };

  if (!cookieLocale) {
    headers.Vary = "Accept-Language";
  }

  return new Response(null, {
    status: 307,
    headers,
  });
}

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace("%paraglide.lang%", locale),
    });
  });

export const handle: Handle = async ({ event, resolve }) => {
  const redirectResponse = getInitialLocaleRedirectResponse(event);

  if (redirectResponse) {
    return redirectResponse;
  }

  return handleParaglide({ event, resolve });
};
