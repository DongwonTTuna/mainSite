import { createPageMeta } from "#infrastructure/meta/head";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  return {
    meta: createPageMeta({
      title: "Privacy Policy — gws CLI | Dongwon Lee",
      description:
        "Privacy policy for the personal gws CLI Google OAuth client.",
    }),
  };
};
