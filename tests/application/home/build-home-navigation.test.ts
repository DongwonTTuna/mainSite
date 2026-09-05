import { describe, expect, test } from "bun:test";
import { buildHomeNavigation } from "../../../src/lib/application/home/build-home-navigation";

describe("buildHomeNavigation", () => {
  test("provides the Korean header navigation independently of the home page", () => {
    expect(buildHomeNavigation("ko")).toEqual({
      ariaLabel: "섹션",
      items: [
        { id: "experience", label: "경력", href: "#experience" },
        { id: "projects", label: "프로젝트", href: "#projects" },
        { id: "skills", label: "기술", href: "#skills" },
        { id: "blog", label: "블로그", href: "/ko/blog" },
      ],
    });
  });

  test("localizes the header while keeping the blog in its authored language", () => {
    const english = buildHomeNavigation("en");
    const japanese = buildHomeNavigation("ja");
    expect(english.ariaLabel).toBe("Sections");
    expect(japanese.ariaLabel).toBe("セクション");
    expect(english.items.at(-1)).toEqual({
      id: "blog",
      label: "Blog",
      href: "/ko/blog",
    });
    expect(japanese.items.at(-1)).toEqual({
      id: "blog",
      label: "ブログ",
      href: "/ko/blog",
    });
  });
});
