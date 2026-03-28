import { describe, expect, test } from "bun:test";
import { buildLocalizedProfile } from "../../../src/lib/application/profile/build-localized-profile";
import { formatEmploymentPeriod } from "../../../src/lib/application/profile/format-employment-period";
import { getProfileDomain } from "../../../src/lib/application/profile/get-profile-domain";

describe("buildLocalizedProfile", () => {
  test("builds the expected localized profile for ko locale", () => {
    const profile = buildLocalizedProfile("ko");

    expect(profile.name).toBe("이동원");
    expect(profile.role).toBe("풀스택 엔지니어 / Nextbeat");
    expect(profile.facts).toEqual([
      { id: "currentRole", label: "현재", value: "풀스택 엔지니어 / Nextbeat" },
      { id: "location", label: "거주", value: "도쿄 에비스" },
      { id: "languages", label: "언어", value: "한국어, 일본어, 영어" },
      { id: "stack", label: "기술", value: "Typescript, SvelteKit, Nest.js, AWS SAM" },
    ]);
    expect(profile.experiences).toHaveLength(2);
    expect(profile.projects).toHaveLength(4);
    expect(profile.skillGroups).toHaveLength(4);
    expect(profile.contactLinks).toEqual([
      { label: "LinkedIn", href: "https://www.linkedin.com/in/dongwonttuna" },
      { label: "GitHub", href: "https://github.com/dongwonttuna" },
    ]);
  });

  test("formats employment periods per locale", () => {
    const profile = getProfileDomain();
    const [nextbeat, bioden] = profile.experiences;

    expect(formatEmploymentPeriod(nextbeat.period, "en")).toBe(
      "Apr 2024 - Present",
    );
    expect(formatEmploymentPeriod(nextbeat.period, "ko")).toBe(
      "2024.04 - 현재",
    );
    expect(formatEmploymentPeriod(nextbeat.period, "ja")).toBe(
      "2024.04 - 現在",
    );
    expect(formatEmploymentPeriod(bioden.period, "en")).toBe("Jul 2024");
    expect(formatEmploymentPeriod(bioden.period, "ko")).toBe("2024.07");
    expect(formatEmploymentPeriod(bioden.period, "ja")).toBe("2024.07");
  });

  test("localizes contact labels from contact kinds", () => {
    const profile = buildLocalizedProfile("ja");

    expect(profile.contactLinks).toEqual([
      { label: "LinkedIn", href: "https://www.linkedin.com/in/dongwonttuna" },
      { label: "GitHub", href: "https://github.com/dongwonttuna" },
    ]);
  });
});
