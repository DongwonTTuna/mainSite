<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";

  let { section }: { section: HomePageViewModel["intro"] } = $props();
</script>

<section class="panel" id={section.id}>
  <div class="section-header">
    <div>
      <p class="section-label">{section.eyebrow}</p>
      <h2>{section.title}</h2>
    </div>
  </div>

  <div class="intro-grid">
    <dl class="facts">
      {#each section.facts as fact (fact.label)}
        <div class="fact-row">
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      {/each}
    </dl>

    <div class="links-block">
      <p>{section.note}</p>
      <div class="link-row">
        {#each section.links as link (link.href)}
          <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
          <a href={link.href} target="_blank" rel="noreferrer noopener">
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .panel {
    padding: 1.25rem;
    border-top: 1px solid var(--surface-border);
  }

  .section-header {
    margin-bottom: 1rem;
  }

  .section-label {
    margin: 0;
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  h2,
  p,
  dt,
  dd {
    margin: 0;
  }

  h2 {
    font-size: 1.15rem;
    line-height: 1.4;
    color: var(--text-strong);
  }

  .intro-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(240px, 0.8fr);
    gap: 1.25rem;
  }

  .facts {
    display: grid;
    gap: 0.75rem;
  }

  .fact-row {
    display: grid;
    gap: 0.2rem;
  }

  dt {
    color: var(--text-muted);
  }

  dd,
  .links-block p {
    color: var(--text-body);
    line-height: 1.7;
  }

  .links-block {
    display: grid;
    gap: 1rem;
    align-content: start;
  }

  .link-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
  }

  .link-row a {
    color: var(--link-color);
    border-bottom: 1px solid var(--link-border);
    padding-bottom: 0.1rem;
    text-decoration: none;
    transition:
      color 120ms ease,
      border-color 120ms ease;
  }

  .link-row a:hover,
  .link-row a:focus-visible {
    color: var(--text-strong);
    border-color: var(--link-border-active);
    outline: none;
  }

  @media (max-width: 720px) {
    .panel {
      padding: 1rem;
    }

    .intro-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
