<script lang="ts">
  import { onMount } from "svelte"
  import Terminal from "./terminal-view/Terminal.svelte"
  import VimEditor from "./vim/VimEditor.svelte"
  import { terminalStore } from "./terminal-view/stores/terminal.store"
  import { vimStore } from "./vim/stores/vim.store"

  let terminalRef: { runAnimation: () => void } | null = null
  let vimRef: { typeContent: (lines: string[]) => void } | null = null

  let currentMode: "terminal" | "vim" = "terminal"

  // Subscribe to terminal store to detect vim commands
  $: if ($terminalStore.lastCommand?.startsWith("vim ")) {
    const filename = $terminalStore.lastCommand.split(" ")[1]
    openVimMode(filename)
  }

  function openVimMode(filename: string) {
    currentMode = "vim"
    vimStore.openVim(filename)
  }

  function closeVimMode() {
    currentMode = "terminal"
    vimStore.closeVim()
    // Continue terminal animation after vim closes
    terminalStore.resumeAnimation()
  }

  onMount(() => {
    // Start terminal animation
    if (terminalRef) {
      terminalRef.runAnimation()
    }
  })
</script>

<div class="terminal-wrapper">
  {#if currentMode === "terminal"}
    <Terminal bind:this={terminalRef} />
  {:else if currentMode === "vim"}
    <VimEditor bind:this={vimRef} onExit={closeVimMode} />
  {/if}
</div>

<style>
  .terminal-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
  }
</style>
