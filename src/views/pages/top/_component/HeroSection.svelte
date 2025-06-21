<script lang="ts">
  import { m } from '$lib/i18n'
  import { onMount } from 'svelte'
  import TerminalAnimation from './TerminalAnimation.svelte'

  let heroContent: HTMLDivElement
  let mouseX = 0
  let mouseY = 0

  function handleMouseMove(e: MouseEvent) {
    const rect = heroContent.getBoundingClientRect()
    mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width
    mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroContent) {
      observer.observe(heroContent)
    }

    return () => observer.disconnect()
  })
</script>

<section class="hero-section" role="main" on:mousemove={handleMouseMove}>
  <div class="hero-content" bind:this={heroContent} 
       style="transform: perspective(1000px) rotateY({mouseX * 5}deg) rotateX({-mouseY * 5}deg)">
    <h1 class="hero-title">
      <span class="name">DONGWON LEE</span>
      <span class="role">{m.hero_role()}</span>
    </h1>
    <p class="hero-subtitle">{m.hero_subtitle()}</p>
    <div class="hero-links">
      <a href="https://github.com/DongwonTTuna" target="_blank" rel="noopener noreferrer" class="github-link">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="filter: drop-shadow(0 0 4px currentColor);">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>
    </div>
  </div>
  <div class="hero-visual">
    <TerminalAnimation />
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: var(--spacing-xl);
    background: var(--color-background);
  }

  .hero-content {
    z-index: 1;
    text-align: center;
    max-width: var(--max-width-content);
    animation: fadeInUp 1s ease-out;
    position: relative;
    left: 300px;
  }

  @media (max-width: 768px) {
    .hero-section {
      padding: var(--spacing-base);
    }

    .hero-content {
      left: 0;
      padding: var(--spacing-lg);
      background: var(--color-background-overlay);
      border: 1px solid var(--color-border-accent);
      border-radius: var(--radius-lg);
      backdrop-filter: var(--blur-lg);
      box-shadow: var(--shadow-lg);
    }

    .hero-visual {
      opacity: 0.2;
    }
  }

  .hero-title {
    margin-bottom: var(--spacing-base);
  }

  .name {
    display: block;
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-black);
    letter-spacing: -0.02em;
    background: var(--color-accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--spacing-sm);
    text-shadow: var(--shadow-text);
    animation: glow 3s ease-in-out infinite alternate;
  }

  .role {
    display: block;
    font-size: var(--font-size-hero-sub);
    font-weight: var(--font-weight-light);
    color: var(--color-accent-light);
    text-shadow: var(--shadow-text);
  }

  .hero-subtitle {
    font-size: var(--font-size-xl);
    color: var(--color-accent);
    margin-bottom: var(--spacing-xl);
    opacity: 0.8;
  }

  .hero-links {
    display: flex;
    gap: var(--spacing-base);
    justify-content: center;
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--color-border-accent);
    color: var(--color-accent);
    text-decoration: none;
    border: 1px solid var(--color-border-accent);
    border-radius: var(--radius-base);
    transition: all var(--transition-base);
    backdrop-filter: var(--blur-base);
  }

  .github-link:hover {
    transform: translateY(-2px);
    background: var(--color-accent);
    border-color: var(--color-accent);
    box-shadow: var(--shadow-lg), var(--shadow-glow);
    color: var(--color-text-on-accent);
  }

  .hero-visual {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glow {
    from {
      filter: brightness(1) drop-shadow(0 0 20px rgba(102, 136, 255, 0.5));
    }
    to {
      filter: brightness(1.1) drop-shadow(0 0 30px rgba(0, 212, 255, 0.7));
    }
  }
</style>