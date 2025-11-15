<script lang="ts">
  import {resolve} from '$app/paths';
  import type {RouteId} from '$app/types';
  import type {Snippet} from 'svelte';
  import type {HTMLAnchorAttributes} from 'svelte/elements';

  type NavCardProps = Omit<HTMLAnchorAttributes, 'href'> & {
    href: RouteId;
    label: string;
    children?: Snippet;
  };

  let {
    href,
    label,
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
    display: inline-flex;
    align-items: center;
    position: relative;
  }

  .nav-card-title::after {
    content: '→';
    margin-left: 0.6rem;
    display: inline-block;
    transform: translateX(0);
    transition: transform 180ms ease, opacity 200ms ease;
    opacity: 1;
  }

  .nav-card:hover .nav-card-title::after,
  .nav-card:focus-visible .nav-card-title::after {
    transform: translateX(1rem);
    opacity: 0;
  }
</style>
