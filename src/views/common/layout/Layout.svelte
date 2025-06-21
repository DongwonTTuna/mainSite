<script lang="ts">
  import { page } from '$app/stores'
  import Circle from "./lib/Circle.svelte"
  
  export let isMobile: boolean
</script>

<main class="main__container">
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