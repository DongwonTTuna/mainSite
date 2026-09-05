<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import SectionHeading from "#presentation/components/SectionHeading.svelte";

  let { section }: { section: HomePageViewModel["experience"] } = $props();
</script>

<section class="section-panel experience" id={section.id}>
  <SectionHeading eyebrow={section.eyebrow} title={section.title} icon={section.id} />
  <div class="experience-list">
    {#each section.entries as entry (entry.id)}
      <article class="experience-entry">
        <div class="entry-heading"><h3>{entry.company}</h3><p class="entry-period">{entry.periodLabel}</p></div>
        <p class="entry-role">{entry.role}</p>
        <p class="entry-summary">{entry.summary}</p>
      </article>
    {/each}
  </div>
</section>

<style>
  .experience { display: grid; grid-template-columns: 0.8fr 2.8fr; gap: 2.5rem; }
  .experience-list { border-left: 1px solid var(--surface-border); }
  .experience-entry { position: relative; padding: 0.2rem 0 2.5rem 2rem; }
  .experience-entry:last-child { padding-bottom: 0.2rem; }
  .experience-entry::before { content: ""; position: absolute; top: 0.7rem; left: -5px; width: 9px; height: 9px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 6px var(--page-background); }
  .experience-entry:last-child::before { background: #9baea8; }
  .entry-heading { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
  h3 { color: var(--text-strong); font-size: 1.2rem; font-weight: 650; letter-spacing: -0.03em; }
  .entry-period { color: var(--text-muted); font: 400 0.68rem/1.5 var(--font-mono); }
  .entry-role { margin-top: 0.5rem; color: var(--accent); font-size: 0.78rem; }
  .entry-summary { max-width: 650px; margin-top: 1rem; line-height: 1.85; font-size: 0.92rem; word-break: keep-all; overflow-wrap: anywhere; }
  @media (max-width: 760px) {
    .experience { grid-template-columns: 1fr; gap: 0; }
    .experience-list { margin-left: 5px; }
    .experience-entry { padding-left: 1.4rem; }
    .entry-heading { flex-direction: column; gap: 0.4rem; }
  }
</style>
