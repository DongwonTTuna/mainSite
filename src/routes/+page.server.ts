import { buildHomeMeta } from "#application/home/build-home-meta";
import { buildHomePageModel } from "#application/home/build-home-page-model";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
  return {
    locale: locals.locale,
    model: buildHomePageModel(locals.locale),
    meta: buildHomeMeta(locals.locale),
  };
};
