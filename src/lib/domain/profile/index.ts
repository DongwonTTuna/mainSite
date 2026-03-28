import { enProfileLocalization } from "#domain/profile/content/en";
import { jaProfileLocalization } from "#domain/profile/content/ja";
import { koProfileLocalization } from "#domain/profile/content/ko";
import type { ProfileLocalization } from "#domain/profile/localization";
import { portfolioProfile } from "#domain/profile/portfolio-profile";

export const profileLocalizationByLocale: Record<
  "en" | "ko" | "ja",
  ProfileLocalization
> = {
  en: enProfileLocalization,
  ko: koProfileLocalization,
  ja: jaProfileLocalization,
};

export { portfolioProfile };

export type {
  LocalizedExperienceText,
  LocalizedProjectText,
  ProfileLocalization,
} from "#domain/profile/localization";
export type {
  AppLanguage,
  ContactChannel,
  ContactChannelKind,
  EmploymentPeriod,
  ExperienceId,
  ExperienceRecord,
  LocationId,
  PortfolioProfile,
  ProfileIdentity,
  ProfileSnapshot,
  ProjectId,
  ProjectRecord,
  SkillCategory,
  SkillCategoryId,
  SkillCategoryKind,
  SkillId,
  YearMonth,
} from "#domain/profile/types";
