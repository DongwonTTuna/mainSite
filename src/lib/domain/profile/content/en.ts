import type { ProfileLocalization } from "#domain/profile/localization";

export const enProfileLocalization: ProfileLocalization = {
  identity: {
    displayName: "Dongwon Lee",
    roleTitle: "Full-stack engineer",
    heroSummary:
      "I work across frontend, API, and deployment for web services. Most of my recent work is in Typescript, SvelteKit, Nest.js, and AWS.",
    introNote: "Contact",
    locationName: "Ebisu, Tokyo",
  },
  factLabels: {
    currentRole: "Current",
    location: "Location",
    languages: "Languages",
    stack: "Stack",
  },
  languageLabels: {
    en: "English",
    ko: "Korean",
    ja: "Japanese",
  },
  experienceText: {
    nextbeat: {
      roleTitle: "Full-stack engineer",
      summary:
        "I joined Nextbeat in April 2024. After working on Hoikushibank, I moved to Omotenashi HR.",
    },
    bioden: {
      roleTitle: "Contract full-stack engineer",
      summary: "I built the BiodenKR site as a short contract project.",
    },
  },
  projectText: {
    "aws-sam-migration": {
      summary:
        "Reworked Lambda deployment flows around AWS SAM and shared templates.",
      outcome: "Deployment time dropped by about 30%.",
    },
    "core-web-vitals": {
      summary: "Adjusted SSR, image delivery, and route loading in SvelteKit.",
      outcome:
        "Lighthouse SEO and performance scores improved by more than 10 points.",
    },
    "biodenkr-launch": {
      summary: "Built and localized a corporate site for five languages.",
      outcome:
        "The site was published on Cloudflare Pages for global delivery.",
    },
    "admin-auth-migration": {
      summary:
        "Moved the authentication setup from Azure AD to Amazon Cognito.",
      outcome:
        "Simplified the authentication flow and operations on the AWS side.",
    },
  },
  skillCategoryLabels: {
    application: "Application",
    infrastructure: "Infrastructure",
    delivery: "Delivery",
    "work-style": "Work style",
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
    "ssr-tuning": "SSR tuning",
    "performance-optimization": "Performance",
    localization: "Localization",
    "requirement-discovery": "Requirement discovery",
    "client-communication": "Client communication",
    "release-operations": "Release work",
  },
  contactLabels: {
    linkedin: "LinkedIn",
    github: "GitHub",
  },
};
