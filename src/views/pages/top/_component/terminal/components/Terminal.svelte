<script lang="ts">
  import { terminalTransform } from "../stores/terminal.store"
  import { vimStatusLine } from "../stores/vim.store"
  import TerminalHeader from "./TerminalHeader.svelte"
  import TerminalBody from "./TerminalBody.svelte"
  import StatusLine from "./StatusLine.svelte"

  export let title = "Terminal - api-service"
  export let vimEditorRef: { typeContent: (lines: string[]) => void } | null = null
</script>

<div class="terminal-container" style="transform: {$terminalTransform};">
  <TerminalHeader {title} />
  <TerminalBody bind:vimEditorRef />
  <StatusLine
    visible={!!$vimStatusLine}
    mode={$vimStatusLine?.mode || ""}
    filename={$vimStatusLine?.filename || ""}
    position={$vimStatusLine?.position || ""}
  />
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
  }
</style>
