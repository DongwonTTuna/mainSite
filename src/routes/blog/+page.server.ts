import { redirect } from "@sveltejs/kit";
import { listBlogIndexItems } from "#domain/blog/articles";
import { createPageMeta } from "#infrastructure/meta/head";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
  if (locals.locale !== "ko") {
    throw redirect(307, "/ko/blog");
  }

  return {
    articles: listBlogIndexItems(),
    meta: createPageMeta({
      title: "Blog | 이동원",
    }),
  };
};
