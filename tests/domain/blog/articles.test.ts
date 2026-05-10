import { describe, expect, test } from "bun:test";
import {
  getBlogArticleBySlug,
  listBlogIndexItems,
} from "../../../src/lib/domain/blog/articles";

describe("blog articles", () => {
  test("lists the japan korea development culture article", () => {
    expect(listBlogIndexItems()).toEqual([
      {
        slug: "japan-korea-dev-culture-lean",
        title:
          "일본에서 3년간 소프트웨어 엔지니어로 일하며 느낀 개발 문화의 차이",
        language: "ko",
        publishedAt: "2026-05-10",
        author: "이동원",
      },
    ]);
  });

  test("finds the article by slug", () => {
    const article = getBlogArticleBySlug("japan-korea-dev-culture-lean");

    expect(article?.title).toBe(
      "일본에서 3년간 소프트웨어 엔지니어로 일하며 느낀 개발 문화의 차이",
    );
    expect(article?.blocks[0]).toEqual({
      type: "paragraph",
      text: "일본에서 3년간 소프트웨어 엔지니어로 일하면서 가장 크게 느낀 차이는 기술력 자체가 아니었다. 사용하는 언어도 비슷하고, 프레임워크도 비슷하고, 개발 도구도 크게 다르지 않았다. 진짜 차이는 **문제를 발견했을 때 어디까지 스스로 움직일 수 있는가**에 있었다.",
    });
  });

  test("returns null for an unknown slug", () => {
    expect(getBlogArticleBySlug("unknown")).toBeNull();
  });
});
