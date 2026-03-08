import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  cookieMaxAge,
  cookieName,
  localizeUrl,
  locales,
} from "$lib/paraglide/runtime";

function isLocale(value: string): value is (typeof locales)[number] {
  return locales.includes(value as (typeof locales)[number]);
}

export const GET: RequestHandler = ({ cookies, request, url }) => {
  const locale = url.searchParams.get("lang");
  const redirectTo = url.searchParams.get("redirectTo") ?? "/";

  if (!locale || !isLocale(locale)) {
    throw redirect(303, "/");
  }

  const redirectUrl = localizeUrl(new URL(redirectTo, request.url), {
    locale,
  });

  cookies.set(cookieName, locale, {
    path: "/",
    maxAge: cookieMaxAge,
    sameSite: "lax",
    secure: url.protocol === "https:",
  });

  throw redirect(
    303,
    `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`,
  );
};
