import type {
  AppLanguage,
  ContactChannelKind,
  ExperienceId,
  ProjectId,
  SkillCategoryKind,
  SkillId,
} from "#domain/profile/types";

export type LocalizedExperienceText = {
  roleTitle: string;
  summary: string;
};

export type LocalizedProjectText = {
  summary: string;
  outcome: string;
};

export type ProfileLocalization = {
  identity: {
    displayName: string;
    roleTitle: string;
    heroSummary: string;
    introNote: string;
    locationName: string;
  };
  factLabels: {
    currentRole: string;
    location: string;
    languages: string;
    stack: string;
  };
  languageLabels: Record<AppLanguage, string>;
  experienceText: Record<ExperienceId, LocalizedExperienceText>;
  projectText: Record<ProjectId, LocalizedProjectText>;
  skillCategoryLabels: Record<SkillCategoryKind, string>;
  skillLabels: Record<SkillId, string>;
  contactLabels: Record<ContactChannelKind, string>;
};
