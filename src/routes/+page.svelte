<script lang="ts">
  import type { PageData } from "./$types";
  import HomePage from "#presentation/pages/home/HomePage.svelte";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  {#if data.meta.description}
    <meta name="description" content={data.meta.description} />
  {/if}
</svelte:head>

<HomePage model={data.model} />
