import type { HomePageViewModel } from "#application/home/types";
import { getProfileContent } from "#application/profile/get-profile-content";
import type { AppLocale } from "#infrastructure/i18n/locale";
import { getUiCopy } from "#infrastructure/i18n/ui-copy";
import { getHomeSectionHref } from "#infrastructure/routing/anchors";

export function buildHomePageModel(locale: AppLocale): HomePageViewModel {
  const profile = getProfileContent(locale);
  const ui = getUiCopy(locale);

  return {
    hero: {
      eyebrow: ui.heroEyebrow,
      title: profile.name,
      role: profile.role,
      summary: profile.heroSummary,
    },
    navigation: {
      ariaLabel: ui.navAriaLabel,
      items: [
        {
          id: "experience",
          label: ui.nav.experience,
          href: getHomeSectionHref("experience"),
        },
        {
          id: "projects",
          label: ui.nav.projects,
          href: getHomeSectionHref("projects"),
        },
        {
          id: "skills",
          label: ui.nav.skills,
          href: getHomeSectionHref("skills"),
        },
      ],
    },
    intro: {
      id: "intro",
      eyebrow: ui.introEyebrow,
      title: profile.name,
      facts: profile.facts,
      note: profile.introNote,
      links: profile.contactLinks,
    },
    experience: {
      id: "experience",
      eyebrow: ui.experienceEyebrow,
      title: ui.experienceTitle,
      entries: profile.experiences,
    },
    projects: {
      id: "projects",
      eyebrow: ui.projectsEyebrow,
      title: ui.projectsTitle,
      entries: profile.projects,
    },
    skills: {
      id: "skills",
      eyebrow: ui.skillsEyebrow,
      title: ui.skillsTitle,
      groups: profile.skillGroups,
    },
    contact: {
      id: "contact",
      eyebrow: ui.contactEyebrow,
      title: ui.contactTitle,
      note: profile.contactNote,
      links: profile.contactLinks,
    },
  };
}
