<script lang="ts" module>
  import type {Snippet} from 'svelte';
  import type {HTMLAttributes} from 'svelte/elements';

  type NavPanelsProps = HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
  };
</script>

<script lang="ts">
  let {
    class: className = '',
    children,
    ...restProps
  }: NavPanelsProps = $props();
</script>

<div
        class={`nav-panels ${className}`.trim()}
        {...restProps}
>
    {@render children?.()}
</div>

<style>
    .nav-panels {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 0.75rem;
    }
</style>
