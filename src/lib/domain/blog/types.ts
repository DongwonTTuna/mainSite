import type { AppLocale } from "#infrastructure/i18n/locale";

export type BlogArticleHeadingBlock = {
  type: "heading";
  level: 2;
  text: string;
};

export type BlogArticleParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type BlogArticleBlock =
  | BlogArticleHeadingBlock
  | BlogArticleParagraphBlock;

export type BlogArticle = {
  slug: string;
  title: string;
  language: Extract<AppLocale, "ko">;
  publishedAt: string;
  author: string;
  blocks: BlogArticleBlock[];
};

export type BlogIndexItem = Omit<BlogArticle, "blocks">;
