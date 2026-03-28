import type { AppLocale } from "#infrastructure/i18n/locale";

export type HomeSectionText = {
  metaTitle: string;
  navAriaLabel: string;
  heroEyebrow: string;
  introEyebrow: string;
  experienceEyebrow: string;
  experienceTitle: string;
  projectsEyebrow: string;
  projectsTitle: string;
  skillsEyebrow: string;
  skillsTitle: string;
  contactEyebrow: string;
  contactTitle: string;
  nav: {
    experience: string;
    projects: string;
    skills: string;
  };
};

const homeSectionTextByLocale: Record<AppLocale, HomeSectionText> = {
  en: {
    metaTitle: "Dongwon Lee",
    navAriaLabel: "Sections",
    heroEyebrow: "Intro",
    introEyebrow: "Intro",
    experienceEyebrow: "Experience",
    experienceTitle: "Recent work",
    projectsEyebrow: "Projects",
    projectsTitle: "Selected work",
    skillsEyebrow: "Skills",
    skillsTitle: "Working stack",
    contactEyebrow: "Contact",
    contactTitle: "Links",
    nav: {
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
    },
  },
  ko: {
    metaTitle: "이동원",
    navAriaLabel: "섹션",
    heroEyebrow: "소개",
    introEyebrow: "소개",
    experienceEyebrow: "경력",
    experienceTitle: "최근 일한 내용",
    projectsEyebrow: "프로젝트",
    projectsTitle: "최근 작업",
    skillsEyebrow: "기술",
    skillsTitle: "주로 쓰는 구성",
    contactEyebrow: "연락",
    contactTitle: "링크",
    nav: {
      experience: "경력",
      projects: "프로젝트",
      skills: "기술",
    },
  },
  ja: {
    metaTitle: "李東原",
    navAriaLabel: "セクション",
    heroEyebrow: "紹介",
    introEyebrow: "紹介",
    experienceEyebrow: "経験",
    experienceTitle: "最近の仕事",
    projectsEyebrow: "プロジェクト",
    projectsTitle: "最近の作業",
    skillsEyebrow: "技術",
    skillsTitle: "主に使う構成",
    contactEyebrow: "連絡",
    contactTitle: "リンク",
    nav: {
      experience: "経験",
      projects: "プロジェクト",
      skills: "技術",
    },
  },
};

export function getHomeSectionText(locale: AppLocale): HomeSectionText {
  return homeSectionTextByLocale[locale];
}
