<script lang="ts">
  import { page } from "$app/state";
  import { type AppLocale, locales } from "#infrastructure/i18n/locale";

  let { locale: currentLocale }: { locale: AppLocale } = $props();

  function getLanguageSwitchUrl(locale: AppLocale, redirectTo = page.url.href) {
    const query = new URLSearchParams({
      lang: locale,
      redirectTo,
    });

    return `/locale?${query.toString()}`;
  }

  function handleLanguageChange(locale: AppLocale) {
    if (locale === currentLocale) {
      return;
    }

    window.location.href = getLanguageSwitchUrl(locale, window.location.href);
  }

  const localeLabels: Record<AppLocale, string> = {
    en: "EN",
    ko: "KO",
    ja: "JA",
  };
</script>

<div class="lang-switcher">
  {#each locales as locale (locale)}
    <button
      type="button"
      class="lang-button"
      class:active={locale === currentLocale}
      onclick={() => handleLanguageChange(locale)}
      aria-label={`Change language to ${localeLabels[locale]}`}
      aria-pressed={locale === currentLocale}
    >
      {localeLabels[locale]}
    </button>
  {/each}
</div>

<style>
  .lang-switcher {
    display: flex;
    gap: 0.35rem;
    padding: 0.35rem;
    border: 1px solid color-mix(in srgb, var(--surface-border) 88%, white 12%);
    background: color-mix(in srgb, var(--surface-elevated) 92%, transparent);
    backdrop-filter: blur(12px);
  }

  .lang-button {
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    color: var(--text-muted);
    padding: 0.25rem 0.5rem;
    font-size: 0.72rem;
    line-height: 1;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    transition:
      color 120ms ease,
      background-color 120ms ease;
  }

  .lang-button:hover,
  .lang-button:focus-visible {
    color: var(--text-strong);
    outline: none;
  }

  .lang-button.active {
    color: var(--text-strong);
    background: color-mix(in srgb, var(--surface-border) 26%, transparent);
  }
</style>
