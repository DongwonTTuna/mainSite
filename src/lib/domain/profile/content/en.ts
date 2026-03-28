import type { ProfileContent } from "#domain/profile/types";

export const enProfileContent: ProfileContent = {
  name: "Dongwon Lee",
  role: "Full-stack engineer / Nextbeat",
  heroSummary:
    "I work across frontend, API, and deployment for web services. Most of my recent work is in Typescript, SvelteKit, Nest.js, and AWS.",
  introNote: "Recent work and links are below.",
  contactNote:
    "If the work fits, LinkedIn is the easiest way to reach me. GitHub has recent code and project history.",
  facts: [
    { label: "Current", value: "Full-stack engineer / Nextbeat" },
    { label: "Location", value: "Ebisu, Tokyo" },
    { label: "Languages", value: "Korean, Japanese, English" },
    { label: "Stack", value: "Typescript, SvelteKit, Nest.js, AWS" },
  ],
  experiences: [
    {
      company: "Nextbeat Inc.",
      role: "Full-stack engineer",
      period: "Apr 2024 - Present",
      summary:
        "I joined Nextbeat in April 2024. After working on Hoikushibank, I moved to Omotenashi HR.",
      bullets: [
        "Moved Lambda deployments from Serverless Framework to AWS SAM and reduced deployment time by about 30%.",
        "Improved Lighthouse SEO and Core Web Vitals with SSR and asset delivery changes.",
        "Migrated the internal admin tool's authentication setup from Azure AD to Amazon Cognito.",
      ],
    },
    {
      company: "Bioden Corp.",
      role: "Contract full-stack engineer",
      period: "Jul 2024",
      summary: "I built the BiodenKR site as a short contract project.",
      bullets: [
        "Built the site in SvelteKit with a content-friendly static SSR setup.",
        "Shipped five-language support without duplicating layouts.",
        "Deployed it on Cloudflare Pages with automated publishing.",
      ],
    },
  ],
  projects: [
    {
      name: "AWS SAM migration",
      context: "Nextbeat / Omotenashi HR",
      summary:
        "Reworked Lambda deployment flows around AWS SAM and shared templates.",
      outcome: "Deployment time dropped by about 30%.",
    },
    {
      name: "Core Web Vitals improvements",
      context: "Nextbeat / Omotenashi HR",
      summary: "Adjusted SSR, image delivery, and route loading in SvelteKit.",
      outcome:
        "Lighthouse SEO and performance scores improved by more than 10 points.",
    },
    {
      name: "BiodenKR launch",
      context: "Bioden Corp.",
      summary: "Built and localized a corporate site for five languages.",
      outcome:
        "The site was published on Cloudflare Pages for global delivery.",
    },
    {
      name: "Internal admin tool auth migration",
      context: "Nextbeat / internal admin tool",
      summary:
        "Moved the authentication setup from Azure AD to Amazon Cognito.",
      outcome:
        "Simplified the authentication flow and operations on the AWS side.",
    },
  ],
  skillGroups: [
    {
      label: "Application",
      items: ["Typescript", "SvelteKit", "Nest.js", "Node.js", "Svelte"],
    },
    {
      label: "Infrastructure",
      items: ["AWS Lambda", "AWS SAM", "Infrastructure as Code", "CI/CD"],
    },
    {
      label: "Delivery",
      items: ["SSR tuning", "Performance", "Localization"],
    },
    {
      label: "Work style",
      items: ["Requirement discovery", "Client communication", "Release work"],
    },
  ],
  contactLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dongwonttuna" },
    { label: "GitHub", href: "https://github.com/dongwonttuna" },
  ],
};
