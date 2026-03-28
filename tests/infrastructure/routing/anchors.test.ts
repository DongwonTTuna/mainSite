import { describe, expect, test } from "bun:test";
import { getLocalizedHomeSectionHref } from "../../../src/lib/infrastructure/routing/anchors";

describe("getLocalizedHomeSectionHref", () => {
  test("builds a localized base-locale anchor URL", () => {
    const href = getLocalizedHomeSectionHref(
      new URL("https://example.com/work"),
      "en",
      "projects",
    );

    expect(href).toBe("/#projects");
  });

  test("builds a localized non-base-locale anchor URL", () => {
    const href = getLocalizedHomeSectionHref(
      new URL("https://example.com/work"),
      "ko",
      "experience",
    );

    expect(href).toBe("/ko/#experience");
  });
});
