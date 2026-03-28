import { redirect } from "@sveltejs/kit";
import { getAppLocale } from "#infrastructure/i18n/locale";
import { getLocalizedHomeSectionHref } from "#infrastructure/routing/anchors";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
  throw redirect(
    307,
    getLocalizedHomeSectionHref(url, getAppLocale(), "skills"),
  );
};
