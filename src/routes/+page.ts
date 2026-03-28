import { buildHomeMeta } from "#application/home/build-home-meta";
import { buildHomePageModel } from "#application/home/build-home-page-model";
import { getAppLocale } from "#infrastructure/i18n/locale";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  const locale = getAppLocale();

  return {
    model: buildHomePageModel(locale),
    meta: buildHomeMeta(locale),
  };
};
