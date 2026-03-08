<script lang="ts">
  import { locales, getLocale } from '$lib/paraglide/runtime';
  import { base } from '$app/paths';
  import { page } from '$app/state';

  function handleLanguageChange(lang: string) {
    if (lang === getLocale()) return;

    const currentPath = page.url.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    const isFirstSegmentLocale = (locales as readonly string[]).includes(segments[0]);

    const newPath = isFirstSegmentLocale
      ? '/' + [lang, ...segments.slice(1)].join('/')
      : '/' + lang + currentPath;

    window.location.href = base + newPath + page.url.search + page.url.hash;
  }

  const langLabels: Record<string, string> = {
    en: 'EN',
    ko: 'KO',
    ja: 'JA'
  };
</script>

<div class="lang-switcher">
  {#each locales as lang (lang)}
    <button
      class="lang-btn"
      class:active={lang === getLocale()}
      onclick={() => handleLanguageChange(lang)}
      aria-label="Change language to {langLabels[lang]}"
    >
      {langLabels[lang]}
    </button>
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
    border: none;
    background: transparent;
    color: rgba(226, 232, 240, 0.72);
    padding: 0.25rem 0.5rem;
    font-size: 0.72rem;
    font-family:
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      monospace;
    cursor: pointer;
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
