<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import InlineItemIcon from "#presentation/components/InlineItemIcon.svelte";
  import SectionHeading from "#presentation/components/SectionHeading.svelte";

  let { section }: { section: HomePageViewModel["intro"] } = $props();
</script>

<section class="panel" id={section.id}>
  <SectionHeading eyebrow={section.eyebrow} title={section.title} icon={section.id} />

  <div class="section-body intro-grid">
    <dl class="facts">
      {#each section.facts as fact (fact.label)}
        <div class="fact-row">
          <dt>
            <InlineItemIcon name={fact.id} />
            <span>{fact.label}</span>
          </dt>
          <dd>{fact.value}</dd>
        </div>
      {/each}
    </dl>

    <div class="links-block">
      <p class="links-label">{section.note}</p>
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

  .section-body {
    padding-left: 2.1rem;
  }

  p,
  dt,
  dd {
    margin: 0;
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
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    color: var(--text-muted);
  }

  dd {
    color: var(--text-body);
    line-height: 1.7;
  }

  dd {
    padding-left: 1.55rem;
  }

  .links-block {
    display: grid;
    gap: 0.75rem;
    align-content: start;
  }

  .links-label {
    color: var(--text-muted);
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    line-height: 1.4;
    text-transform: uppercase;
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

    .section-body {
      padding-left: 1.2rem;
    }

    dd {
      padding-left: 1.35rem;
    }

    .intro-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
