<script lang="ts">
  import {resolve} from '$app/paths';
  import type {RouteId} from '$app/types';
  import type {Snippet} from 'svelte';
  import type {HTMLAnchorAttributes} from 'svelte/elements';

  type NavCardProps = Omit<HTMLAnchorAttributes, 'href'> & {
    href: RouteId;
    label: string;
    description?: string;
    children?: Snippet;
  };

  let {
    href,
    label,
    description,
    class: className = '',
    children,
    ...restProps
  }: NavCardProps = $props();
</script>

<a
  class={`nav-card ${className}`.trim()}
  href={resolve(href)}
  {...restProps}
>
  <span class="nav-card-title">{label}</span>
  {#if description}
    <p class="nav-card-description">{description}</p>
  {/if}
  {@render children?.()}
</a>

<style>
  .nav-card {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.95rem 1rem;
    text-decoration: none;
    color: #ffffff;
    background: rgba(7, 5, 18, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    transition: border-color 120ms ease, transform 120ms ease;
  }

  .nav-card:hover,
  .nav-card:focus-visible {
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  .nav-card-title {
    font-weight: 700;
    font-size: 1rem;
  }

  .nav-card-description {
    margin: 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.9rem;
    line-height: 1.5;
  }
</style>
