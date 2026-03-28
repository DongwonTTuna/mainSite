<script lang="ts">
  import type { ProfileFactId } from "#application/profile/types";
  import type { ExperienceId } from "#domain/profile/types";

  type InlineItemIconName = ProfileFactId | ExperienceId;

  let { name }: { name: InlineItemIconName } = $props();
</script>

<span class="inline-icon" aria-hidden="true" data-kind={name}>
  {#if name === "currentRole"}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path
        d="M7.5 7V5.75A1.75 1.75 0 0 1 9.25 4h5.5a1.75 1.75 0 0 1 1.75 1.75V7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.75 7h14.5A1.75 1.75 0 0 1 21 8.75v7.5A1.75 1.75 0 0 1 19.25 18H4.75A1.75 1.75 0 0 1 3 16.25v-7.5A1.75 1.75 0 0 1 4.75 7Z"
        stroke-linejoin="round"
      />
      <path d="M3 11.5h18" stroke-linecap="round" />
    </svg>
  {:else if name === "location"}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path
        d="M12 20s5-4.83 5-9a5 5 0 1 0-10 0c0 4.17 5 9 5 9Z"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="11" r="1.8" />
    </svg>
  {:else if name === "languages"}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M4 7h9" stroke-linecap="round" />
      <path d="M8.5 5v2c0 3.3-1.83 6.22-4.5 7.9" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6 10.75c1.08 1.5 2.46 2.8 4 3.8" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m14.5 18 3.1-8 3.1 8" stroke-linejoin="round" />
      <path d="M15.65 15h3.9" stroke-linecap="round" />
    </svg>
  {:else if name === "stack"}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="m12 4 7 4-7 4-7-4 7-4Z" stroke-linejoin="round" />
      <path d="m5 12 7 4 7-4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m5 16 7 4 7-4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  {:else if name === "nextbeat"}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <path
        d="M8 15.5V8.5h2.15l3.7 4.8V8.5H16v7h-2.15l-3.7-4.8v4.8H8Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path
        d="M12 4.25 18.28 7.9v8.2L12 19.75 5.72 16.1V7.9L12 4.25Z"
        stroke-linejoin="round"
      />
      <path d="M8.8 9.2h4.05a2.3 2.3 0 1 1 0 4.6H8.8v-4.6Z" stroke-linejoin="round" />
      <path d="M8.8 13.8v1.55" stroke-linecap="round" />
    </svg>
  {/if}
</span>

<style>
  .inline-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    color: color-mix(in srgb, var(--text-muted) 78%, white 22%);
    flex: none;
  }

  .inline-icon[data-kind="nextbeat"] {
    color: color-mix(in srgb, var(--text-strong) 78%, var(--text-muted) 22%);
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style>
