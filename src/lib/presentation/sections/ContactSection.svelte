<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import SectionHeading from "#presentation/components/SectionHeading.svelte";

  let { section }: { section: HomePageViewModel["contact"] } = $props();
</script>

<section class="panel" id={section.id}>
  <SectionHeading eyebrow={section.eyebrow} title={section.title} icon={section.id} />

  <div class="section-body contact-block">
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

  .section-body {
    padding-left: 2.1rem;
  }

  p {
    margin: 0;
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

    .section-body {
      padding-left: 1.2rem;
    }
  }
</style>
