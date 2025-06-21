<script lang="ts">
  import Circle from "./lib/Circle.svelte"
  import LanguageSwitcher from "../components/LanguageSwitcher.svelte"
  
  export let isMobile: boolean
</script>

<main class="main__container">
  <header class="main__header">
    <LanguageSwitcher />
  </header>
  {#if !isMobile}
    <Circle />
  {/if}
  <div class="main__content" class:mobile={isMobile}>
    <slot />
  </div>
</main>

<style>
  .main__container {
    height: 100dvh;
    overflow: hidden;
    position: relative;
  }

  .main__header {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
  }

  .main__content {
    width: 1024px;
    margin: 0 auto;
    height: 100%;
  }

  .main__content.mobile {
    width: 360px;
  }
</style>