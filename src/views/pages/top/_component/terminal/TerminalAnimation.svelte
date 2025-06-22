<script lang="ts">
  import { onMount } from "svelte"
  import TerminalWrapper from "../TerminalWrapper.svelte"

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let terminalWrapperRef: any

  onMount(() => {
    // Terminal wrapper handles all animation logic now
    // Give components time to fully mount
    setTimeout(() => {
      if (terminalWrapperRef && terminalWrapperRef.runAnimation) {
        terminalWrapperRef.runAnimation()
      }
    }, 100)
  })
</script>

<div class="terminal-wrapper">
  <TerminalWrapper bind:this={terminalWrapperRef} />
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
