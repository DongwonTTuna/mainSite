import { deLocalizeUrl } from "#infrastructure/i18n/paraglide";

export const reroute = (request) => deLocalizeUrl(request.url).pathname;
