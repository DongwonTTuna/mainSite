import { enProfileContent } from "#domain/profile/content/en";
import { jaProfileContent } from "#domain/profile/content/ja";
import { koProfileContent } from "#domain/profile/content/ko";
import type { ProfileContent } from "#domain/profile/types";

export const profileContentByLocale: Record<
  "en" | "ko" | "ja",
  ProfileContent
> = {
  en: enProfileContent,
  ko: koProfileContent,
  ja: jaProfileContent,
};

export type {
  ContactLink,
  ExperienceEntry,
  ProfileContent,
  ProfileFact,
  ProjectEntry,
  SkillGroup,
} from "#domain/profile/types";
