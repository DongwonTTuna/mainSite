<script lang="ts">
  import { terminalStore, currentCommand } from "../stores/terminal.store"
  import type { LogLine } from "../types/terminal.types"

  let terminalBody: HTMLDivElement

  function getLineColor(type: LogLine["type"]) {
    switch (type) {
      case "command":
        return "var(--color-terminal-blue)"
      case "success":
        return "var(--color-terminal-green)"
      case "error":
        return "var(--color-terminal-red)"
      case "warning":
        return "var(--color-terminal-yellow)"
      case "info":
        return "var(--color-terminal-yellow)"
      case "system":
        return "var(--color-terminal-text)"
      case "vim":
        return "var(--color-terminal-text)"
      case "log":
      default:
        return "var(--color-terminal-text)"
    }
  }

  // Auto scroll to bottom
  $: if (terminalBody && $terminalStore.mode === "terminal") {
    requestAnimationFrame(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight
    })
  }
</script>

<div class="terminal-view" bind:this={terminalBody}>
  {#each $terminalStore.displayedLines as line (line.id)}
    <div
      class="terminal-line {line.type === 'log' ||
      line.type === 'info' ||
      line.type === 'system' ||
      line.type === 'success'
        ? 'log-line'
        : ''}"
      style="color: {getLineColor(line.type)}"
    >
      {#if line.text.startsWith("$ ")}
        {line.text}
      {:else if line.type === "command"}
        <span class="prompt">$</span> {line.text}
      {:else}
        {line.text}
      {/if}
    </div>
  {/each}

  {#if $terminalStore.isTyping}
    <div class="terminal-line" style="color: {getLineColor('command')}">
      <span class="prompt">$</span>
      {$currentCommand}<span class="cursor">_</span>
    </div>
  {/if}
</div>

<style>
  .terminal-view {
    padding: var(--spacing-lg) var(--spacing-xl);
    height: 100%;
    overflow-y: auto;
    font-family: var(--font-family-mono), monospace;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-ultralight);
    line-height: var(--line-height-relaxed);
    color: var(--color-terminal-text);
    scroll-behavior: smooth;
  }

  .terminal-view::-webkit-scrollbar {
    width: 8px;
  }

  .terminal-view::-webkit-scrollbar-track {
    background: rgba(254, 215, 170, 0.2);
  }

  .terminal-view::-webkit-scrollbar-thumb {
    background: rgba(251, 146, 60, 0.5);
    border-radius: var(--radius-sm);
  }

  .terminal-view::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 146, 60, 0.8);
  }

  .terminal-line {
    margin-bottom: var(--spacing-xs);
    white-space: pre-wrap;
    text-shadow: 0 0 3px currentColor;
    font-weight: var(--font-weight-ultralight);
    letter-spacing: 0.02em;
  }

  .terminal-line.log-line {
    animation: fadeIn var(--transition-base);
  }

  .prompt {
    color: var(--color-terminal-blue);
    font-weight: var(--font-weight-light);
  }

  .cursor {
    display: inline-block;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
