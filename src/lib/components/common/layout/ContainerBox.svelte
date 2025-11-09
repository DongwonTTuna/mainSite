<script lang="ts">
  import type { Snippet } from 'svelte'
  type Align = 'left' | 'center' | 'right';
  type Variant = 'glass' | 'solid';

  type ContainerBoxProps = {
    as?: keyof HTMLElementTagNameMap;
    class?: string;
    style?: string;
    align?: Align;
    variant?: Variant;
    maxWidth?: string | null;
    padding?: string | null;
    radius?: string | null;
    background?: string | null;
    borderColor?: string | null;
    blur?: string | null;
    shadow?: string | null;
    children?: Snippet;
  };

  let {
    as = 'div',
    class: className = '',
    style,
    align = 'left',
    variant = 'glass',
    maxWidth = '960px',
    padding = '2rem',
    radius = '24px',
    background = null,
    borderColor = null,
    blur = null,
    shadow = null,
    children
  }: ContainerBoxProps = $props();

  const alignClassMap: Record<Align, string> = {
    left: '',
    center: 'container-box--align-center',
    right: 'container-box--align-right'
  };

  const variantClassMap: Record<Variant, string> = {
    glass: 'container-box--glass',
    solid: 'container-box--solid'
  };

  const alignClass = $derived(alignClassMap[align] ?? '');
  const variantClass = $derived(variantClassMap[variant] ?? variantClassMap.glass);

  const computedStyle = $derived(
    [
      maxWidth ? `--container-box-max-width:${maxWidth}` : '',
      padding ? `--container-box-padding:${padding}` : '',
      radius ? `--container-box-radius:${radius}` : '',
      background ? `--container-box-background:${background}` : '',
      borderColor ? `--container-box-border:${borderColor}` : '',
      blur ? `--container-box-blur:${blur}` : '',
      shadow ? `--container-box-shadow:${shadow}` : ''
    ]
      .filter(Boolean)
      .join('; ')
  );

  const mergedStyle = $derived([computedStyle, style].filter(Boolean).join('; '));
</script>

<svelte:element
  this={as}
  class={`container-box ${alignClass} ${variantClass} ${className}`.trim()}
  style={mergedStyle || undefined}
>
  {@render children?.()}
</svelte:element>

<style>
  .container-box {
    width: 100%;
    max-width: var(--container-box-max-width, 100%);
    padding: var(--container-box-padding, 1.5rem);
    border-radius: var(--container-box-radius, 1.5rem);
    background: var(--container-box-background, rgba(7, 5, 18, 0.95));
    border: 1px solid var(--container-box-border, transparent);
    box-shadow: var(--container-box-shadow, none);
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .container-box--glass {
    background: var(--container-box-background, rgba(6, 4, 18, 0.65));
    border-color: var(--container-box-border, rgba(255, 255, 255, 0.08));
    backdrop-filter: blur(var(--container-box-blur, 18px));
    -webkit-backdrop-filter: blur(var(--container-box-blur, 18px));
    box-shadow: var(--container-box-shadow, 0 25px 80px rgba(0, 0, 0, 0.55));
  }

  .container-box--solid {
    background: var(--container-box-background, rgba(6, 4, 18, 0.92));
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
