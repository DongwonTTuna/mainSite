<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";

  let { section }: { section: HomePageViewModel["contact"] } = $props();
</script>

<section class="panel" id={section.id}>
  <div class="section-header">
    <div>
      <p class="section-label">{section.eyebrow}</p>
      <h2>{section.title}</h2>
    </div>
  </div>

  <div class="contact-block">
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
  p {
    margin: 0;
  }

  h2 {
    font-size: 1.15rem;
    line-height: 1.4;
    color: var(--text-strong);
  }

  .contact-block {
    display: grid;
    gap: 1rem;
    align-content: start;
  }

  .contact-block p {
    color: var(--text-body);
    line-height: 1.7;
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
  }
</style>
