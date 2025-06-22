import { writable, derived } from "svelte/store"
import type { VimState, VimMode } from "../types/vim.types"

const initialState: VimState = {
  mode: "normal",
  filename: "",
  content: "",
  cursor: { line: 0, column: 0 },
  savedContent: "",
  isModified: false,
  statusMessage: "",
  commandBuffer: "",
  searchTerm: "",
  history: { undo: [], redo: [] }
}

function createVimStore() {
  const { subscribe, set, update } = writable<VimState>(initialState)

  return {
    subscribe,

    openVim(filename: string, content = "") {
      update((state) => ({
        ...state,
        filename,
        content,
        savedContent: content,
        isModified: false,
        mode: "normal",
        cursor: { line: 0, column: 0 },
        statusMessage: `"${filename}" ${content ? "[New File]" : ""}`,
        commandBuffer: "",
        history: { undo: [], redo: [] }
      }))
    },

    closeVim() {
      set(initialState)
    },

    setMode(mode: VimMode) {
      update((state) => {
        let statusMessage = state.statusMessage
        if (mode === "insert") {
          statusMessage = "-- INSERT --"
        } else if (mode === "visual") {
          statusMessage = "-- VISUAL --"
        } else if (mode === "replace") {
          statusMessage = "-- REPLACE --"
        } else if (mode === "command") {
          statusMessage = ":"
        } else {
          statusMessage = ""
        }

        return { ...state, mode, statusMessage }
      })
    },

    setContent(content: string) {
      update((state) => ({
        ...state,
        content,
        isModified: content !== state.savedContent
      }))
    },

    setCursor(line: number, column: number) {
      update((state) => ({
        ...state,
        cursor: { line, column }
      }))
    },

    setCommandBuffer(buffer: string) {
      update((state) => ({
        ...state,
        commandBuffer: buffer,
        statusMessage: state.mode === "command" ? `:${buffer}` : state.statusMessage
      }))
    },

    setStatusMessage(message: string) {
      update((state) => ({
        ...state,
        statusMessage: message
      }))
    },

    saveFile() {
      update((state) => ({
        ...state,
        savedContent: state.content,
        isModified: false,
        statusMessage: `"${state.filename}" written`
      }))
    },

    addToHistory(content: string) {
      update((state) => ({
        ...state,
        history: {
          undo: [...state.history.undo, content],
          redo: []
        }
      }))
    },

    undo() {
      update((state) => {
        if (state.history.undo.length === 0) return state

        const previousContent = state.history.undo[state.history.undo.length - 1]
        const newUndo = state.history.undo.slice(0, -1)

        return {
          ...state,
          content: previousContent,
          history: {
            undo: newUndo,
            redo: [state.content, ...state.history.redo]
          },
          isModified: previousContent !== state.savedContent
        }
      })
    },

    redo() {
      update((state) => {
        if (state.history.redo.length === 0) return state

        const nextContent = state.history.redo[0]
        const newRedo = state.history.redo.slice(1)

        return {
          ...state,
          content: nextContent,
          history: {
            undo: [...state.history.undo, state.content],
            redo: newRedo
          },
          isModified: nextContent !== state.savedContent
        }
      })
    }
  }
}

export const vimStore = createVimStore()

export const vimMode = derived(vimStore, ($vim) => $vim.mode)
export const vimContent = derived(vimStore, ($vim) => $vim.content)
export const vimCursor = derived(vimStore, ($vim) => $vim.cursor)
export const vimStatusMessage = derived(vimStore, ($vim) => $vim.statusMessage)
export const vimIsModified = derived(vimStore, ($vim) => $vim.isModified)
