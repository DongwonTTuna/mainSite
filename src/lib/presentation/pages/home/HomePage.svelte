<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import { getHomeSectionText } from "#infrastructure/i18n/home-section-text";
  import type { AppLocale } from "#infrastructure/i18n/locale";
  import TunaMark from "#presentation/components/TunaMark.svelte";
  import ExperienceSection from "#presentation/sections/ExperienceSection.svelte";
  import HeroSection from "#presentation/sections/HeroSection.svelte";
  import HighlightsSection from "#presentation/sections/HighlightsSection.svelte";
  import ProjectsSection from "#presentation/sections/ProjectsSection.svelte";
  import SkillsSection from "#presentation/sections/SkillsSection.svelte";

  let { model, locale }: { model: HomePageViewModel; locale: AppLocale } = $props();
  let text = $derived(getHomeSectionText(locale));
</script>

<main id="main-content" class="content-width" tabindex="-1">
  <HeroSection hero={model.hero} />
  <HighlightsSection section={model.intro} />
  <ProjectsSection section={model.projects} />
  <ExperienceSection section={model.experience} />
  <SkillsSection section={model.skills} />
</main>
<footer class="site-footer">
  <div class="content-width footer-inner">
    <div class="footer-signature">
      <span class="footer-mark"><TunaMark /></span>
      <div><p>{text.footerLine}</p><span class="eyebrow">DONGWONTTUNA / {model.hero.title}</span></div>
    </div>
    <div class="footer-links">
      {#each model.intro.links as link (link.href)}
        <a href={link.href} target="_blank" rel="noreferrer noopener">{link.label} <span aria-hidden="true">↗</span></a>
      {/each}
    </div>
  </div>
</footer>

<style>
  main:focus { outline: none; }
  .site-footer { padding-block: 2.5rem; border-top: 1px solid var(--surface-border); background: #eeeee7; }
  .footer-inner, .footer-signature, .footer-links { display: flex; align-items: center; gap: 1.25rem; }
  .footer-inner { justify-content: space-between; }
  .footer-mark { width: 46px; color: var(--accent); }
  .footer-signature p { margin-bottom: 0.45rem; font-weight: 600; color: var(--text-strong); }
  .footer-signature .eyebrow { color: var(--text-muted); font-size: 0.58rem; }
  .footer-links a { padding-block: 0.75rem; color: var(--text-body); font-size: 0.8rem; text-decoration: none; }
  .footer-links a:hover, .footer-links span { color: var(--accent); }
  @media (max-width: 660px) {
    .footer-inner { align-items: flex-start; flex-direction: column; gap: 1rem; }
    .footer-signature p { font-size: 0.95rem; }
  }
</style>
