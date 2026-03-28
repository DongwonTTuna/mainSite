import type { PortfolioProfile } from "#domain/profile/types";

export const portfolioProfile: PortfolioProfile = {
  identity: {
    id: "dongwon-lee",
  },
  snapshot: {
    currentExperienceId: "nextbeat",
    currentOrganizationName: "Nextbeat",
    locationId: "tokyo-ebisu",
    languages: ["ko", "ja", "en"],
    primarySkillIds: ["typescript", "sveltekit", "nestjs", "aws-sam"],
  },
  experiences: [
    {
      id: "nextbeat",
      companyName: "Nextbeat Inc.",
      period: {
        start: { year: 2024, month: 4 },
        isCurrent: true,
      },
      relatedProjectIds: [
        "aws-sam-migration",
        "core-web-vitals",
        "admin-auth-migration",
      ],
    },
    {
      id: "bioden",
      companyName: "Bioden Corp.",
      period: {
        start: { year: 2024, month: 7 },
        end: { year: 2024, month: 7 },
        isCurrent: false,
      },
      relatedProjectIds: ["biodenkr-launch"],
    },
  ],
  projects: [
    {
      id: "aws-sam-migration",
      name: "AWS SAM migration",
      context: "Nextbeat / Omotenashi HR",
    },
    {
      id: "core-web-vitals",
      name: "Core Web Vitals improvements",
      context: "Nextbeat / Omotenashi HR",
    },
    {
      id: "biodenkr-launch",
      name: "BiodenKR launch",
      context: "Bioden Corp.",
    },
    {
      id: "admin-auth-migration",
      name: "Internal admin tool auth migration",
      context: "Nextbeat / internal admin tool",
    },
  ],
  skillCategories: [
    {
      id: "application",
      kind: "application",
      skillIds: ["typescript", "sveltekit", "nestjs", "nodejs", "svelte"],
    },
    {
      id: "infrastructure",
      kind: "infrastructure",
      skillIds: ["aws-lambda", "aws-sam", "iac", "cicd"],
    },
    {
      id: "delivery",
      kind: "delivery",
      skillIds: ["ssr-tuning", "performance-optimization", "localization"],
    },
    {
      id: "work-style",
      kind: "work-style",
      skillIds: [
        "requirement-discovery",
        "client-communication",
        "release-operations",
      ],
    },
  ],
  contacts: [
    {
      kind: "linkedin",
      href: "https://www.linkedin.com/in/dongwonttuna",
    },
    {
      kind: "github",
      href: "https://github.com/dongwonttuna",
    },
  ],
};
