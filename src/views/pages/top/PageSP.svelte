<script lang="ts">
  import ProfileSection from './_component/ProfileSection.svelte'
  import HeroSection from './_component/HeroSection.svelte'
  import SkillsSection from './_component/SkillsSection.svelte'
  import ExperienceSection from './_component/ExperienceSection.svelte'
</script>

<div class="page-container-sp">
  <HeroSection />
  <ProfileSection />
  <SkillsSection />
  <ExperienceSection />
</div>

<style>
  .page-container-sp {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  :global(.page-container-sp .hero-section) {
    padding: var(--spacing-base);
  }

  :global(.page-container-sp .name) {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }

  :global(.page-container-sp .role) {
    font-size: clamp(1.25rem, 5vw, 2rem);
  }

  :global(.page-container-sp .hero-subtitle) {
    font-size: var(--font-size-base);
  }

  :global(.page-container-sp .section-title) {
    font-size: var(--font-size-3xl);
  }

  :global(.page-container-sp .profile-grid),
  :global(.page-container-sp .skills-grid),
  :global(.page-container-sp .about-grid),
  :global(.page-container-sp .projects-grid) {
    grid-template-columns: 1fr;
  }

  :global(.page-container-sp .container) {
    padding: 0 var(--spacing-base);
  }

  :global(.page-container-sp .profile-section),
  :global(.page-container-sp .skills-section),
  :global(.page-container-sp .experience-section) {
    padding: var(--spacing-2xl) 0;
  }

  :global(.page-container-sp .experience-number) {
    font-size: var(--font-size-5xl);
  }

  :global(.page-container-sp .experience-text) {
    font-size: var(--font-size-xl);
  }

  :global(.page-container-sp .shape-1) {
    width: 200px;
    height: 200px;
  }

  :global(.page-container-sp .shape-2) {
    width: 150px;
    height: 150px;
  }

  :global(.page-container-sp .shape-3) {
    width: 125px;
    height: 125px;
  }
</style>