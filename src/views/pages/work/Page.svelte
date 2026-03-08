<script lang="ts">
  import SectionPage from '$lib/components/navigation/SectionPage.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<SectionPage
  title={m.work_hero_title()}
  summary={m.work_hero_description()}
  href="/#projects"
  linkLabel={m.tech_back_to_top()}
/>
