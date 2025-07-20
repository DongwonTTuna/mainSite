import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { useSpeak } from 'qwik-speak';
import { config } from '~/lib/i18n/speak-config';
import { translationFn } from '~/lib/i18n/speak-functions';

/**
 * Route loader to initialize translations for this layout
 */
export const useTranslations = routeLoader$(async ({ params, locale }) => {
  const lang = params.lang || config.defaultLocale.lang;
  
  // Load translations for the current language
  await locale(lang);
  
  return {
    lang,
    translations: await translationFn.loadTranslation$(lang, 'app')
  };
});

import { Navigation } from '~/components/ui/Navigation';

export default component$(() => {
  // Use useSpeak to provide translations to child components
  useSpeak({ assets: ['app'] });
  
  return (
    <>
      <Navigation />
      <Slot />
    </>
  );
});