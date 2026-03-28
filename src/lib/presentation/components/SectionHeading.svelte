<script lang="ts">
  import type { HomeSectionAnchor } from "#infrastructure/routing/anchors";

  let {
    eyebrow,
    title,
    icon,
  }: {
    eyebrow: string;
    title: string;
    icon: HomeSectionAnchor;
  } = $props();
</script>

<div class="section-header">
  <div>
    <p class="section-label">{eyebrow}</p>
    <h2>
      <span class="title-icon" aria-hidden="true">
        {#if icon === "intro"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 3v18" stroke-linecap="round" />
            <path d="M3 12h18" stroke-linecap="round" />
            <circle cx="12" cy="12" r="3.25" />
          </svg>
        {:else if icon === "experience"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              d="M8 7V5.75A1.75 1.75 0 0 1 9.75 4h4.5A1.75 1.75 0 0 1 16 5.75V7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.75 7h14.5A1.75 1.75 0 0 1 21 8.75v8.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25v-8.5A1.75 1.75 0 0 1 4.75 7Z"
              stroke-linejoin="round"
            />
            <path d="M3 12h18" stroke-linecap="round" />
          </svg>
        {:else if icon === "projects"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              d="M4.75 6h5.5l1.5 2h7.5A1.75 1.75 0 0 1 21 9.75v7.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25v-9.5A1.75 1.75 0 0 1 4.75 6Z"
              stroke-linejoin="round"
            />
          </svg>
        {:else if icon === "skills"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              d="m14.8 5.3 3.9 3.9-8.4 8.4H6.4v-3.9l8.4-8.4Z"
              stroke-linejoin="round"
            />
            <path d="m13.6 6.5 3.9 3.9" stroke-linecap="round" />
            <path d="M5 19h14" stroke-linecap="round" />
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path
              d="M5.75 6h12.5A1.75 1.75 0 0 1 20 7.75v8.5A1.75 1.75 0 0 1 18.25 18H5.75A1.75 1.75 0 0 1 4 16.25v-8.5A1.75 1.75 0 0 1 5.75 6Z"
              stroke-linejoin="round"
            />
            <path d="m5 8 7 5 7-5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        {/if}
      </span>
      <span>{title}</span>
    </h2>
  </div>
</div>

<style>
  .section-header {
    margin-bottom: 1rem;
  }

  .section-label {
    margin: 0;
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  h2 {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    margin: 0;
    font-size: 1.15rem;
    line-height: 1.4;
    color: var(--text-strong);
  }

  .title-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.45rem;
    height: 1.45rem;
    border: 1px solid color-mix(in srgb, var(--surface-border) 85%, white 15%);
    border-radius: 999px;
    color: color-mix(in srgb, var(--text-body) 70%, white 30%);
    background: color-mix(in srgb, var(--surface-border) 45%, transparent);
    flex: none;
  }

  svg {
    width: 0.82rem;
    height: 0.82rem;
  }
</style>
