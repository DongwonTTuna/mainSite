<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import SectionHeading from "#presentation/components/SectionHeading.svelte";

  let { section }: { section: HomePageViewModel["skills"] } = $props();
</script>

<section class="section-panel skills" id={section.id}>
  <SectionHeading eyebrow={section.eyebrow} title={section.title} icon={section.id} />
  <div class="skill-list">
    {#each section.groups as group (group.id)}
      <div class="skill-row"><h3>{group.label}</h3><ul>{#each group.items as item (item)}<li>{item}</li>{/each}</ul></div>
    {/each}
  </div>
</section>

<style>
  .skills { display: grid; grid-template-columns: 0.8fr 2.8fr; gap: 2.5rem; padding-bottom: 5rem; }
  .skill-list { display: grid; gap: 1.5rem; }
  .skill-row { display: grid; grid-template-columns: 130px 1fr; align-items: baseline; gap: 1rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--surface-border); }
  .skill-row:last-child { border-bottom: 0; padding-bottom: 0; }
  h3 { color: var(--text-body); font-size: 0.8rem; font-weight: 500; }
  ul { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; list-style: none; }
  li { padding: 0.4rem 0.7rem; border: 1px solid var(--surface-border); border-radius: 4px; background: #f1f2eb; color: var(--text-strong); font-size: 0.76rem; line-height: 1.5; }
  @media (max-width: 1000px) { .skill-row { grid-template-columns: 1fr; gap: 0.75rem; } }
  @media (max-width: 760px) { .skills { grid-template-columns: 1fr; gap: 0; padding-bottom: 3rem; } }
</style>
