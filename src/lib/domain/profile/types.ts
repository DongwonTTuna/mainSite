export type ProfileFact = {
  label: string;
  value: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
};

export type ProjectEntry = {
  name: string;
  context: string;
  summary: string;
  outcome: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  href: string;
};

export type ProfileContent = {
  name: string;
  role: string;
  heroSummary: string;
  introNote: string;
  contactNote: string;
  facts: ProfileFact[];
  experiences: ExperienceEntry[];
  projects: ProjectEntry[];
  skillGroups: SkillGroup[];
  contactLinks: ContactLink[];
};
