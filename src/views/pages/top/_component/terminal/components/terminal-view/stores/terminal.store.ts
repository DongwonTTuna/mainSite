import { writable, derived } from "svelte/store"
import type { LogLine, TerminalConfig } from "../types/terminal.types"

interface TerminalState {
  displayedLines: LogLine[]
  currentIndex: number
  isTyping: boolean
  currentText: string
  mode: "terminal" | "vim"
  lastCommand?: string
  animationIndex: number
  isAnimating: boolean
}

function createTerminalStore() {
  const initialState: TerminalState = {
    displayedLines: [],
    currentIndex: 0,
    isTyping: false,
    currentText: "",
    mode: "terminal",
    lastCommand: undefined,
    animationIndex: 0,
    isAnimating: false
  }

  const { subscribe, set, update } = writable<TerminalState>(initialState)

  return {
    subscribe,

    addLine(line: LogLine) {
      update((state) => ({
        ...state,
        displayedLines: [...state.displayedLines, line]
      }))
    },

    updateTyping(isTyping: boolean, currentText: string = "") {
      update((state) => ({
        ...state,
        isTyping,
        currentText
      }))
    },

    setMode(mode: "terminal" | "vim") {
      update((state) => ({
        ...state,
        mode
      }))
    },

    clearLines() {
      update((state) => ({
        ...state,
        displayedLines: []
      }))
    },

    trimLines(maxLines: number) {
      update((state) => ({
        ...state,
        displayedLines:
          state.displayedLines.length > maxLines ? state.displayedLines.slice(-maxLines) : state.displayedLines
      }))
    },

    reset() {
      set(initialState)
    },

    executeCommand(command: string) {
      const trimmedCommand = command.trim()
      const commandLine: LogLine = {
        id: Date.now(),
        text: trimmedCommand,
        type: "command",
        delay: 0
      }
      update((state) => ({
        ...state,
        displayedLines: [...state.displayedLines, commandLine],
        lastCommand: trimmedCommand
      }))

      return trimmedCommand
    },

    setAnimationIndex(index: number) {
      update((state) => ({ ...state, animationIndex: index }))
    },

    resumeAnimation() {
      update((state) => ({ ...state, isAnimating: true }))
    },

    completeAnimation() {
      update((state) => ({ ...state, isAnimating: false }))
    }
  }
}

function createTerminalConfig() {
  const initialConfig: TerminalConfig = {
    visibleLines: 18,
    scrollBehavior: "smooth",
    perspective: {
      rotationX: -15,
      rotationY: 20,
      rotationZ: 0
    }
  }

  const { subscribe, update } = writable<TerminalConfig>(initialConfig)

  return {
    subscribe,

    updatePerspective(perspective: Partial<TerminalConfig["perspective"]>) {
      update((config) => ({
        ...config,
        perspective: {
          ...config.perspective,
          ...perspective
        }
      }))
    },

    setVisibleLines(lines: number) {
      update((config) => ({
        ...config,
        visibleLines: lines
      }))
    }
  }
}

export const terminalStore = createTerminalStore()
export const terminalConfig = createTerminalConfig()

// Derived store for current displayed text
export const currentCommand = derived(terminalStore, ($terminal) => ($terminal.isTyping ? $terminal.currentText : ""))

// Derived store for terminal transform style
export const terminalTransform = derived(terminalConfig, ($config) => {
  const { rotationX, rotationY, rotationZ } = $config.perspective
  return `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`
})
