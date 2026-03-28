import { stripLocalePrefix } from "#infrastructure/i18n/locale";

export const reroute = ({ url }: { url: URL }) =>
  stripLocalePrefix(url.pathname);
