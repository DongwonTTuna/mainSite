import type { Handle, RequestEvent } from "@sveltejs/kit";
import {
  baseLocale,
  hasLocalePrefix,
  localeCookieName,
  resolveRequestLocale,
  stripLocalePrefix,
} from "#infrastructure/i18n/locale";

function isDocumentRequest(request: Request) {
  return request.headers.get("sec-fetch-dest") === "document";
}

function getInitialLocaleRedirectResponse(event: RequestEvent) {
  const { request } = event;
  const url = new URL(request.url);

  if (!isDocumentRequest(request) || hasLocalePrefix(url.pathname)) {
    return null;
  }

  const preferredLocale = resolveRequestLocale(
    url.pathname,
    event.cookies.get(localeCookieName),
    request,
  );

  if (preferredLocale === baseLocale) {
    return null;
  }

  const pathname = stripLocalePrefix(url.pathname);
  const redirectUrl = new URL(url);
  redirectUrl.pathname = `/${preferredLocale}${pathname === "/" ? "" : pathname}`;

  const headers: Record<string, string> = {
    Location: redirectUrl.href,
  };

  if (!event.cookies.get(localeCookieName)) {
    headers.Vary = "Accept-Language";
  }

  return new Response(null, {
    status: 307,
    headers,
  });
}

export const handle: Handle = async ({ event, resolve }) => {
  const redirectResponse = getInitialLocaleRedirectResponse(event);

  if (redirectResponse) {
    return redirectResponse;
  }

  event.locals.locale = resolveRequestLocale(
    event.url.pathname,
    event.cookies.get(localeCookieName),
    event.request,
  );

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace("%app.lang%", event.locals.locale),
  });
};
