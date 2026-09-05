import type { HeroWelcomeText } from "#application/home/types";
import type { AppLocale } from "#infrastructure/i18n/locale";

export type HomeSectionText = {
  metaTitle: string;
  navAriaLabel: string;
  heroEyebrow: string;
  welcome: HeroWelcomeText;
  skipLabel: string;
  footerLine: string;
  introEyebrow: string;
  introTitle: string;
  experienceEyebrow: string;
  experienceTitle: string;
  projectsEyebrow: string;
  projectsTitle: string;
  skillsEyebrow: string;
  skillsTitle: string;
  nav: {
    experience: string;
    projects: string;
    skills: string;
    blog: string;
  };
};

const homeSectionTextByLocale: Record<AppLocale, HomeSectionText> = {
  en: {
    metaTitle: "Dongwon Lee",
    navAriaLabel: "Sections",
    heroEyebrow: "Intro",
    skipLabel: "Skip to content",
    footerLine: "Always moving toward the next wave.",
    welcome: {
      headline: "Depth in code.",
      accentLine: "A splash of color.",
      greeting: "Hello, I'm",
      greetingEnding: ".",
      primaryAction: "Explore my work",
      secondaryAction: "A little about me",
      artwork: {
        alt: "A sculpted 3D tuna with a navy back, golden body and vermilion fins, inspired by the DongwonTTuna illustration.",
        loadingLabel: "Preparing a little splash…",
        staticLabel: "The original Blender render",
        reducedMotionLabel: "Reduced motion · still artwork",
        saveDataLabel: "Data saver · still artwork",
        fallbackLabel: "3D unavailable · original render",
        replayLabel: "Replay the paint splash",
        replayShortLabel: "Replay",
        pauseShortLabel: "Pause",
        resumeShortLabel: "Resume",
        pauseLabel: "Pause motion",
        resumeLabel: "Resume motion",
      },
    },
    introEyebrow: "Intro",
    introTitle: "Overview",
    experienceEyebrow: "Experience",
    experienceTitle: "Recent work",
    projectsEyebrow: "Projects",
    projectsTitle: "Selected work",
    skillsEyebrow: "Skills",
    skillsTitle: "Working stack",
    nav: {
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      blog: "Blog",
    },
  },
  ko: {
    metaTitle: "이동원",
    navAriaLabel: "섹션",
    heroEyebrow: "소개",
    skipLabel: "본문으로 건너뛰기",
    footerLine: "늘 다음 물결을 향해.",
    welcome: {
      headline: "기술에 깊이를,",
      accentLine: "경험에 색을.",
      greeting: "안녕하세요,",
      greetingEnding: "입니다.",
      primaryAction: "프로젝트 살펴보기",
      secondaryAction: "조금 더 알아보기",
      artwork: {
        alt: "DongwonTTuna 그림을 바탕으로 만든 입체 참치. 짙은 남색 등, 황금빛 몸통과 붉은 지느러미가 물감 위로 떠 있습니다.",
        loadingLabel: "작은 물결을 준비하는 중…",
        staticLabel: "Blender로 만든 참치의 렌더 이미지",
        reducedMotionLabel: "모션 감소 설정 · 정적 이미지",
        saveDataLabel: "데이터 절약 모드 · 정적 이미지",
        fallbackLabel: "3D 대신 원본 렌더 이미지를 표시합니다",
        replayLabel: "물감 효과 다시 보기",
        replayShortLabel: "다시 보기",
        pauseShortLabel: "멈추기",
        resumeShortLabel: "재생하기",
        pauseLabel: "움직임 멈추기",
        resumeLabel: "움직임 재생하기",
      },
    },
    introEyebrow: "소개",
    introTitle: "개요",
    experienceEyebrow: "경력",
    experienceTitle: "최근 일한 내용",
    projectsEyebrow: "프로젝트",
    projectsTitle: "최근 작업",
    skillsEyebrow: "기술",
    skillsTitle: "주로 쓰는 구성",
    nav: {
      experience: "경력",
      projects: "프로젝트",
      skills: "기술",
      blog: "블로그",
    },
  },
  ja: {
    metaTitle: "李東原",
    navAriaLabel: "セクション",
    heroEyebrow: "紹介",
    skipLabel: "本文へスキップ",
    footerLine: "いつも、次の波へ。",
    welcome: {
      headline: "技術に深みを、",
      accentLine: "体験に彩りを。",
      greeting: "こんにちは、",
      greetingEnding: "です。",
      primaryAction: "プロジェクトを見る",
      secondaryAction: "プロフィールへ",
      artwork: {
        alt: "DongwonTTunaのイラストをもとに制作した立体的なマグロ。紺色の背、黄金色の体、朱色のひれが絵の具の上に浮かびます。",
        loadingLabel: "小さな波を準備しています…",
        staticLabel: "Blenderで制作したオリジナルのレンダー",
        reducedMotionLabel: "動きを抑える設定 · 静止画",
        saveDataLabel: "データセーバー · 静止画",
        fallbackLabel: "3Dの代わりにレンダー画像を表示しています",
        replayLabel: "絵の具のエフェクトをもう一度",
        replayShortLabel: "もう一度",
        pauseShortLabel: "止める",
        resumeShortLabel: "再生する",
        pauseLabel: "動きを止める",
        resumeLabel: "動きを再生する",
      },
    },
    introEyebrow: "紹介",
    introTitle: "概要",
    experienceEyebrow: "経験",
    experienceTitle: "最近の仕事",
    projectsEyebrow: "プロジェクト",
    projectsTitle: "最近の作業",
    skillsEyebrow: "技術",
    skillsTitle: "主に使う構成",
    nav: {
      experience: "経験",
      projects: "プロジェクト",
      skills: "技術",
      blog: "ブログ",
    },
  },
};

export function getHomeSectionText(locale: AppLocale): HomeSectionText {
  return homeSectionTextByLocale[locale];
}
