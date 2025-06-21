<script lang="ts">
  import { m } from '$lib/i18n'
  import { getLocale, setLocale } from '$lib/i18n/generated/runtime'
  
  let isOpen = false
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ] as const
  
  $: currentLocale = getLocale()
  $: currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]
  
  function handleLanguageChange(locale: 'en' | 'ko' | 'ja') {
    setLocale(locale)
    isOpen = false
  }
  
  function toggleDropdown() {
    isOpen = !isOpen
  }
  
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target.closest('.language-switcher')) {
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
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  
  {#if isOpen}
    <div class="dropdown">
      {#each languages as language}
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
    gap: 8px;
    padding: 8px 12px;
    background: var(--bg-secondary, #f5f5f5);
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
  }
  
  .language-button:hover {
    background: var(--bg-hover, #ebebeb);
    border-color: var(--border-hover, #d0d0d0);
  }
  
  .flag {
    font-size: 18px;
    line-height: 1;
  }
  
  .name {
    font-weight: 500;
    color: var(--text-primary, #333);
  }
  
  .chevron {
    transition: transform 0.2s ease;
  }
  
  .chevron.open {
    transform: rotate(180deg);
  }
  
  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    min-width: 150px;
    background: var(--bg-primary, #fff);
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 1000;
  }
  
  .language-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 10px 12px;
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 14px;
    text-align: left;
  }
  
  .language-option:hover {
    background: var(--bg-hover, #f5f5f5);
  }
  
  .language-option.active {
    background: var(--bg-active, #e8f0ff);
    color: var(--text-active, #1976d2);
  }
  
  .language-option.active .name {
    font-weight: 600;
  }
  
  @media (max-width: 640px) {
    .language-button {
      padding: 6px 10px;
      font-size: 13px;
    }
    
    .flag {
      font-size: 16px;
    }
    
    .dropdown {
      min-width: 130px;
    }
    
    .language-option {
      padding: 8px 10px;
      font-size: 13px;
    }
  }
</style>