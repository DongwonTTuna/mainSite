<script lang="ts" module>
  import type {Snippet} from 'svelte';
  import type {HTMLAttributes} from 'svelte/elements';

  type TagProps = HTMLAttributes<HTMLSpanElement> & {
    as?: keyof HTMLElementTagNameMap;
    children?: Snippet;
  };
</script>

<script lang="ts">
  let {
    as = 'span',
    class: className = '',
    children,
    ...restProps
  }: TagProps = $props();
</script>

<svelte:element
        this={as}
        class={`tag ${className}`.trim()}
        {...restProps}
>
    {@render children?.()}
</svelte:element>

<style>
    .tag {
        padding: 0.35rem 0.75rem;
        background: rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.85);
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        line-height: 1.2;
    }
</style>
