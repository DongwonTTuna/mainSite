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
        title: "안정성은 왜 때로 변화를 막는가",
        language: "ko",
        publishedAt: "2026-05-10",
        author: "이동원",
      },
    ]);
  });

  test("finds the article by slug", () => {
    const article = getBlogArticleBySlug("japan-korea-dev-culture-lean");

    expect(article?.title).toBe("안정성은 왜 때로 변화를 막는가");
    expect(article?.blocks[0]).toEqual({
      type: "heading",
      level: 2,
      text: "일본에서 3년간 소프트웨어 엔지니어로 일하며 느낀 한국과 일본 개발 문화의 차이",
    });
    expect(article?.blocks[1]).toEqual({
      type: "paragraph",
      text: "일본에서 3년간 소프트웨어 엔지니어로 일하면서 가장 크게 느낀 차이는 기술력 자체가 아니었다. 사용하는 언어, 프레임워크, 개발 도구는 생각보다 크게 다르지 않았다. 오히려 가장 큰 차이는 **일을 시작하는 방식**에 있었다.",
    });
  });

  test("uses the final v3 article body", () => {
    const article = getBlogArticleBySlug("japan-korea-dev-culture-lean");
    const finalBlock = article?.blocks[article.blocks.length - 1];

    expect(article?.blocks).toContainEqual({
      type: "paragraph",
      text: "이런 분위기가 평가 지표와 결합하면 문제는 더 커진다.",
    });
    expect(article?.blocks).toContainEqual({
      type: "paragraph",
      text: "최근 AI 도입에서도 비슷한 장면을 직접 경험했다.",
    });
    expect(article?.blocks).toContainEqual({
      type: "paragraph",
      text: "그런데도 레거시는 쉽게 사라지지 않는다. 이유는 간단하다. **레거시를 바꾸는 리스크는 눈에 잘 보이지만, 레거시를 유지하는 비용은 잘 보이지 않기 때문이다.**",
    });
    expect(finalBlock).toEqual({
      type: "paragraph",
      text: "앞으로의 개발 조직에 필요한 것은 품질을 낮추는 일이 아니다. 품질을 이유로 모든 변화를 막는 것이 아니라, 품질을 지키기 위해서라도 더 작게 시도하고 더 빠르게 회복할 수 있는 구조를 만드는 것이다. 안정성은 변화하지 않기 위한 명분이 아니라, 더 안전하게 변화하기 위한 조건이어야 한다.",
    });
  });

  test("returns null for an unknown slug", () => {
    expect(getBlogArticleBySlug("unknown")).toBeNull();
  });
});
