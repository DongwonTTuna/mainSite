<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";

  let {
    hero,
    navigation,
  }: {
    hero: HomePageViewModel["hero"];
    navigation: HomePageViewModel["navigation"];
  } = $props();
</script>

<header class="hero">
  <div class="hero-copy">
    <p class="section-label">{hero.eyebrow}</p>
    <h1>{hero.title}</h1>
    <p class="hero-role">{hero.role}</p>
    <p class="hero-summary">{hero.summary}</p>
  </div>

  <nav class="hero-nav" aria-label={navigation.ariaLabel}>
    {#each navigation.items as item (item.id)}
      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
      <a href={item.href}>{item.label}</a>
    {/each}
  </nav>
</header>

<style>
  .hero {
    display: grid;
    gap: 1rem;
    padding: 1.25rem;
    border-bottom: 1px solid var(--surface-border);
  }

  .hero-copy {
    display: grid;
    gap: 0.55rem;
  }

  .section-label,
  .hero-role {
    margin: 0;
    color: var(--text-muted);
  }

  .section-label {
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1,
  .hero-summary {
    margin: 0;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.1;
    color: var(--text-strong);
  }

  .hero-summary {
    color: var(--text-body);
    line-height: 1.7;
  }

  .hero-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding-top: 0.25rem;
  }

  .hero-nav a {
    color: var(--link-color);
    border-bottom: 1px solid var(--link-border);
    padding-bottom: 0.1rem;
    text-decoration: none;
    transition:
      color 120ms ease,
      border-color 120ms ease;
  }

  .hero-nav a:hover,
  .hero-nav a:focus-visible {
    color: var(--text-strong);
    border-color: var(--link-border-active);
    outline: none;
  }

  @media (max-width: 720px) {
    .hero {
      padding: 1rem;
    }
  }
</style>
