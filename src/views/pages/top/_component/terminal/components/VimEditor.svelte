<script lang="ts">
  import { vimStore, vimLines } from '../stores/vim.store'
  
  function getLineColor(type: string) {
    switch(type) {
      case 'vim': return 'var(--color-terminal-text)'
      default: return 'var(--color-terminal-text)'
    }
  }
  
  function renderLine(line: any, showLineNumbers: boolean) {
    let displayLine = line.content
    let linePrefix = ''
    
    if (showLineNumbers && line.number > 0) {
      linePrefix = `<span class="vim-line-number">${String(line.number).padStart(3, ' ')}</span> `
    }
    
    if (line.isCursor) {
      const beforeCursor = displayLine.substring(0, line.cursorCol)
      const cursorChar = displayLine[line.cursorCol] || ' '
      const afterCursor = displayLine.substring(line.cursorCol + 1)
      
      if ($vimStore.mode === 'insert') {
        displayLine = beforeCursor + '█' + afterCursor
      } else if ($vimStore.mode === 'normal' || $vimStore.mode === 'visual') {
        displayLine = beforeCursor + `<span class="vim-cursor-block">${cursorChar}</span>` + afterCursor
      }
    }
    
    return linePrefix + displayLine
  }
</script>

<div class="vim-editor">
  {#each $vimLines as line}
    <div 
      class="vim-line {line.content === '~' ? 'vim-tilde' : ''}"
      style="color: {line.content === '~' ? 'var(--color-accent)' : getLineColor('vim')}"
    >
      {@html renderLine(line, $vimStore.showLineNumbers)}
    </div>
  {/each}
  
  {#if $vimStore.mode === 'command' && $vimStore.commandBuffer}
    <div class="vim-command-line">
      {$vimStore.commandBuffer}<span class="cursor">_</span>
    </div>
  {/if}
</div>

<style>
  .vim-editor {
    position: relative;
    height: 100%;
  }
  
  .vim-line {
    margin-bottom: var(--spacing-xs);
    white-space: pre-wrap;
    text-shadow: 0 0 3px currentColor;
    font-weight: var(--font-weight-ultralight);
    letter-spacing: 0.02em;
  }
  
  .vim-line.vim-tilde {
    opacity: 0.8;
  }
  
  .vim-line :global(.vim-cursor-block) {
    background: var(--color-terminal-blue);
    color: var(--color-terminal-bg);
    font-weight: var(--font-weight-semibold);
  }
  
  .vim-line :global(.vim-line-number) {
    color: var(--color-terminal-yellow);
    opacity: 0.6;
    margin-right: var(--spacing-sm);
  }
  
  .vim-command-line {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    padding: 0 var(--spacing-xl);
    font-family: var(--font-family-mono), monospace;
    font-size: var(--font-size-sm);
    color: var(--color-terminal-blue);
  }
  
  .cursor {
    display: inline-block;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
</style>