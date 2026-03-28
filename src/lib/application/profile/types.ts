import type { ExperienceId } from "#domain/profile/types";

export type ProfileFactId = "currentRole" | "location" | "languages" | "stack";

export type LocalizedFactRow = {
  id: ProfileFactId;
  label: string;
  value: string;
};

export type LocalizedContactLink = {
  label: string;
  href: string;
};

export type LocalizedExperience = {
  id: ExperienceId;
  company: string;
  role: string;
  periodLabel: string;
  summary: string;
};

export type LocalizedProject = {
  id: string;
  name: string;
  context: string;
  summary: string;
  outcome: string;
};

export type LocalizedSkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export type LocalizedProfile = {
  name: string;
  role: string;
  heroSummary: string;
  introNote: string;
  facts: LocalizedFactRow[];
  experiences: LocalizedExperience[];
  projects: LocalizedProject[];
  skillGroups: LocalizedSkillGroup[];
  contactLinks: LocalizedContactLink[];
};
