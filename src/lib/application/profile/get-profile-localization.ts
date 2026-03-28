import {
  type ProfileLocalization,
  profileLocalizationByLocale,
} from "#domain/profile/index";
import type { AppLocale } from "#infrastructure/i18n/locale";

export function getProfileLocalization(locale: AppLocale): ProfileLocalization {
  return profileLocalizationByLocale[locale];
}
