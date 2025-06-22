import { writable, derived } from "svelte/store"
import type { VimState } from "../types/terminal.types"
import { VimEngine } from "../services/vim-engine"

function createVimStore() {
  const engine = new VimEngine()

  const initialState: VimState = {
    mode: "closed",
    filename: "",
    content: [],
    cursorRow: 0,
    cursorCol: 0,
    viewportStart: 0,
    savedContent: [],
    commandBuffer: "",
    yankBuffer: [],
    lastCommand: "",
    marks: {},
    showLineNumbers: false
  }

  const { subscribe, set, update } = writable<VimState>(initialState)

  return {
    subscribe,

    open(filename: string) {
      update(() => ({
        ...initialState,
        mode: "normal",
        filename,
        content: [], // Start with empty content
        showLineNumbers: filename.includes("jwt.strategy.ts")
      }))
    },

    close() {
      set(initialState)
    },

    executeCommand(key: string) {
      update((state) => {
        const changes = engine.executeCommand(key, state)
        return changes ? { ...state, ...changes } : state
      })
    },

    processInsertKey(key: string) {
      update((state) => {
        const changes = engine.processInsertModeKey(key, state)
        return { ...state, ...changes }
      })
    },

    processCommandKey(key: string) {
      update((state) => {
        const changes = engine.processCommandModeKey(key, state)
        return { ...state, ...changes }
      })
    },

    updateViewport(visibleLines: number) {
      update((state) => ({
        ...state,
        viewportStart: engine.updateViewport(state, visibleLines)
      }))
    },

    setMode(mode: VimState["mode"]) {
      update((state) => ({
        ...state,
        mode
      }))
    },

    setContent(content: string[]) {
      update((state) => ({
        ...state,
        content
      }))
    },

    addLine(text: string, row?: number) {
      update((state) => {
        const newContent = [...state.content]
        const insertRow = row ?? state.cursorRow + 1
        newContent.splice(insertRow, 0, text)
        return {
          ...state,
          content: newContent
        }
      })
    },

    updateLine(row: number, text: string) {
      update((state) => {
        const newContent = [...state.content]
        if (row < newContent.length) {
          newContent[row] = text
        }
        return {
          ...state,
          content: newContent
        }
      })
    },

    setCursor(row: number, col: number) {
      update((state) => ({
        ...state,
        cursorRow: Math.max(0, Math.min(row, state.content.length - 1)),
        cursorCol: Math.max(0, col)
      }))
    }
  }
}

export const vimStore = createVimStore()

// Derived stores
export const vimStatusLine = derived(vimStore, ($vim) => {
  if ($vim.mode === "closed") return null

  const modified = $vim.content.join("\n") !== $vim.savedContent.join("\n")
  const filename = $vim.filename + (modified ? " [+]" : "")
  const position = `${$vim.cursorRow + 1},${$vim.cursorCol + 1}`

  let modeText = ""
  switch ($vim.mode) {
    case "insert":
      modeText = "-- INSERT --"
      break
    case "visual":
      modeText = "-- VISUAL --"
      break
    case "command":
      modeText = $vim.commandBuffer
      break
    default:
      modeText = ""
  }

  return {
    mode: modeText,
    filename,
    position
  }
})

export const vimLines = derived(vimStore, ($vim) => {
  if ($vim.mode === "closed") return []

  const visibleLines = 18 // This should come from config
  const lines = []

  // If no content yet, show cursor on first line
  if ($vim.content.length === 0 && $vim.mode === "insert") {
    lines.push({
      number: 1,
      content: "",
      isCursor: true,
      cursorCol: 0
    })
    // Fill rest with tildes
    for (let i = 1; i < visibleLines; i++) {
      lines.push({
        number: -1,
        content: "~",
        isCursor: false,
        cursorCol: 0
      })
    }
  } else {
    // Normal content display
    for (let i = 0; i < visibleLines; i++) {
      const lineIndex = $vim.viewportStart + i

      if (lineIndex < $vim.content.length) {
        lines.push({
          number: lineIndex + 1,
          content: $vim.content[lineIndex],
          isCursor: lineIndex === $vim.cursorRow,
          cursorCol: $vim.cursorCol
        })
      } else {
        lines.push({
          number: -1,
          content: "~",
          isCursor: false,
          cursorCol: 0
        })
      }
    }
  }

  return lines
})
