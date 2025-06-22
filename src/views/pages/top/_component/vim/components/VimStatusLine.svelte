<script lang="ts">
  import { vimStore, vimIsModified, vimCursor } from "../stores/vim.store"

  $: filename = $vimStore.filename || "[No Name]"
  $: mode = $vimStore.mode
  $: statusMessage = $vimStore.statusMessage
  $: line = $vimCursor.line + 1
  $: column = $vimCursor.column + 1
  $: totalLines = $vimStore.content.split("\n").length
  $: percentage = Math.round((line / totalLines) * 100) || 0
</script>

<div class="vim-status-line">
  <div class="status-left">
    {#if mode === "insert"}
      <span class="mode mode-insert">-- INSERT --</span>
    {:else if mode === "visual"}
      <span class="mode mode-visual">-- VISUAL --</span>
    {:else if mode === "replace"}
      <span class="mode mode-replace">-- REPLACE --</span>
    {:else if mode === "command"}
      <span class="mode mode-command">{statusMessage}</span>
    {:else if statusMessage}
      <span class="message">{statusMessage}</span>
    {/if}
  </div>

  <div class="status-right">
    <span class="filename">
      {filename}
      {#if $vimIsModified}
        <span class="modified">[+]</span>
      {/if}
    </span>
    <span class="position">
      {line},{column}
    </span>
    <span class="percentage">
      {#if totalLines === 1}
        All
      {:else if line === 1}
        Top
      {:else if line === totalLines}
        Bot
      {:else}
        {percentage}%
      {/if}
    </span>
  </div>
</div>

<style>
  .vim-status-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    background-color: rgba(0, 0, 17, 0.8);
    border-top: 1px solid var(--color-border);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    backdrop-filter: blur(10px);
    min-height: 28px;
  }

  .status-left {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .status-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
  }

  .mode {
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .mode-insert {
    color: var(--color-accent);
  }

  .mode-visual {
    color: #87ceeb;
  }

  .mode-replace {
    color: #ff6b6b;
  }

  .mode-command {
    color: var(--color-text-primary);
    text-transform: none;
    letter-spacing: normal;
  }

  .message {
    color: var(--color-text-secondary);
  }

  .filename {
    color: var(--color-text-primary);
  }

  .modified {
    color: var(--color-accent);
    margin-left: 4px;
  }

  .position {
    color: var(--color-text-secondary);
    min-width: 60px;
    text-align: right;
  }

  .percentage {
    color: var(--color-text-secondary);
    min-width: 40px;
    text-align: right;
  }
</style>
