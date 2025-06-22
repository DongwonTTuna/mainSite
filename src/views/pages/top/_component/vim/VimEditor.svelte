<script lang="ts">
  import { onMount } from "svelte"
  import VimView from "./components/VimView.svelte"
  import VimStatusLine from "./components/VimStatusLine.svelte"
  import { vimStore } from "./stores/vim.store"
  import { terminalStore } from "$views/pages/top/_component/terminal/components/terminal-view/stores/terminal.store"

  export let filename: string
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
    // Start with empty content for typing animation
    vimStore.openVim(filename, "")
  })
</script>

<div class="vim-container">
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
    background-color: transparent;
    overflow: hidden;
  }

  .vim-body {
    flex: 1;
    overflow: hidden;
    background-color: transparent;
  }

  @media (max-width: 768px) {
    .vim-container {
      border-radius: 0;
      border: none;
    }
  }
</style>
