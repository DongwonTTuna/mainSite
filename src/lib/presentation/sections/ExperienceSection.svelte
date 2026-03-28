<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import InlineItemIcon from "#presentation/components/InlineItemIcon.svelte";
  import SectionHeading from "#presentation/components/SectionHeading.svelte";

  let { section }: { section: HomePageViewModel["experience"] } = $props();
</script>

<section class="panel" id={section.id}>
  <SectionHeading eyebrow={section.eyebrow} title={section.title} icon={section.id} />

  <div class="section-body entry-list">
    {#each section.entries as entry (entry.id)}
      <article class="entry">
        <div class="entry-header">
          <div>
            <h3>{entry.role}</h3>
            <p class="entry-meta">
              <InlineItemIcon name={entry.id} />
              <span>{entry.company}</span>
            </p>
          </div>
          <p class="entry-period">{entry.periodLabel}</p>
        </div>

        <p class="entry-summary">{entry.summary}</p>
      </article>
    {/each}
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

  .entry-meta,
  .entry-period {
    margin: 0;
    color: var(--text-muted);
  }

  h3,
  p {
    margin: 0;
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

  .entry-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: baseline;
  }

  .entry-summary {
    color: var(--text-body);
    line-height: 1.7;
  }

  .entry-summary {
    margin-left: 1.5rem;
  }

  .entry-meta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 720px) {
    .panel {
      padding: 1rem;
    }

    .section-body {
      padding-left: 1.2rem;
    }

    .entry-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .entry-summary {
      margin-left: 1.3rem;
    }
  }
</style>
