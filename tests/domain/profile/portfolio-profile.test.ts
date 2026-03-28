import { describe, expect, test } from "bun:test";
import { getProfileDomain } from "../../../src/lib/application/profile/get-profile-domain";
import { getProfileLocalization } from "../../../src/lib/application/profile/get-profile-localization";

describe("portfolioProfile", () => {
  test("keeps localized record ids aligned with the domain model", () => {
    const profile = getProfileDomain();
    const localizations = [
      getProfileLocalization("en"),
      getProfileLocalization("ko"),
      getProfileLocalization("ja"),
    ];

    const experienceIds = profile.experiences
      .map((experience) => experience.id)
      .sort();
    const projectIds = profile.projects.map((project) => project.id).sort();
    const skillCategoryKinds = profile.skillCategories
      .map((category) => category.kind)
      .sort();

    for (const localization of localizations) {
      expect(Object.keys(localization.experienceText).sort()).toEqual(
        experienceIds,
      );
      expect(Object.keys(localization.projectText).sort()).toEqual(projectIds);
      expect(Object.keys(localization.skillCategoryLabels).sort()).toEqual(
        skillCategoryKinds,
      );
    }
  });

  test("keeps employment periods in a valid range", () => {
    const profile = getProfileDomain();

    for (const experience of profile.experiences) {
      const startValue =
        experience.period.start.year * 100 + experience.period.start.month;
      const endValue = experience.period.end
        ? experience.period.end.year * 100 + experience.period.end.month
        : startValue;

      expect(startValue).toBeLessThanOrEqual(endValue);
    }
  });
});
