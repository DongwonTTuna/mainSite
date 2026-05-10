import { error, redirect } from "@sveltejs/kit";
import { getBlogArticleBySlug } from "#domain/blog/articles";
import { createPageMeta } from "#infrastructure/meta/head";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals, params }) => {
  if (locals.locale !== "ko") {
    throw redirect(307, `/ko/blog/${params.slug}`);
  }

  const article = getBlogArticleBySlug(params.slug);

  if (!article) {
    throw error(404, "Article not found");
  }

  return {
    article,
    meta: createPageMeta({
      title: `${article.title} | 이동원`,
    }),
  };
};
