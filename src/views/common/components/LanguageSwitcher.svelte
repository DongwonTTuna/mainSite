<script lang="ts">
  import { m } from "$lib/i18n"
  import { getLocale, setLocale } from "$lib/i18n/generated/runtime"

  let isOpen = false

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "ja", name: "日本語", flag: "🇯🇵" }
  ] as const

  let currentLocale = getLocale()
  $: currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]

  function handleLanguageChange(locale: "en" | "ko" | "ja") {
    setLocale(locale)
    currentLocale = locale
    isOpen = false
  }

  function toggleDropdown() {
    isOpen = !isOpen
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target.closest(".language-switcher")) {
      isOpen = false
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-switcher">
  <button
    class="language-button"
    on:click={toggleDropdown}
    aria-label={m.aria_language_selector()}
    aria-expanded={isOpen}
  >
    <span class="flag">{currentLanguage.flag}</span>
    <span class="name">{currentLanguage.name}</span>
    <svg class="chevron" class:open={isOpen} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  {#if isOpen}
    <div class="dropdown">
      {#each languages as language (language.code)}
        <button
          class="language-option"
          class:active={language.code === currentLocale}
          on:click={() => handleLanguageChange(language.code)}
        >
          <span class="flag">{language.flag}</span>
          <span class="name">{language.name}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-switcher {
    position: relative;
  }

  .language-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-background-overlay);
    border: 1px solid var(--color-border-accent);
    border-radius: var(--radius-base);
    cursor: pointer;
    transition: all var(--transition-base);
    font-size: var(--font-size-sm);
    backdrop-filter: var(--blur-base);
    color: var(--color-accent-light);
  }

  .language-button:hover {
    background: var(--color-border-accent);
    border-color: var(--color-accent);
    box-shadow: var(--shadow-glow);
    color: var(--color-accent);
  }

  .flag {
    font-size: var(--font-size-lg);
    line-height: 1;
    filter: brightness(1.2);
  }

  .name {
    font-weight: var(--font-weight-semibold);
    color: currentColor;
  }

  .chevron {
    transition: transform var(--transition-fast);
    color: currentColor;
  }

  .chevron.open {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + var(--spacing-xs));
    right: 0;
    min-width: 150px;
    background: var(--color-terminal-bg);
    border: 1px solid var(--color-border-accent);
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-lg), var(--shadow-glow);
    overflow: hidden;
    z-index: var(--z-fixed);
    backdrop-filter: var(--blur-lg);
  }

  .language-option {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    width: 100%;
    padding: var(--spacing-base) var(--spacing-md);
    background: none;
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: var(--font-size-sm);
    text-align: left;
    color: var(--color-accent-light);
  }

  .language-option:hover {
    background: var(--color-border-accent);
    color: var(--color-accent);
  }

  .language-option.active {
    background: var(--color-border-accent);
    color: var(--color-accent);
  }

  .language-option.active .name {
    font-weight: var(--font-weight-semibold);
  }

  @media (max-width: 640px) {
    .language-button {
      padding: var(--spacing-xs) var(--spacing-base);
      font-size: var(--font-size-xs);
    }

    .flag {
      font-size: var(--font-size-base);
    }

    .dropdown {
      min-width: 130px;
    }

    .language-option {
      padding: var(--spacing-sm) var(--spacing-base);
      font-size: var(--font-size-xs);
    }
  }
</style>
