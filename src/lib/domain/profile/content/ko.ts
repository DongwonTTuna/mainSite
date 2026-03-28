import type { ProfileContent } from "#domain/profile/types";

export const koProfileContent: ProfileContent = {
  name: "이동원",
  role: "풀스택 엔지니어 / Nextbeat",
  heroSummary:
    "웹 서비스의 프론트엔드, API, 배포를 함께 다룹니다. 최근에는 Typescript, SvelteKit, Nest.js, AWS를 주로 사용했습니다.",
  introNote: "최근 작업과 링크를 아래에 정리했습니다.",
  contactNote:
    "일이 맞는 경우 LinkedIn으로 연락 주시면 됩니다. GitHub에는 최근 코드와 작업 이력이 있습니다.",
  facts: [
    { label: "현재", value: "풀스택 엔지니어 / Nextbeat" },
    { label: "거주", value: "도쿄 에비스" },
    { label: "언어", value: "한국어, 일본어, 영어" },
    { label: "기술", value: "Typescript, SvelteKit, Nest.js, AWS" },
  ],
  experiences: [
    {
      company: "Nextbeat Inc.",
      role: "풀스택 엔지니어",
      period: "2024.04 - 현재",
      summary:
        "2024년 4월부터 Nextbeat에서 일하고 있습니다. Hoikushibank를 거쳐 현재 Omotenashi HR 개발에 참여하고 있습니다.",
      bullets: [
        "Lambda 배포를 Serverless Framework에서 AWS SAM으로 옮겨 배포 시간을 약 30% 줄였습니다.",
        "SSR과 정적 자산 구성을 조정해 Lighthouse SEO와 Core Web Vitals를 개선했습니다.",
        "사내 관리툴의 인증 구성을 Azure AD에서 Amazon Cognito 기반으로 마이그레이션했습니다.",
      ],
    },
    {
      company: "Bioden Corp.",
      role: "계약 풀스택 엔지니어",
      period: "2024.07",
      summary: "BiodenKR 사이트를 계약 형태로 개발했습니다.",
      bullets: [
        "SvelteKit 기반으로 사이트를 만들고 정적 SSR 구성을 잡았습니다.",
        "레이아웃 중복 없이 5개 언어를 적용했습니다.",
        "Cloudflare Pages에 배포하고 게시 흐름을 자동화했습니다.",
      ],
    },
  ],
  projects: [
    {
      name: "AWS SAM 전환",
      context: "Nextbeat / Omotenashi HR",
      summary:
        "Lambda 배포 흐름을 AWS SAM과 공용 템플릿 기준으로 다시 정리했습니다.",
      outcome: "배포 시간이 약 30% 줄었습니다.",
    },
    {
      name: "Core Web Vitals 개선",
      context: "Nextbeat / Omotenashi HR",
      summary: "SvelteKit의 SSR, 이미지 전달, 라우트 로딩 방식을 조정했습니다.",
      outcome: "Lighthouse SEO와 성능 점수가 10점 이상 올라갔습니다.",
    },
    {
      name: "BiodenKR 런칭",
      context: "Bioden Corp.",
      summary: "기업 사이트를 만들고 5개 언어로 현지화했습니다.",
      outcome: "Cloudflare Pages에 배포해 글로벌 환경에서 제공했습니다.",
    },
    {
      name: "사내 관리툴 인증기반 마이그레이션",
      context: "Nextbeat / 사내 관리툴",
      summary: "Azure AD 기반 인증 구성을 Amazon Cognito 기반으로 옮겼습니다.",
      outcome: "복잡했던 인증 흐름과 운영 구성을 AWS 쪽으로 정리했습니다.",
    },
  ],
  skillGroups: [
    {
      label: "애플리케이션",
      items: ["Typescript", "SvelteKit", "Nest.js", "Node.js", "Svelte"],
    },
    {
      label: "인프라",
      items: ["AWS Lambda", "AWS SAM", "Infrastructure as Code", "CI/CD"],
    },
    {
      label: "전달 방식",
      items: ["SSR 튜닝", "성능 최적화", "다국어화"],
    },
    {
      label: "업무 방식",
      items: ["요구사항 정리", "클라이언트 커뮤니케이션", "배포 운영"],
    },
  ],
  contactLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dongwonttuna" },
    { label: "GitHub", href: "https://github.com/dongwonttuna" },
  ],
};
