import { formatEmploymentPeriod } from "#application/profile/format-employment-period";
import { getProfileDomain } from "#application/profile/get-profile-domain";
import { getProfileLocalization } from "#application/profile/get-profile-localization";
import type { LocalizedProfile } from "#application/profile/types";
import type { AppLocale } from "#infrastructure/i18n/locale";

export function buildLocalizedProfile(locale: AppLocale): LocalizedProfile {
  const profile = getProfileDomain();
  const localization = getProfileLocalization(locale);
  const currentExperience = profile.experiences.find(
    (experience) => experience.id === profile.snapshot.currentExperienceId,
  );

  if (!currentExperience) {
    throw new Error(
      `Missing current experience '${profile.snapshot.currentExperienceId}' in portfolioProfile`,
    );
  }

  return {
    name: localization.identity.displayName,
    role: `${localization.identity.roleTitle} / ${profile.snapshot.currentOrganizationName}`,
    heroSummary: localization.identity.heroSummary,
    introNote: localization.identity.introNote,
    contactNote: localization.identity.contactNote,
    facts: [
      {
        id: "currentRole",
        label: localization.factLabels.currentRole,
        value: `${localization.identity.roleTitle} / ${profile.snapshot.currentOrganizationName}`,
      },
      {
        id: "location",
        label: localization.factLabels.location,
        value: localization.identity.locationName,
      },
      {
        id: "languages",
        label: localization.factLabels.languages,
        value: profile.snapshot.languages
          .map((language) => localization.languageLabels[language])
          .join(", "),
      },
      {
        id: "stack",
        label: localization.factLabels.stack,
        value: profile.snapshot.primarySkillIds
          .map((skillId) => localization.skillLabels[skillId])
          .join(", "),
      },
    ],
    experiences: profile.experiences.map((experience) => ({
      id: experience.id,
      company: experience.companyName,
      role: localization.experienceText[experience.id].roleTitle,
      periodLabel: formatEmploymentPeriod(experience.period, locale),
      summary: localization.experienceText[experience.id].summary,
    })),
    projects: profile.projects.map((project) => ({
      id: project.id,
      name: project.name,
      context: project.context,
      summary: localization.projectText[project.id].summary,
      outcome: localization.projectText[project.id].outcome,
    })),
    skillGroups: profile.skillCategories.map((category) => ({
      id: category.id,
      label: localization.skillCategoryLabels[category.kind],
      items: category.skillIds.map(
        (skillId) => localization.skillLabels[skillId],
      ),
    })),
    contactLinks: profile.contacts.map((contact) => ({
      label: localization.contactLabels[contact.kind],
      href: contact.href,
    })),
  };
}
