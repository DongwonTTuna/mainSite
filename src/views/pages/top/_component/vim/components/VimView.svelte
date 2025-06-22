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
  let isInInsertMode = false

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

    // Reset index
    currentTypeIndex = 0
    isInInsertMode = false

    const typeNextChar = () => {
      if (currentTypeIndex >= typeSequence.length || !view) {
        stopAutoTyping()
        return
      }

      const char = typeSequence[currentTypeIndex]

      // Handle special commands
      if (char === "INSERT_MODE") {
        // Press 'i' to enter insert mode
        console.log("Entering insert mode")
        const event = new KeyboardEvent("keydown", {
          key: "i",
          code: "KeyI",
          bubbles: true,
          cancelable: true
        })
        view.contentDOM.dispatchEvent(event)
        isInInsertMode = true

        // Give VIM time to process the mode change
        currentTypeIndex++
        typeInterval = window.setTimeout(typeNextChar, 50)
        return
      } else if (char === "ESCAPE") {
        // Press ESC to exit insert mode
        const event = new KeyboardEvent("keydown", {
          key: "Escape",
          code: "Escape",
          bubbles: true,
          cancelable: true
        })
        view.contentDOM.dispatchEvent(event)
        isInInsertMode = false
      } else if (char === "COMMAND_MODE") {
        // Press ':' to enter command mode
        const event = new KeyboardEvent("keydown", {
          key: ":",
          code: "Semicolon",
          shiftKey: true,
          bubbles: true,
          cancelable: true
        })
        view.contentDOM.dispatchEvent(event)
      } else if (char === "SAVE_QUIT") {
        // Type 'wq' and press Enter
        const input = view.dom.querySelector(".cm-vim-panel input") as HTMLInputElement
        if (input) {
          input.value = ":wq"
          input.dispatchEvent(new Event("input", { bubbles: true }))

          setTimeout(() => {
            const enterEvent = new KeyboardEvent("keydown", {
              key: "Enter",
              code: "Enter",
              bubbles: true,
              cancelable: true
            })
            input.dispatchEvent(enterEvent)
          }, 100)
        }
      } else if (char === "NEWLINE") {
        // Insert newline using Enter key
        console.log("Inserting newline")
        const enterEvent = new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true
        })

        const handled = !view.contentDOM.dispatchEvent(enterEvent)

        // If not handled, insert directly
        if (!handled && isInInsertMode) {
          const cursor = view.state.selection.main.head
          view.dispatch({
            changes: {
              from: cursor,
              insert: "\n"
            },
            selection: { anchor: cursor + 1 }
          })
        }
      } else {
        // Regular character - type it using beforeinput event
        console.log(`Typing '${char}'`)

        // Create a proper beforeinput event which VIM mode will handle
        const beforeInputEvent = new InputEvent("beforeinput", {
          data: char,
          inputType: "insertText",
          bubbles: true,
          cancelable: true,
          composed: true
        })

        // Dispatch the event on the contentDOM
        const handled = !view.contentDOM.dispatchEvent(beforeInputEvent)

        // If VIM didn't handle it, insert directly
        if (!handled && isInInsertMode) {
          const cursor = view.state.selection.main.head
          view.dispatch({
            changes: {
              from: cursor,
              insert: char
            },
            selection: { anchor: cursor + 1 }
          })
        }
      }

      currentTypeIndex++

      // Determine delay
      let delay = 50
      if (char === "INSERT_MODE" || char === "ESCAPE") delay = 50
      else if (char === "COMMAND_MODE") delay = 200
      else if (char === "SAVE_QUIT") delay = 500
      else if (char === "NEWLINE") delay = 150
      else if (char === " " || char === "." || char === ",") delay = 80
      else delay = 40 // Slightly slower for better visibility

      typeInterval = window.setTimeout(typeNextChar, delay)
    }

    // Start typing after initial delay
    typeInterval = window.setTimeout(typeNextChar, 500)
  }

  function stopAutoTyping() {
    if (typeInterval) {
      clearTimeout(typeInterval)
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

    // Listen for VIM exit commands
    view.dom.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        // Check command line for exit commands
        setTimeout(() => {
          const panels = view?.dom.querySelectorAll(".cm-vim-panel") || []
          panels.forEach((panel) => {
            const input = panel.querySelector("input") as HTMLInputElement
            if (input && input.value) {
              const cmd = input.value.trim()
              if (cmd === ":q" || cmd === ":q!" || cmd === ":wq" || cmd === ":x") {
                setTimeout(() => onExit(), 100)
              }
            }
          })
        }, 50)
      }
    })

    view.focus()

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

  export function typeContent(sequence: string[]) {
    if (!view) {
      console.warn("VimView: Editor not ready")
      return
    }

    console.log("Starting VIM typing with sequence:", sequence)
    typeSequence = sequence
    currentTypeIndex = 0
    autoType = true
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
