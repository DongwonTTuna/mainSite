<script lang="ts" module>
  import "../app.css";
  import favicon from "$lib/assets/favicon.png";
</script>

<script lang="ts">
  import LanguageSwitcher from "#presentation/components/LanguageSwitcher.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="layout-container">
  <div class="switcher-wrapper">
    <LanguageSwitcher />
  </div>
  {@render children()}
</div>

<style>
  .layout-container {
    position: relative;
    min-height: 100dvh;
  }

  .switcher-wrapper {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 50;
  }

  @media (max-width: 640px) {
    .switcher-wrapper {
      top: 1rem;
      right: 1rem;
    }
  }
</style>
