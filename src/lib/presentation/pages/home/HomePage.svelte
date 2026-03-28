<script lang="ts">
  import type { HomePageViewModel } from "#application/home/types";
  import HeroSection from "#presentation/sections/HeroSection.svelte";
  import HighlightsSection from "#presentation/sections/HighlightsSection.svelte";
  import ExperienceSection from "#presentation/sections/ExperienceSection.svelte";
  import ProjectsSection from "#presentation/sections/ProjectsSection.svelte";
  import SkillsSection from "#presentation/sections/SkillsSection.svelte";
  import ContactSection from "#presentation/sections/ContactSection.svelte";

  let { model }: { model: HomePageViewModel } = $props();
</script>

<section class="home-page">
  <div class="shell">
    <HeroSection hero={model.hero} navigation={model.navigation} />

    <main class="document">
      <HighlightsSection section={model.intro} />
      <ExperienceSection section={model.experience} />
      <ProjectsSection section={model.projects} />
      <SkillsSection section={model.skills} />
      <ContactSection section={model.contact} />
    </main>
  </div>
</section>

<style>
  .home-page {
    min-height: 100dvh;
    padding: clamp(1.5rem, 4vw, 3rem);
  }

  .shell {
    width: min(920px, 100%);
    margin: 0 auto;
    border: 1px solid var(--surface-border);
    background: var(--surface-elevated);
    box-shadow: 0 30px 120px color-mix(in srgb, black 55%, transparent);
  }

  .document {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 720px) {
    .home-page {
      padding: 1rem;
    }
  }
</style>
