import type { SpeakConfig } from 'qwik-speak';

export const languages = [
  { lang: 'en', currency: 'USD', timeZone: 'America/Los_Angeles' },
  { lang: 'ko', currency: 'KRW', timeZone: 'Asia/Seoul' },
  { lang: 'ja', currency: 'JPY', timeZone: 'Asia/Tokyo' }
];

export const defaultLang = 'en';

export const config: SpeakConfig = {
  defaultLocale: languages[0],
  supportedLocales: languages,
  // Translations will be loaded from these assets
  assets: [
    'app', // General app translations
  ],
  // Runtime translations (can be loaded dynamically)
  runtimeAssets: []
};