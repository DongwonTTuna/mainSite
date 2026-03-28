import { redirect } from "@sveltejs/kit";
import { getLocalizedHomeSectionHref } from "#infrastructure/routing/anchors";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url, locals }) => {
  throw redirect(
    307,
    getLocalizedHomeSectionHref(url, locals.locale, "experience"),
  );
};
