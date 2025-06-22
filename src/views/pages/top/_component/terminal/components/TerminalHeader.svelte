<script lang="ts">
  export let title = 'Terminal'
</script>

<div class="terminal-header">
  <div class="terminal-buttons">
    <span class="terminal-button close"></span>
    <span class="terminal-button minimize"></span>
    <span class="terminal-button maximize"></span>
  </div>
  <div class="terminal-title">{title}</div>
</div>

<style>
  .terminal-header {
    background: rgba(254, 215, 170, 0.5);
    padding: var(--spacing-sm) var(--spacing-md);
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(251, 146, 60, 0.3);
  }

  .terminal-buttons {
    display: flex;
    gap: var(--spacing-sm);
    margin-right: var(--spacing-base);
  }

  .terminal-button {
    width: 12px;
    height: 12px;
    border-radius: var(--radius-full);
    display: block;
  }

  .terminal-button.close {
    background: var(--color-terminal-red);
  }

  .terminal-button.minimize {
    background: var(--color-terminal-yellow);
  }

  .terminal-button.maximize {
    background: var(--color-terminal-green);
  }

  .terminal-title {
    font-size: var(--font-size-sm);
    color: var(--color-terminal-blue);
    font-family: var(--font-family-mono), monospace;
    font-weight: var(--font-weight-ultralight);
  }
</style>