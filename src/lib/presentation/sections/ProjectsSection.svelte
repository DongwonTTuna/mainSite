<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";

  let { section }: { section: HomePageViewModel["projects"] } = $props();
</script>

<section class="panel" id={section.id}>
  <div class="section-header">
    <div>
      <p class="section-label">{section.eyebrow}</p>
      <h2>{section.title}</h2>
    </div>
  </div>

  <div class="entry-list">
    {#each section.entries as entry (entry.id)}
      <article class="entry">
        <div class="entry-header">
          <div>
            <h3>{entry.name}</h3>
            <p class="entry-meta">{entry.context}</p>
          </div>
        </div>

        <p class="entry-summary">{entry.summary}</p>
        <p class="entry-outcome">{entry.outcome}</p>
      </article>
    {/each}
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

  .section-label,
  .entry-meta {
    margin: 0;
    color: var(--text-muted);
  }

  .section-label {
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h2,
  h3,
  p {
    margin: 0;
  }

  h2 {
    font-size: 1.15rem;
    line-height: 1.4;
    color: var(--text-strong);
  }

  h3 {
    font-size: 1rem;
    line-height: 1.5;
    color: var(--text-strong);
  }

  .entry-list {
    display: grid;
  }

  .entry {
    display: grid;
    gap: 0.8rem;
    padding: 1rem 0;
    border-top: 1px solid var(--surface-border);
  }

  .entry:first-child {
    padding-top: 0;
    border-top: none;
  }

  .entry:last-child {
    padding-bottom: 0;
  }

  .entry-summary,
  .entry-outcome {
    color: var(--text-body);
    line-height: 1.7;
  }

  @media (max-width: 720px) {
    .panel {
      padding: 1rem;
    }
  }
</style>
