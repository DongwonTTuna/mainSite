<script lang="ts">
  import { onMount } from "svelte"
  import VimView from "./components/VimView.svelte"
  import VimStatusLine from "./components/VimStatusLine.svelte"
  import { vimStore } from "./stores/vim.store"
  import { terminalStore } from "$views/pages/top/_component/terminal/components/terminal-view/stores/terminal.store"

  export let filename: string
  export let initialContent: string[] = []
  export let onExit: () => void

  let vimViewRef: VimView | null = null

  function handleExit() {
    vimStore.closeVim()

    terminalStore.addLine({
      id: Date.now(),
      type: "log",
      text: "",
      delay: 0
    })

    onExit()
  }

  export function typeContent(lines: string[]) {
    if (vimViewRef) {
      vimViewRef.typeContent(lines)
    }
  }

  onMount(() => {
    const content = initialContent.join("\n")
    vimStore.openVim(filename, content)

    if ($terminalStore.animationIndex > 0) {
      const shouldAutoType = $terminalStore.displayedLines.some(
        (line) => line.type === "vim" && line.text.includes(filename)
      )

      if (shouldAutoType && vimViewRef) {
        setTimeout(() => {
          const vimSequence = ["i", ...`#!/usr/bin/env node\n\nconsole.log("Hello, VIM!");`.split(""), "\u001b", ":wq"]
          vimViewRef?.typeContent(vimSequence)
        }, 500)
      }
    }
  })
</script>

<div class="vim-container">
  <div class="vim-header">
    <div class="vim-title-bar">
      <div class="window-controls">
        <button class="control close" on:click={handleExit} aria-label="Close"></button>
        <button class="control minimize" aria-label="Minimize"></button>
        <button class="control maximize" aria-label="Maximize"></button>
      </div>
      <div class="vim-title">VIM - {filename}</div>
    </div>
  </div>

  <div class="vim-body">
    <VimView bind:this={vimViewRef} onExit={handleExit} autoType={false} />
  </div>

  <VimStatusLine />
</div>

<style>
  .vim-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 17, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
  }

  .vim-header {
    background-color: rgba(0, 0, 17, 0.95);
    border-bottom: 1px solid var(--color-border);
  }

  .vim-title-bar {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    position: relative;
  }

  .window-controls {
    display: flex;
    gap: 8px;
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .control.close {
    background-color: #ff5f57;
  }

  .control.minimize {
    background-color: #ffbd2e;
  }

  .control.maximize {
    background-color: #28ca42;
  }

  .control:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }

  .vim-title {
    flex: 1;
    text-align: center;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-semibold);
  }

  .vim-body {
    flex: 1;
    overflow: hidden;
    background-color: rgba(0, 0, 17, 0.8);
  }

  @media (max-width: 768px) {
    .vim-container {
      border-radius: 0;
      border: none;
    }

    .window-controls {
      display: none;
    }

    .vim-title {
      text-align: left;
      padding-left: 0;
    }
  }
</style>
