<script lang="ts">
  import { terminalTransform } from "../../terminal-view/stores/terminal.store"
  import { vimStore, vimStatusLine } from "../../vim/stores/vim.store"
  import TerminalHeader from "../../terminal-view/components/TerminalHeader.svelte"
  import TerminalView from "../../terminal-view/components/TerminalView.svelte"
  import VimView from "../../vim/components/VimView.svelte"

  export let title = "Terminal - api-service"
  export let vimEditorRef: { typeContent: (lines: string[]) => void } | null = null

  function handleVimExit() {
    vimStore.closeVim()
  }
</script>

<div class="terminal-container" style="transform: {$terminalTransform};">
  <TerminalHeader {title} />

  <div class="terminal-content">
    {#if $vimStore.mode !== "closed"}
      <VimView bind:this={vimEditorRef} onExit={handleVimExit} />
    {:else}
      <TerminalView />
    {/if}
  </div>

  <!-- VIM Status Line -->
  {#if $vimStore.mode !== "closed"}
    <div class="vim-status-line">
      <span class="vim-mode">{$vimStore.mode.toUpperCase()}</span>
      <span class="vim-filename">{$vimStore.filename || "untitled"}</span>
      <span class="vim-position">{$vimStatusLine?.position || "1:1"}</span>
    </div>
  {/if}
</div>

<style>
  .terminal-container {
    width: 95%;
    max-width: 1200px;
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

  .terminal-content {
    flex: 1;
    height: calc(100% - 40px);
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
