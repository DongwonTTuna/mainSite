<script lang="ts">
  import type { Snippet } from 'svelte'
  type Align = 'left' | 'center' | 'right';
  type ContainerBoxProps = {
    as?: keyof HTMLElementTagNameMap;
    style?: string;
    align?: Align;
    maxWidth?: string | null;
    padding?: string | null;
    ariaLabel?: string | null;
    children?: Snippet;
  };

  let {
    as = 'div',
    style,
    align = 'left',
    maxWidth = null,
    padding = '1rem 1.25rem',
    ariaLabel = null,
    children
  }: ContainerBoxProps = $props();

  const alignClassMap: Record<Align, string> = {
    left: '',
    center: 'container-box--align-center',
    right: 'container-box--align-right'
  };

  const alignClass = $derived(alignClassMap[align] ?? '');

  const computedStyle = $derived(
    [
      maxWidth ? `max-width:${maxWidth}` : '',
      padding ? `padding:${padding}` : ''
    ]
      .filter(Boolean)
      .join('; ')
  );

  const mergedStyle = $derived([computedStyle, style].filter(Boolean).join('; '));
</script>

<svelte:element
  this={as}
  class={`container-box ${alignClass}`.trim()}
  style={mergedStyle || undefined}
  aria-label={ariaLabel || undefined}
>
  {@render children?.()}
</svelte:element>

<style>
  .container-box {
    width: 100%;
    max-width: min(920px, 100%);
    padding: 1rem 1.25rem;
    border-radius: 18px;
    background: rgba(5, 4, 12, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.5);
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .container-box--align-center {
    margin: 0 auto;
    text-align: center;
  }

  .container-box--align-right {
    margin-left: auto;
    text-align: right;
  }
</style>
