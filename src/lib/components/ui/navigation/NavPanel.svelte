<script lang="ts" module>
  import type {Snippet} from 'svelte';
  import type {HTMLAttributes} from 'svelte/elements';

  type NavPanelProps = HTMLAttributes<HTMLDivElement> & {
    heading: string;
    description?: string;
    children?: Snippet;
  };
</script>

<script lang="ts">
  let {
    heading,
    description,
    class: className = '',
    children,
    ...restProps
  }: NavPanelProps = $props();
</script>

<div
        class={`nav-panel ${className}`.trim()}
        {...restProps}
>
    <p class="nav-panel-title">{heading}</p>
    {#if description}
        <p class="nav-panel-description">{description}</p>
    {/if}
    {@render children?.()}
</div>

<style>
    .nav-panel {
        padding: 1rem 1.1rem;
        background: rgba(7, 5, 18, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
    }

    .nav-panel-title {
        font-weight: 700;
        font-size: 1rem;
    }

    .nav-panel-description {
        margin: 0;
        color: rgba(255, 255, 255, 0.78);
        font-size: 0.9rem;
        line-height: 1.5;
    }
</style>
