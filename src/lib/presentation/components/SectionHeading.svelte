<script lang="ts">
  import type { HomeSectionAnchor } from "#infrastructure/routing/anchors";

  let { eyebrow, title, icon }: { eyebrow: string; title: string; icon: HomeSectionAnchor } = $props();
  const sectionNumbers = { intro: "01", projects: "02", experience: "03", skills: "04", contact: "05" } as const;
</script>

<div class="section-heading">
  <p class="eyebrow"><span aria-hidden="true">{sectionNumbers[icon]} /</span> {eyebrow}</p>
  <h2>{title}</h2>
</div>

<style>
  .section-heading { margin-bottom: 2.25rem; }
  .eyebrow { color: var(--text-muted); font-size: 0.64rem; }
  .eyebrow span { margin-right: 0.5rem; color: var(--accent); }
  h2 { margin-top: 0.65rem; color: var(--text-strong); font-size: clamp(1.65rem, 3vw, 2.2rem); font-weight: 680; letter-spacing: -0.05em; line-height: 1.35; word-break: keep-all; }
  @media (max-width: 760px) { .section-heading { margin-bottom: 1.75rem; } }
</style>
