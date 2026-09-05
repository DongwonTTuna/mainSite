<script lang="ts">
  import { type AppLocale, locales } from "#infrastructure/i18n/locale";
  import { page } from "$app/state";

  let { locale: currentLocale }: { locale: AppLocale } = $props();
  function getLanguageSwitchUrl(locale: AppLocale) {
    const query = new URLSearchParams({ lang: locale, redirectTo: page.url.href });
    return `/locale?${query.toString()}`;
  }
  const localeLabels = { en: "EN", ko: "KO", ja: "JA" } as const;
</script>

<nav class="lang-switcher" aria-label="Language">
  {#each locales as locale (locale)}
    <a href={getLanguageSwitchUrl(locale)} class:active={locale === currentLocale}
      aria-label={`Change language to ${localeLabels[locale]}`}
      aria-current={locale === currentLocale ? "true" : undefined} data-sveltekit-reload
    >{localeLabels[locale]}</a>
  {/each}
</nav>

<style>
  .lang-switcher { display: flex; align-items: center; padding-left: 1.5rem; border-left: 1px solid var(--surface-border); }
  a { display: grid; place-items: center; width: 35px; min-height: 44px; font: 500 0.66rem var(--font-mono); color: var(--text-muted); text-decoration: none; }
  a:hover, a.active { color: var(--accent); }
  a.active { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 6px; }
  @media (max-width: 660px) {
    .lang-switcher { padding-left: 0.5rem; }
    a { width: 31px; }
  }
</style>
