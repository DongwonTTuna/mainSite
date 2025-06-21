<script lang="ts">
  import LanguageSwitcher from "../components/LanguageSwitcher.svelte"
  import { onMount } from 'svelte'

  export let isMobile: boolean
  
  let stars: Array<{x: number, y: number, size: number, speed: number}> = []
  
  onMount(() => {
    // Create background stars
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1
      })
    }
  })
</script>

<main class="main__container">
  <div class="stars-bg">
    {#each stars as star}
      <div 
        class="star" 
        style="left: {star.x}%; top: {star.y}%; width: {star.size}px; height: {star.size}px; animation-duration: {20 / star.speed}s"
      ></div>
    {/each}
  </div>
  <header class="main__header">
    <LanguageSwitcher />
  </header>
  <div class="main__content" class:mobile={isMobile}>
    <slot />
  </div>
</main>

<style>
  .main__container {
    overflow: hidden;
    position: relative;
    background: var(--color-background);
    min-height: 100vh;
  }

  .stars-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-background);
    pointer-events: none;
  }

  .star {
    position: absolute;
    background: var(--color-text-primary);
    border-radius: var(--radius-full);
    animation: twinkle linear infinite;
    opacity: 0;
  }

  @keyframes twinkle {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-100vh);
    }
  }

  .main__header {
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: var(--z-fixed);
    backdrop-filter: var(--blur-base);
    background: var(--color-background-overlay);
    padding: var(--spacing-sm);
    border-radius: var(--radius-base);
    border: 1px solid var(--color-border-accent);
  }

  .main__content {
    position: relative;
    z-index: var(--z-content);
  }

  :global(body) {
    background: var(--color-background);
    color: var(--color-text-primary);
    margin: 0;
    padding: 0;
  }
</style>
