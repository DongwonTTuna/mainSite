import type { ProfileFactId } from "#application/profile/types";
import type { ExperienceId } from "#domain/profile/types";
import type { HomeSectionAnchor } from "#infrastructure/routing/anchors";

export type HomeNavigationItem = {
  id: HomeSectionAnchor;
  label: string;
  href: `#${string}`;
};

export type HomeFactRow = {
  id: ProfileFactId;
  label: string;
  value: string;
};

export type HomeContactLink = {
  label: string;
  href: string;
};

export type HomeExperienceEntry = {
  id: ExperienceId;
  company: string;
  role: string;
  periodLabel: string;
  summary: string;
};

export type HomeProjectEntry = {
  id: string;
  name: string;
  context: string;
  summary: string;
  outcome: string;
};

export type HomeSkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export type HomePageViewModel = {
  hero: {
    eyebrow: string;
    title: string;
    role: string;
    summary: string;
  };
  navigation: {
    ariaLabel: string;
    items: HomeNavigationItem[];
  };
  intro: {
    id: "intro";
    eyebrow: string;
    title: string;
    facts: HomeFactRow[];
    note: string;
    links: HomeContactLink[];
  };
  experience: {
    id: "experience";
    eyebrow: string;
    title: string;
    entries: HomeExperienceEntry[];
  };
  projects: {
    id: "projects";
    eyebrow: string;
    title: string;
    entries: HomeProjectEntry[];
  };
  skills: {
    id: "skills";
    eyebrow: string;
    title: string;
    groups: HomeSkillGroup[];
  };
  contact: {
    id: "contact";
    eyebrow: string;
    title: string;
    note: string;
    links: HomeContactLink[];
  };
};
