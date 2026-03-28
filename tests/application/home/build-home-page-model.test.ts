import { describe, expect, test } from "bun:test";
import { buildHomePageModel } from "../../../src/lib/application/home/build-home-page-model";

describe("buildHomePageModel", () => {
  test("builds the expected navigation and sections for ko locale", () => {
    const model = buildHomePageModel("ko");

    expect(model.hero.title).toBe("이동원");
    expect(model.intro.title).toBe("개요");
    expect(model.navigation.items).toEqual([
      { id: "experience", label: "경력", href: "#experience" },
      { id: "projects", label: "프로젝트", href: "#projects" },
      { id: "skills", label: "기술", href: "#skills" },
    ]);
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
