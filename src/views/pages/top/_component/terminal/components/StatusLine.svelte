<script lang="ts">
  export let mode: string = ""
  export let filename: string = ""
  export let position: string = ""
  export let visible: boolean = false
</script>

{#if visible}
  <div class="vim-status-line">
    <span class="vim-mode">{mode || "\u00A0"}</span>
    <span class="vim-filename">{filename}</span>
    <span class="vim-position">{position}</span>
  </div>
{/if}

<style>
  .vim-status-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(254, 215, 170, 0.5);
    padding: var(--spacing-sm) var(--spacing-xl);
    border-top: 1px solid rgba(251, 146, 60, 0.3);
    font-family: var(--font-family-mono), monospace;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-ultralight);
    display: flex;
    align-items: center;
  }

  .vim-mode {
    color: var(--color-terminal-blue);
    font-weight: var(--font-weight-semibold);
    text-shadow: 0 0 10px rgba(251, 146, 60, 0.5);
    margin-right: var(--spacing-lg);
  }

  .vim-filename {
    color: var(--color-terminal-yellow);
    flex: 1;
    text-align: center;
    font-weight: var(--font-weight-ultralight);
  }

  .vim-position {
    color: var(--color-terminal-blue);
    margin-left: auto;
    font-weight: var(--font-weight-ultralight);
  }
</style>
