import type { HomePageViewModel } from "#application/home/types";
import { buildLocalizedProfile } from "#application/profile/build-localized-profile";
import { getHomeSectionText } from "#infrastructure/i18n/home-section-text";
import type { AppLocale } from "#infrastructure/i18n/locale";
import { getHomeSectionHref } from "#infrastructure/routing/anchors";

export function buildHomePageModel(locale: AppLocale): HomePageViewModel {
  const profile = buildLocalizedProfile(locale);
  const ui = getHomeSectionText(locale);

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
      title: ui.introTitle,
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
  };
}
