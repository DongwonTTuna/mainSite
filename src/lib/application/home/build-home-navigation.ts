import type { HomeNavigation } from "#application/home/types";
import { getHomeSectionText } from "#infrastructure/i18n/home-section-text";
import type { AppLocale } from "#infrastructure/i18n/locale";
import { getHomeSectionHref } from "#infrastructure/routing/anchors";

export function buildHomeNavigation(locale: AppLocale): HomeNavigation {
  const text = getHomeSectionText(locale);
  return {
    ariaLabel: text.navAriaLabel,
    items: [
      {
        id: "experience",
        label: text.nav.experience,
        href: getHomeSectionHref("experience"),
      },
      {
        id: "projects",
        label: text.nav.projects,
        href: getHomeSectionHref("projects"),
      },
      {
        id: "skills",
        label: text.nav.skills,
        href: getHomeSectionHref("skills"),
      },
      { id: "blog", label: text.nav.blog, href: "/ko/blog" },
    ],
  };
}
