<script lang="ts">
  // ParaglideJS component is no longer needed in v2
  import { onMount } from "svelte"
  import { detectAndSetBrowserLocale } from "$lib/i18n"

  // Props
  let { children } = $props()

  onMount(() => {
    detectAndSetBrowserLocale()
  })
</script>

{@render children()}
