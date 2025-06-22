<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { EditorView, keymap, ViewUpdate } from "@codemirror/view"
  import { EditorState, Compartment } from "@codemirror/state"
  import { vim } from "@replit/codemirror-vim"
  import { oneDark } from "@codemirror/theme-one-dark"
  import { javascript } from "@codemirror/lang-javascript"
  import { vimStore, vimContent } from "../stores/vim.store"

  export let onExit: () => void
  export let autoType: boolean = false
  export let typeSequence: string[] = []

  let container: HTMLDivElement
  let view: EditorView | null = null
  let vimModeCompartment = new Compartment()
  let currentTypeIndex = 0
  let typeInterval: number | null = null

  const customTheme = EditorView.theme({
    "&": {
      backgroundColor: "transparent",
      color: "var(--color-text-primary)",
      fontSize: "var(--font-size-base)",
      fontFamily: "var(--font-family-mono)",
      height: "100%"
    },
    ".cm-content": {
      padding: "var(--spacing-base)",
      caretColor: "var(--color-accent)",
      fontFamily: "var(--font-family-mono)",
      minHeight: "100%"
    },
    ".cm-focused": {
      outline: "none"
    },
    ".cm-line": {
      padding: "0",
      lineHeight: "var(--line-height-normal)"
    },
    ".cm-cursor": {
      borderLeftWidth: "2px",
      borderLeftColor: "var(--color-accent)",
      backgroundColor: "var(--color-accent)",
      opacity: "0.8"
    },
    ".cm-selectionBackground": {
      backgroundColor: "rgba(255, 203, 107, 0.3)"
    },
    ".cm-vim-panel": {
      backgroundColor: "rgba(0, 0, 17, 0.9)",
      borderTop: "1px solid var(--color-border)",
      color: "var(--color-text-primary)",
      padding: "4px 8px",
      fontFamily: "var(--font-family-mono)",
      fontSize: "var(--font-size-sm)",
      position: "absolute",
      bottom: "28px",
      left: 0,
      right: 0
    },
    ".cm-vim-panel input": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      color: "var(--color-text-primary)",
      fontFamily: "var(--font-family-mono)",
      fontSize: "var(--font-size-sm)",
      width: "100%"
    },
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: "var(--color-text-secondary)",
      border: "none",
      paddingRight: "var(--spacing-sm)"
    },
    ".cm-lineNumbers": {
      minWidth: "3em"
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent",
      color: "var(--color-accent)"
    }
  })

  function createEditorState(content: string) {
    return EditorState.create({
      doc: content,
      extensions: [
        vimModeCompartment.of(
          vim({
            status: true
          })
        ),
        keymap.of([
          {
            key: "Mod-s",
            run: () => {
              vimStore.saveFile()
              return true
            }
          }
        ]),
        oneDark,
        customTheme,
        javascript(),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            vimStore.setContent(update.state.doc.toString())
          }
        })
      ]
    })
  }

  function startAutoTyping() {
    if (!autoType || typeSequence.length === 0 || !view) return

    typeInterval = window.setInterval(() => {
      if (currentTypeIndex >= typeSequence.length) {
        stopAutoTyping()
        return
      }

      const char = typeSequence[currentTypeIndex]

      if (char === "\n") {
        view?.dispatch({
          changes: { from: view.state.selection.main.head, insert: "\n" }
        })
      } else if (char === ":") {
        // Enter command mode by simulating key press
        const event = new KeyboardEvent("keydown", { key: ":", code: "Colon" })
        view?.contentDOM.dispatchEvent(event)
      } else if (char === "\u001b") {
        // ESC key to exit insert mode
        const event = new KeyboardEvent("keydown", { key: "Escape", code: "Escape" })
        view?.contentDOM.dispatchEvent(event)
      } else {
        view?.dispatch({
          changes: { from: view.state.selection.main.head, insert: char }
        })
      }

      currentTypeIndex++
    }, 100)
  }

  function stopAutoTyping() {
    if (typeInterval) {
      clearInterval(typeInterval)
      typeInterval = null
    }
  }

  onMount(() => {
    if (!container) return

    const initialContent = $vimContent || ""
    const state = createEditorState(initialContent)

    view = new EditorView({
      state,
      parent: container
    })

    // Handle exit commands through DOM events
    view.dom.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" && view) {
        // Check if we're in command mode and have a command
        const commandLine = view.dom.querySelector(".cm-vim-panel input") as HTMLInputElement
        if (commandLine && commandLine.value) {
          const command = commandLine.value
          if (command === ":q" || command === ":q!" || command === ":wq" || command === ":x") {
            setTimeout(() => onExit(), 100)
          }
        }
      }
    })

    view.focus()

    if (autoType) {
      setTimeout(() => startAutoTyping(), 500)
    }

    const unsubscribe = vimContent.subscribe((content) => {
      if (view && view.state.doc.toString() !== content) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: content }
        })
      }
    })

    return () => {
      unsubscribe()
    }
  })

  onDestroy(() => {
    stopAutoTyping()
    view?.destroy()
  })

  export function typeContent(lines: string[]) {
    typeSequence = lines.join("\n").split("")
    currentTypeIndex = 0
    startAutoTyping()
  }
</script>

<div class="vim-editor" bind:this={container}></div>

<style>
  .vim-editor {
    width: 100%;
    height: 100%;
    background-color: transparent;
    overflow: auto;
    font-family: var(--font-family-mono);
  }

  .vim-editor :global(.cm-editor) {
    height: 100%;
  }

  .vim-editor :global(.cm-scroller) {
    overflow: auto;
  }

  .vim-editor :global(.cm-vim-panel) {
    position: fixed !important;
    bottom: auto !important;
    top: auto !important;
    margin-top: -1px;
  }
</style>
