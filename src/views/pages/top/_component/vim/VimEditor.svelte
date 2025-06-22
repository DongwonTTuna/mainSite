<script lang="ts">
  import { terminalTransform } from "../terminal-view/stores/terminal.store"
  import { vimStore, vimStatusLine } from "./stores/vim.store"
  import VimView from "./components/VimView.svelte"

  export let onExit: () => void = () => {}

  let vimViewRef: { typeContent: (lines: string[]) => void } | null = null

  export function typeContent(lines: string[]) {
    if (vimViewRef) {
      vimViewRef.typeContent(lines)
    }
  }
</script>

<div class="vim-container" style="transform: {$terminalTransform};">
  <div class="vim-header">
    <div class="vim-header-controls">
      <span class="vim-control red"></span>
      <span class="vim-control yellow"></span>
      <span class="vim-control green"></span>
    </div>
    <span class="vim-title">vim - {$vimStore.filename || "untitled"}</span>
  </div>

  <div class="vim-content">
    <VimView bind:this={vimViewRef} {onExit} />
  </div>

  <!-- VIM Status Line -->
  {#if $vimStatusLine}
    <div class="vim-status-line">
      <span class="vim-mode">{$vimStatusLine.mode}</span>
      <span class="vim-filename">{$vimStatusLine.filename}</span>
      <span class="vim-position">{$vimStatusLine.position}</span>
    </div>
  {/if}
</div>

<style>
  .vim-container {
    width: 95%;
    max-width: 800px;
    height: 600px;
    background: var(--color-terminal-bg);
    border: 1px solid rgba(251, 146, 60, 0.4);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow:
      0 20px 50px rgba(251, 146, 60, 0.15),
      0 0 40px rgba(251, 146, 60, 0.2),
      inset 0 0 80px rgba(251, 146, 60, 0.1);
    backdrop-filter: var(--blur-lg);
    transform-style: preserve-3d;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .vim-header {
    height: 40px;
    background: rgba(251, 146, 60, 0.05);
    border-bottom: 1px solid rgba(251, 146, 60, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-lg);
    position: relative;
  }

  .vim-header-controls {
    display: flex;
    gap: var(--spacing-xs);
  }

  .vim-control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(251, 146, 60, 0.3);
  }

  .vim-control.red {
    background: rgba(255, 95, 86, 0.8);
  }

  .vim-control.yellow {
    background: rgba(255, 189, 46, 0.8);
  }

  .vim-control.green {
    background: rgba(39, 201, 63, 0.8);
  }

  .vim-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-terminal-yellow);
    font-family: var(--font-family-mono), monospace;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);
    opacity: 0.8;
  }

  .vim-content {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  /* VIM Status Line */
  .vim-status-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(251, 146, 60, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-xl);
    font-family: var(--font-family-mono), monospace;
    font-size: var(--font-size-sm);
    color: var(--color-terminal-blue);
  }

  .vim-mode {
    font-weight: var(--font-weight-semibold);
    text-shadow: 0 0 10px rgba(251, 146, 60, 0.5);
  }

  .vim-filename {
    flex: 1;
    text-align: center;
    opacity: 0.8;
  }

  .vim-position {
    opacity: 0.6;
  }
</style>
