export type AppLanguage = "en" | "ko" | "ja";

export type YearMonth = {
  year: number;
  month: number;
};

export type EmploymentPeriod = {
  start: YearMonth;
  end?: YearMonth;
  isCurrent: boolean;
};

export type ExperienceId = "nextbeat" | "bioden";

export type ProjectId =
  | "aws-sam-migration"
  | "core-web-vitals"
  | "biodenkr-launch"
  | "admin-auth-migration";

export type SkillCategoryKind =
  | "application"
  | "infrastructure"
  | "delivery"
  | "work-style";

export type SkillCategoryId = SkillCategoryKind;

export type SkillId =
  | "typescript"
  | "sveltekit"
  | "nestjs"
  | "nodejs"
  | "svelte"
  | "aws-lambda"
  | "aws-sam"
  | "iac"
  | "cicd"
  | "ssr-tuning"
  | "performance-optimization"
  | "localization"
  | "requirement-discovery"
  | "client-communication"
  | "release-operations";

export type ContactChannelKind = "linkedin" | "github";

export type LocationId = "tokyo-ebisu";

export type ProfileIdentity = {
  id: "dongwon-lee";
};

export type ProfileSnapshot = {
  currentExperienceId: ExperienceId;
  currentOrganizationName: string;
  locationId: LocationId;
  languages: AppLanguage[];
  primarySkillIds: SkillId[];
};

export type ExperienceRecord = {
  id: ExperienceId;
  companyName: string;
  period: EmploymentPeriod;
  relatedProjectIds: ProjectId[];
};

export type ProjectRecord = {
  id: ProjectId;
  name: string;
  context: string;
};

export type SkillCategory = {
  id: SkillCategoryId;
  kind: SkillCategoryKind;
  skillIds: SkillId[];
};

export type ContactChannel = {
  kind: ContactChannelKind;
  href: string;
};

export type PortfolioProfile = {
  identity: ProfileIdentity;
  snapshot: ProfileSnapshot;
  experiences: ExperienceRecord[];
  projects: ProjectRecord[];
  skillCategories: SkillCategory[];
  contacts: ContactChannel[];
};
