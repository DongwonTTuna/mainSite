<script lang="ts">
  import type { PageData } from "./$types"
  import PageSP from "$views/pages/top/PageSP.svelte"
  import PagePC from "$views/pages/top/PagePC.svelte"
  import Layout from "$views/common/layout/Layout.svelte"

  const props = $props()
  const data = props.data as PageData
</script>

<Layout isMobile={data.isMobile}>
  {#if data.isMobile}
    <PageSP />
  {:else}
    <PagePC />
  {/if}
</Layout>
