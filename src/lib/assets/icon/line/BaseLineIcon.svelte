<script lang="ts">
  import type { Snippet } from 'svelte';

  const {
    size = '1rem',
    viewBox = '0 0 24 24',
    children
  } = $props<{ size?: string; viewBox?: string; children?: Snippet }>();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox={viewBox}
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width="1.7"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {@render children?.()}
</svg>
