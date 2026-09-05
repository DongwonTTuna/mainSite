import { describe, expect, test } from "bun:test";
import { buildHomePageModel } from "../../../src/lib/application/home/build-home-page-model";

describe("buildHomePageModel", () => {
  test("provides Korean welcome copy and accessible artwork controls", () => {
    const model = buildHomePageModel("ko");

    expect(model.hero.headline).toBe("기술에 깊이를,");
    expect(model.hero.accentLine).toBe("경험에 색을.");
    expect(model.hero.primaryAction).toBe("프로젝트 살펴보기");
    expect(model.hero.artwork.pauseLabel).toBe("움직임 멈추기");
    expect(model.hero.artwork.replayLabel).toBe("물감 효과 다시 보기");
    expect(model.hero.artwork.replayShortLabel).toBe("다시 보기");
    expect(model.hero.greetingEnding).toBe("입니다.");
  });

  test("localizes the welcome and static fallback in English and Japanese", () => {
    const english = buildHomePageModel("en");
    const japanese = buildHomePageModel("ja");

    expect(english.hero.headline).toBe("Depth in code.");
    expect(english.hero.artwork.fallbackLabel).toBe(
      "3D unavailable · original render",
    );
    expect(japanese.hero.headline).toBe("技術に深みを、");
    expect(japanese.hero.artwork.reducedMotionLabel).toBe(
      "動きを抑える設定 · 静止画",
    );
  });

  test("builds the expected sections for ko locale", () => {
    const model = buildHomePageModel("ko");

    expect(model.hero.title).toBe("이동원");
    expect(model.intro.title).toBe("개요");
    expect(model.experience.entries).toHaveLength(2);
    expect(model.projects.entries).toHaveLength(4);
    expect(model.skills.groups).toHaveLength(4);
    expect(model.intro.links).toHaveLength(2);
  });

  test("keeps the same information shape across locales", () => {
    const locales = ["en", "ko", "ja"] as const;
    const counts = locales.map((locale) => {
      const model = buildHomePageModel(locale);

      return {
        facts: model.intro.facts.length,
        experiences: model.experience.entries.length,
        projects: model.projects.entries.length,
        skills: model.skills.groups.length,
        links: model.intro.links.length,
      };
    });

    expect(new Set(counts.map((value) => JSON.stringify(value))).size).toBe(1);
  });
});
