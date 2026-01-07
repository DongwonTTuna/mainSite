<script lang="ts">
  import { locales, getLocale, setLocale } from '$lib/paraglide/runtime';
  import { base } from '$app/paths';
  import { page } from '$app/state';

  function handleLanguageChange(lang: string) {
    if (lang === getLocale()) return;
    
    // In Paraglide-js with URL strategy, we typically redirect to the new locale path
    // For now, let's use setLocale and see if it works with the current setup
    // If using 'url' strategy, we might need a more complex transition
    const currentPath = page.url.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    
    let newPath = '';
    const isFirstSegmentLocale = (locales as readonly string[]).includes(segments[0]);
    
    if (isFirstSegmentLocale) {
      segments[0] = lang;
      newPath = '/' + segments.join('/');
    } else {
      newPath = '/' + lang + currentPath;
    }
    
    // Add base path if necessary
    window.location.href = base + newPath;
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
        gap: 0.5rem;
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 999px;
        backdrop-filter: blur(8px);
    }

    .lang-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        padding: 0.25rem 0.65rem;
        font-size: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        border-radius: 999px;
        transition: all 0.2s ease;
    }

    .lang-btn:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
    }

    .lang-btn.active {
        color: #000000;
        background: #ffffff;
    }
</style>
