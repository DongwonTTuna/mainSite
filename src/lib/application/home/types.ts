import type {
  ContactLink,
  ExperienceEntry,
  ProfileFact,
  ProjectEntry,
  SkillGroup,
} from "#domain/profile/index";
import type { HomeSectionAnchor } from "#infrastructure/routing/anchors";

export type HomeNavigationItem = {
  id: HomeSectionAnchor;
  label: string;
  href: `#${string}`;
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
    facts: ProfileFact[];
    note: string;
    links: ContactLink[];
  };
  experience: {
    id: "experience";
    eyebrow: string;
    title: string;
    entries: ExperienceEntry[];
  };
  projects: {
    id: "projects";
    eyebrow: string;
    title: string;
    entries: ProjectEntry[];
  };
  skills: {
    id: "skills";
    eyebrow: string;
    title: string;
    groups: SkillGroup[];
  };
  contact: {
    id: "contact";
    eyebrow: string;
    title: string;
    note: string;
    links: ContactLink[];
  };
};
