import {
  profileContentByLocale,
  type ProfileContent,
} from "#domain/profile/index";
import type { AppLocale } from "#infrastructure/i18n/locale";

export function getProfileContent(locale: AppLocale): ProfileContent {
  return profileContentByLocale[locale];
}
