<script lang="ts">
  import ProfileSection from './_component/ProfileSection.svelte'
  import HeroSection from './_component/HeroSection.svelte'
  import SkillsSection from './_component/SkillsSection.svelte'
  import ExperienceSection from './_component/ExperienceSection.svelte'
</script>

<div class="page-container">
  <HeroSection />
  <ProfileSection />
  <SkillsSection />
  <ExperienceSection />
</div>

<style>
  .page-container {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }
</style>