<script lang="ts">
  import { onMount } from "svelte"
  import ProfileSection from "./_component/ProfileSection.svelte"
  import HeroSection from "./_component/HeroSection.svelte"
  import SkillsSection from "./_component/SkillsSection.svelte"
  import ExperienceSection from "./_component/ExperienceSection.svelte"

  let sections: HTMLElement[] = []

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  })
</script>

<div class="page-container">
  <HeroSection />
  <div class="section-wrapper" bind:this={sections[0]}>
    <ProfileSection />
  </div>
  <div class="section-wrapper" bind:this={sections[1]}>
    <SkillsSection />
  </div>
  <div class="section-wrapper" bind:this={sections[2]}>
    <ExperienceSection />
  </div>
</div>

<style>
  .page-container {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background: var(--color-background);
  }

  .section-wrapper {
    opacity: 1;
    transform: translateY(0);
    transition: all var(--transition-slow);
  }

  /* Optional: Add animation on scroll if you want to keep it
  .section-wrapper:not(.visible) {
    opacity: 0;
    transform: translateY(50px);
  }

  .section-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
  */

  :global(.section-wrapper > section) {
    margin: var(--spacing-xl) auto;
    max-width: var(--max-width-container);
  }
</style>
