<script lang="ts">
  import BlogIndexPage from "#presentation/pages/blog/BlogIndexPage.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  {#if data.meta.description}
    <meta name="description" content={data.meta.description} />
  {/if}
</svelte:head>

<BlogIndexPage articles={data.articles} />
