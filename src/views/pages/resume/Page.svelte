<script lang="ts">
  import SectionPage from '$lib/components/navigation/SectionPage.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<SectionPage
  title={m.resume_hero_eyebrow()}
  summary={m.work_experience_detail()}
  href="/#experience"
  linkLabel={m.tech_back_to_top()}
/>
