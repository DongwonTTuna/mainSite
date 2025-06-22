<script lang="ts">
  import { onMount } from "svelte"
  import { javascript } from "@codemirror/lang-javascript"
  import { vim } from "@replit/codemirror-vim"
  import { EditorView } from "@codemirror/view"

  export let content: string = ""
  export let showLineNumbers: boolean = false
  export let onExit: () => void = () => {}

  let editorView: EditorView | undefined
  let CodeMirror: typeof import("svelte-codemirror-editor").default | undefined

  // Custom terminal-like theme
  const terminalTheme = EditorView.theme({
    "&": {
      fontSize: "var(--font-size-sm)",
      fontFamily: "var(--font-family-mono), monospace",
      height: "100%",
      backgroundColor: "transparent"
    },
    ".cm-content": {
      padding: "0",
      fontWeight: "var(--font-weight-ultralight)",
      color: "var(--color-terminal-text)",
      caretColor: "var(--color-terminal-blue)"
    },
    ".cm-cursor": {
      borderLeftColor: "var(--color-terminal-blue)",
      borderLeftWidth: "2px"
    },
    ".cm-cursor-primary": {
      borderLeftColor: "var(--color-terminal-blue)"
    },
    ".cm-line": {
      padding: "0",
      letterSpacing: "0.02em",
      textShadow: "0 0 3px currentColor"
    },
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: "var(--color-terminal-yellow)",
      borderRight: "none",
      opacity: "0.6",
      fontWeight: "var(--font-weight-ultralight)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent"
    },
    ".cm-vim-panel": {
      padding: "0 var(--spacing-xl)",
      backgroundColor: "transparent",
      color: "var(--color-terminal-blue)",
      fontSize: "var(--font-size-sm)",
      fontFamily: "var(--font-family-mono), monospace",
      position: "absolute",
      bottom: "30px",
      left: "0",
      right: "0"
    },
    ".cm-vim-panel input": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      color: "var(--color-terminal-blue)",
      fontFamily: "inherit",
      fontSize: "inherit",
      width: "100%"
    },
    "&.cm-focused": {
      outline: "none"
    },
    ".cm-selectionBackground": {
      backgroundColor: "rgba(251, 146, 60, 0.3)"
    },
    ".cm-focused .cm-selectionBackground": {
      backgroundColor: "rgba(251, 146, 60, 0.3)"
    }
  })

  // VIM configuration
  const vimExtension = vim({
    status: true
  })

  function handleReady(view: EditorView) {
    editorView = view

    // Set up VIM mode handlers
    if (editorView) {
      // Override VIM exit commands
      const vimCommands = (vim as unknown as { commands: Record<string, (...args: unknown[]) => void> }).commands
      const originalWq = vimCommands.wq
      const originalQ = vimCommands.q

      vimCommands.wq = function (...args: unknown[]) {
        originalWq.apply(this, args)
        setTimeout(() => onExit(), 100)
      }

      vimCommands.q = function (...args: unknown[]) {
        originalQ.apply(this, args)
        setTimeout(() => onExit(), 100)
      }
    }
  }

  onMount(async () => {
    const module = await import("svelte-codemirror-editor")
    CodeMirror = module.default
  })

  // Simulate typing animation
  export function typeContent(lines: string[]) {
    let currentLine = 0
    let currentChar = 0
    let currentContent = ""

    function typeNextChar() {
      if (currentLine >= lines.length) return

      const line = lines[currentLine]
      if (currentChar < line.length) {
        currentContent += line[currentChar]
        content = currentContent
        currentChar++

        const char = line[currentChar - 1]
        const delay = char === " " ? 10 + Math.random() * 20 : 30 + Math.random() * 60

        setTimeout(typeNextChar, delay)
      } else {
        // Move to next line
        currentContent += "\n"
        content = currentContent
        currentLine++
        currentChar = 0

        if (currentLine < lines.length) {
          setTimeout(typeNextChar, 50)
        }
      }
    }

    // Start typing in insert mode
    setTimeout(() => {
      if (editorView) {
        // Enter insert mode
        editorView.dispatch({
          selection: { anchor: 0 }
        })
        editorView.focus()
        // Simulate 'i' key press
        const event = new KeyboardEvent("keydown", { key: "i" })
        editorView.contentDOM.dispatchEvent(event)
      }
      typeNextChar()
    }, 500)
  }
</script>

<div class="codemirror-vim-wrapper">
  {#if CodeMirror}
    <svelte:component
      this={CodeMirror}
      bind:value={content}
      on:ready={(e) => handleReady(e.detail)}
      lang={javascript()}
      theme={terminalTheme}
      extensions={[vimExtension]}
      styles={{
        "&": {
          fontSize: "var(--font-size-sm)",
          height: "100%"
        }
      }}
      {...showLineNumbers ? { lineNumbers: true } : {}}
    />
  {/if}
</div>

<style>
  .codemirror-vim-wrapper {
    height: 100%;
    position: relative;
  }

  :global(.codemirror-wrapper) {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :global(.cm-vim-message) {
    position: absolute;
    bottom: 30px;
    left: var(--spacing-xl);
    color: var(--color-terminal-blue);
    font-family: var(--font-family-mono), monospace;
    font-size: var(--font-size-sm);
  }

  :global(.cm-vim-mode) {
    position: absolute;
    bottom: 0;
    left: var(--spacing-xl);
    color: var(--color-terminal-blue);
    font-weight: var(--font-weight-semibold);
    text-shadow: 0 0 10px rgba(251, 146, 60, 0.5);
  }
</style>
