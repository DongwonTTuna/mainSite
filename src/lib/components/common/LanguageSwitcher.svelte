<script lang="ts">
  import { page } from '$app/state';
  import {
    getLocale,
    localizeUrl,
    locales
  } from '$lib/paraglide/runtime';

  type Locale = (typeof locales)[number];

  function getLanguageSwitchUrl(lang: Locale, redirectTo = page.url.href) {
    const switcherUrl = localizeUrl(new URL('/locale', page.url.origin), {
      locale: getLocale()
    });

    switcherUrl.searchParams.set('lang', lang);
    switcherUrl.searchParams.set('redirectTo', redirectTo);

    return `${switcherUrl.pathname}${switcherUrl.search}`;
  }

  function handleLanguageChange(event: MouseEvent, lang: Locale) {
    if (lang === getLocale()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    window.location.href = getLanguageSwitchUrl(lang, window.location.href);
  }

  const langLabels: Record<string, string> = {
    en: 'EN',
    ko: 'KO',
    ja: 'JA'
  };
</script>

<div class="lang-switcher">
  {#each locales as lang (lang)}
    <a
      class="lang-btn"
      class:active={lang === getLocale()}
      href={getLanguageSwitchUrl(lang)}
      onclick={(event) => handleLanguageChange(event, lang)}
      aria-label="Change language to {langLabels[lang]}"
      aria-current={lang === getLocale() ? 'page' : undefined}
    >
      {langLabels[lang]}
    </a>
  {/each}
</div>

<style>
  .lang-switcher {
    display: flex;
    gap: 0.35rem;
    padding: 0.35rem;
    border: 1px solid rgba(148, 163, 184, 0.28);
    background: rgba(16, 19, 24, 0.92);
  }

  .lang-btn {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: rgba(226, 232, 240, 0.72);
    padding: 0.25rem 0.5rem;
    font-size: 0.72rem;
    line-height: 1;
    font-family:
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      monospace;
    cursor: pointer;
    text-decoration: none;
  }

  .lang-btn:hover,
  .lang-btn:focus-visible {
    color: #f8fafc;
    outline: none;
  }

  .lang-btn.active {
    color: #f8fafc;
    background: rgba(148, 163, 184, 0.14);
  }
</style>
