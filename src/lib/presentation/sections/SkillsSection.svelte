<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";

  let { section }: { section: HomePageViewModel["skills"] } = $props();
</script>

<section class="panel" id={section.id}>
  <div class="section-header">
    <div>
      <p class="section-label">{section.eyebrow}</p>
      <h2>{section.title}</h2>
    </div>
  </div>

  <div class="skill-list">
    {#each section.groups as group (group.id)}
      <div class="skill-row">
        <p class="skill-label">{group.label}</p>
        <p class="skill-values">{group.items.join(", ")}</p>
      </div>
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
  .skill-label {
    margin: 0;
    color: var(--text-muted);
  }

  .section-label {
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
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

  .skill-list {
    display: grid;
    gap: 0.9rem;
  }

  .skill-row {
    display: grid;
    gap: 0.25rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--surface-border);
  }

  .skill-row:first-child {
    padding-top: 0;
    border-top: none;
  }

  .skill-values {
    color: var(--text-body);
    line-height: 1.7;
  }

  @media (max-width: 720px) {
    .panel {
      padding: 1rem;
    }
  }
</style>
