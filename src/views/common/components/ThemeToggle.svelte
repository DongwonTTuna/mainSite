<script lang="ts">
  import { onMount } from 'svelte'

  let theme: 'light' | 'dark' = 'dark'

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light'
    updateTheme()
  }

  function updateTheme() {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }

  onMount(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      theme = savedTheme
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme = prefersDark ? 'dark' : 'light'
    }
    updateTheme()
  })
</script>

<button
  class="theme-toggle"
  on:click={toggleTheme}
  aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
>
  {#if theme === 'light'}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {:else}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    background: var(--color-surface);
    color: var(--color-text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-base);
    transition: all var(--transition-base);
    z-index: var(--z-fixed);
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
  }

  .theme-toggle:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform var(--transition-base);
  }

  .theme-toggle:hover svg {
    transform: rotate(180deg);
  }

  @media (max-width: 768px) {
    .theme-toggle {
      top: var(--spacing-base);
      right: var(--spacing-base);
      width: 40px;
      height: 40px;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
</style>