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

  test("uses the final v2 article body", () => {
    const article = getBlogArticleBySlug("japan-korea-dev-culture-lean");
    const finalBlock = article?.blocks[article.blocks.length - 1];

    expect(article?.blocks).toContainEqual({
      type: "paragraph",
      text: "실패 비용을 키우는 것은 문화만이 아니다. 평가 지표도 영향을 준다. 품질, 비용, 납기, 안전을 관리하자는 취지 자체는 당연히 중요하다. 하지만 그것이 “인시던트 0건”처럼 절대적인 목표로 운영되기 시작하면 사람들의 행동은 달라진다.",
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
