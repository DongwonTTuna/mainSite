import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  isAppLocale,
  localeCookieMaxAge,
  localeCookieName,
  localizePath,
} from "#infrastructure/i18n/locale";

export const GET: RequestHandler = ({ cookies, request, url }) => {
  const locale = url.searchParams.get("lang");
  const redirectTo = url.searchParams.get("redirectTo") ?? "/";

  if (!locale || !isAppLocale(locale)) {
    throw redirect(303, "/");
  }

  const targetUrl = new URL(redirectTo, request.url);

  cookies.set(localeCookieName, locale, {
    path: "/",
    maxAge: localeCookieMaxAge,
    sameSite: "lax",
    secure: url.protocol === "https:",
  });

  throw redirect(
    303,
    localizePath(targetUrl, locale, targetUrl.pathname, targetUrl.hash),
  );
};
