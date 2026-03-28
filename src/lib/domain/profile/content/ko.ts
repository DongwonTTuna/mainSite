import type { ProfileLocalization } from "#domain/profile/localization";

export const koProfileLocalization: ProfileLocalization = {
  identity: {
    displayName: "이동원",
    roleTitle: "풀스택 엔지니어",
    heroSummary:
      "웹 서비스의 프론트엔드, API, 배포를 함께 다룹니다. 최근에는 Typescript, SvelteKit, Nest.js, AWS를 주로 사용했습니다.",
    introNote: "연락처",
    locationName: "도쿄 에비스",
  },
  factLabels: {
    currentRole: "현재",
    location: "거주",
    languages: "언어",
    stack: "기술",
  },
  languageLabels: {
    en: "영어",
    ko: "한국어",
    ja: "일본어",
  },
  experienceText: {
    nextbeat: {
      roleTitle: "풀스택 엔지니어",
      summary:
        "2024년 4월부터 Nextbeat에서 일하고 있습니다. Hoikushibank를 거쳐 현재 Omotenashi HR 개발에 참여하고 있습니다.",
    },
    bioden: {
      roleTitle: "계약 풀스택 엔지니어",
      summary: "BiodenKR 사이트를 계약 형태로 개발했습니다.",
    },
  },
  projectText: {
    "aws-sam-migration": {
      summary:
        "Lambda 배포 흐름을 AWS SAM과 공용 템플릿 기준으로 다시 정리했습니다.",
      outcome: "배포 시간이 약 30% 줄었습니다.",
    },
    "core-web-vitals": {
      summary: "SvelteKit의 SSR, 이미지 전달, 라우트 로딩 방식을 조정했습니다.",
      outcome: "Lighthouse SEO와 성능 점수가 10점 이상 올라갔습니다.",
    },
    "biodenkr-launch": {
      summary: "기업 사이트를 만들고 5개 언어로 현지화했습니다.",
      outcome: "Cloudflare Pages에 배포해 글로벌 환경에서 제공했습니다.",
    },
    "admin-auth-migration": {
      summary: "Azure AD 기반 인증 구성을 Amazon Cognito 기반으로 옮겼습니다.",
      outcome: "복잡했던 인증 흐름과 운영 구성을 AWS 쪽으로 정리했습니다.",
    },
  },
  skillCategoryLabels: {
    application: "애플리케이션",
    infrastructure: "인프라",
    delivery: "전달 방식",
    "work-style": "업무 방식",
  },
  skillLabels: {
    typescript: "Typescript",
    sveltekit: "SvelteKit",
    nestjs: "Nest.js",
    nodejs: "Node.js",
    svelte: "Svelte",
    "aws-lambda": "AWS Lambda",
    "aws-sam": "AWS SAM",
    iac: "Infrastructure as Code",
    cicd: "CI/CD",
    "ssr-tuning": "SSR 튜닝",
    "performance-optimization": "성능 최적화",
    localization: "다국어화",
    "requirement-discovery": "요구사항 정리",
    "client-communication": "클라이언트 커뮤니케이션",
    "release-operations": "배포 운영",
  },
  contactLabels: {
    linkedin: "LinkedIn",
    github: "GitHub",
  },
};
