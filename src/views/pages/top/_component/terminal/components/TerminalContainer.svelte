<script lang="ts">
  import { terminalTransform } from "$views/pages/top/_component/terminal/components/terminal-view/stores/terminal.store"
  import TerminalHeader from "$views/pages/top/_component/terminal/components/terminal-view/components/TerminalHeader.svelte"
  import TerminalView from "$views/pages/top/_component/terminal/components/terminal-view/components/TerminalView.svelte"

  export let title = "Terminal - api-service"
</script>

<div class="terminal-container" style="transform: {$terminalTransform};">
  <TerminalHeader {title} />

  <div class="terminal-content">
    <TerminalView />
  </div>
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
</style>
