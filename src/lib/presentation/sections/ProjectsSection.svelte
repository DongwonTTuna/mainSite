<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import ProjectArtwork from "#presentation/components/ProjectArtwork.svelte";
  import SectionHeading from "#presentation/components/SectionHeading.svelte";

  let { section }: { section: HomePageViewModel["projects"] } = $props();
</script>

<section class="section-panel" id={section.id}>
  <SectionHeading eyebrow={section.eyebrow} title={section.title} icon={section.id} />
  <div class="project-grid">
    {#each section.entries as entry (entry.id)}
      <article class="project-entry">
        <ProjectArtwork id={entry.id} />
        <div class="project-copy">
          <p class="project-context eyebrow">{entry.context}</p>
          <h3>{entry.name}</h3>
          <p class="project-summary">{entry.summary}</p>
          <p class="project-outcome"><span aria-hidden="true">↗</span>{entry.outcome}</p>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.75rem 2rem; }
  .project-entry { min-width: 0; }
  .project-copy { padding: 1.25rem 0.2rem 0; }
  .project-context { color: var(--text-muted); font-size: 0.59rem; letter-spacing: 0.07em; }
  h3 { margin-top: 0.6rem; color: var(--text-strong); font-size: clamp(1.18rem, 2vw, 1.48rem); line-height: 1.35; letter-spacing: -0.035em; font-weight: 650; text-wrap: balance; }
  .project-summary { margin-top: 0.85rem; font-size: 0.9rem; line-height: 1.8; word-break: keep-all; overflow-wrap: anywhere; }
  .project-outcome { display: flex; align-items: baseline; gap: 0.55rem; margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid var(--surface-border); color: var(--text-strong); font-size: 0.84rem; font-weight: 550; line-height: 1.7; word-break: keep-all; overflow-wrap: anywhere; }
  .project-outcome > span { flex-shrink: 0; color: var(--accent); }
  @media (max-width: 660px) {
    .project-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .project-copy { padding-top: 1rem; }
    h3 { font-size: 1.3rem; }
  }
</style>
