export interface LogLine {
  id: number
  text: string
  type: LogType
  delay: number
}

export type LogType = "command" | "info" | "success" | "error" | "log" | "warning" | "system" | "vim"

export interface TerminalState {
  displayedLines: LogLine[]
  currentIndex: number
  isTyping: boolean
  currentText: string
  mode: "terminal" | "vim"
}

export interface VimMode {
  type: "closed" | "normal" | "insert" | "visual" | "command"
}

export interface VimState {
  mode: VimMode["type"]
  filename: string
  content: string[]
  cursorRow: number
  cursorCol: number
  viewportStart: number
  savedContent: string[]
  commandBuffer: string
  visualStart?: { row: number; col: number }
  visualEnd?: { row: number; col: number }
  yankBuffer: string[]
  lastCommand: string
  marks: { [key: string]: { row: number; col: number } }
  showLineNumbers: boolean
}

export interface TypingOptions {
  minDelay: number
  maxDelay: number
  spaceDelay: number
  callback?: () => void
}

export interface TerminalConfig {
  visibleLines: number
  scrollBehavior: "smooth" | "auto"
  perspective: {
    rotationX: number
    rotationY: number
    rotationZ: number
  }
}

export interface VimCommand {
  key: string
  action: (state: VimState) => Partial<VimState>
  modes: VimMode["type"][]
}

export interface AnimationQueueItem {
  type: "line" | "command" | "vim-key" | "delay"
  data: LogLine | { text: string; currentText?: string } | { key: string; delay?: number } | number
  duration?: number
}
