<script lang="ts">
  import { onMount } from "svelte"
  import Terminal from "$views/pages/top/_component/terminal/components/terminal-view/Terminal.svelte"

  let terminalRef: { runAnimation: () => void } | null = null

  export function runAnimation() {
    if (terminalRef) {
      terminalRef.runAnimation()
    }
  }

  onMount(() => {
    // Animation will be started by parent component
  })
</script>

<div class="terminal-wrapper">
  <Terminal bind:this={terminalRef} />
</div>

<style>
  .terminal-wrapper {
    width: 100%;
    height: 100%;
    min-height: 600px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
  }
</style>
