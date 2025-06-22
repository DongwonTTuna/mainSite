<script lang="ts">
  import { onMount } from "svelte"
  import Terminal from "./components/terminal-view/Terminal.svelte"

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let terminalRef: any

  onMount(() => {
    // Terminal handles all animation logic now
    // Give components time to fully mount
    setTimeout(() => {
      if (terminalRef && terminalRef.runAnimation) {
        terminalRef.runAnimation()
      }
    }, 100)
  })
</script>

<div class="terminal-wrapper">
  <Terminal bind:this={terminalRef} />
</div>

<style>
  .terminal-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
  }
</style>
