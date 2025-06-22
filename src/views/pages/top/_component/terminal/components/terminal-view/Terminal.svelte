<script lang="ts">
  import { onMount } from "svelte"
  import TerminalHeader from "./components/TerminalHeader.svelte"
  import TerminalView from "./components/TerminalView.svelte"
  import VimEditor from "../../../vim/VimEditor.svelte"
  import { terminalStore } from "./stores/terminal.store"
  import { vimStore } from "../../../vim/stores/vim.store"

  export let title = "Terminal - api-service"

  let vimRef: { typeContent: (lines: string[]) => void } | null = null
  let vimFilename = ""
  let currentMode: "terminal" | "vim" = "terminal"

  // Subscribe to terminal store to detect vim commands
  $: if ($terminalStore.lastCommand?.startsWith("vim ")) {
    const parts = $terminalStore.lastCommand.split(" ")
    const filename = parts[1]
    openVimMode(filename)
  }

  function openVimMode(filename: string) {
    currentMode = "vim"
    vimFilename = filename
    vimStore.openVim(filename)

    // VIM component needs time to mount before typing can start
    setTimeout(() => {
      if ((window as unknown as { __terminalWrapper?: object }).__terminalWrapper) {
        // Terminal animation service will trigger typing
      }
    }, 100)
  }

  function closeVimMode() {
    currentMode = "terminal"
    vimStore.closeVim()
    // Continue terminal animation after vim closes
    terminalStore.resumeAnimation()
  }

  onMount(() => {
    // Make terminal accessible for vim animation
    ;(window as unknown as { __terminalWrapper?: object }).__terminalWrapper = {
      typeVimContent: (content: string[]) => {
        if (vimRef && currentMode === "vim") {
          vimRef.typeContent(content)
        }
      }
    }
  })
</script>

<div class="terminal-container" style="transform: perspective(1200px) rotateX(-5deg) rotateY(10deg);">
  <TerminalHeader {title} />
  <div class="terminal-content">
    {#if currentMode === "terminal"}
      <TerminalView />
    {:else if currentMode === "vim"}
      <VimEditor bind:this={vimRef} filename={vimFilename} onExit={closeVimMode} />
    {/if}
  </div>
</div>

<style>
  .terminal-container {
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

  .terminal-content {
    flex: 1;
    height: calc(100% - 40px);
    overflow: hidden;
    position: relative;
  }
</style>
