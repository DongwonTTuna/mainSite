<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import SectionHeading from "#presentation/components/SectionHeading.svelte";

  let { section }: { section: HomePageViewModel["intro"] } = $props();
</script>

<section class="section-panel overview" id={section.id}>
  <SectionHeading eyebrow={section.eyebrow} title={section.title} icon={section.id} />
  <dl class="facts">
    {#each section.facts as fact (fact.id)}
      <div><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
    {/each}
  </dl>
  <div class="contact-block">
    <p class="eyebrow">{section.note} <span aria-hidden="true">↗</span></p>
    {#each section.links as link (link.href)}
      <a href={link.href} target="_blank" rel="noreferrer noopener">{link.label}<span aria-hidden="true">↗</span></a>
    {/each}
  </div>
</section>

<style>
  .overview { display: grid; grid-template-columns: 0.8fr 2fr 0.8fr; gap: 2.5rem; padding-block: 3.25rem; }
  .facts { display: grid; grid-template-columns: 1fr 1fr; gap: 1.75rem 2.5rem; }
  dt { margin-bottom: 0.45rem; color: var(--text-muted); font-size: 0.73rem; }
  dd { color: var(--text-strong); font-size: 0.91rem; line-height: 1.7; word-break: keep-all; overflow-wrap: anywhere; }
  .contact-block { align-self: start; padding-left: 1.75rem; border-left: 1px solid var(--surface-border); }
  .contact-block > p { display: flex; justify-content: space-between; margin-bottom: 0.7rem; font-size: 0.64rem; color: var(--text-muted); }
  .contact-block > p span { color: var(--accent); }
  .contact-block a { display: flex; justify-content: space-between; gap: 1rem; padding-block: 0.7rem; color: var(--text-strong); font-size: 0.82rem; text-decoration: none; }
  .contact-block a:hover { color: var(--accent); }
  .contact-block a span { color: var(--text-muted); }
  @media (max-width: 1000px) {
    .overview { grid-template-columns: 0.8fr 2fr; gap: 1rem 2rem; }
    .contact-block { grid-column: 2; display: flex; gap: 1.5rem; align-items: center; padding: 0; border: 0; }
    .contact-block > p { margin: 0; }
    .contact-block > p span { display: none; }
  }
  @media (max-width: 660px) {
    .overview { grid-template-columns: 1fr; gap: 0; padding-block: 2.5rem; }
    .facts { gap: 1.5rem 1rem; }
    dd { font-size: 0.85rem; }
    .contact-block { grid-column: auto; margin-top: 1.75rem; padding-top: 0.75rem; border-top: 1px solid var(--surface-border); }
  }
</style>
