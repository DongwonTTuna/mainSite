import type { ProfileFactId } from "#application/profile/types";
import type { ExperienceId } from "#domain/profile/types";
import type { HomeSectionAnchor } from "#infrastructure/routing/anchors";

export type HomeNavigationItem = {
  id: HomeSectionAnchor | "blog";
  label: string;
  href: string;
};

export type HomeNavigation = {
  ariaLabel: string;
  items: HomeNavigationItem[];
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

export type HeroArtworkText = {
  alt: string;
  loadingLabel: string;
  staticLabel: string;
  reducedMotionLabel: string;
  saveDataLabel: string;
  fallbackLabel: string;
  replayLabel: string;
  pauseLabel: string;
  resumeLabel: string;
  replayShortLabel: string;
  pauseShortLabel: string;
  resumeShortLabel: string;
};

export type HeroWelcomeText = {
  headline: string;
  accentLine: string;
  greeting: string;
  greetingEnding: string;
  primaryAction: string;
  secondaryAction: string;
  artwork: HeroArtworkText;
};

export type HomePageViewModel = {
  hero: HeroWelcomeText & {
    eyebrow: string;
    title: string;
    role: string;
    summary: string;
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
};
