<script lang="ts" module>
  import "../app.css";
</script>

<script lang="ts">
  import SiteHeader from "#presentation/components/SiteHeader.svelte";
  import type { LayoutData } from './$types';

  let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta name="theme-color" content="#f8f7f3" />
</svelte:head>

<div class="layout-container">
  <SiteHeader locale={data.locale} />
  {@render children()}
</div>

<style>
  .layout-container {
    position: relative;
    min-height: 100dvh;
  }

</style>
