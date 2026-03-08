<script lang="ts">
  import SectionPage from '$lib/components/navigation/SectionPage.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<SectionPage
  title={m.tech_hero_title()}
  summary={m.tech_status_description()}
  href="/#skills"
  linkLabel={m.tech_back_to_top()}
/>
