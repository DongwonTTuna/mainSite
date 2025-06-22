export type VimMode = "normal" | "insert" | "visual" | "command" | "closed"

export interface VimState {
  mode: VimMode
  filename: string
  content: string[]
  cursorRow: number
  cursorCol: number
  viewportStart: number
  savedContent: string[]
  commandBuffer: string
  yankBuffer: string[]
  lastCommand: string
  marks: Record<string, { row: number; col: number }>
  showLineNumbers: boolean
  visualStart?: { row: number; col: number }
  visualEnd?: { row: number; col: number }
}

export interface VimStatusLine {
  mode: string
  filename: string
  position: string
}

export interface VimCommand {
  key: string
  action: (state: VimState) => Partial<VimState>
  modes: VimMode[]
}
