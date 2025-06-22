export type VimMode = "normal" | "insert" | "visual" | "command" | "replace"

export interface VimState {
  mode: VimMode
  filename: string
  content: string
  cursor: {
    line: number
    column: number
  }
  savedContent: string
  isModified: boolean
  statusMessage: string
  commandBuffer: string
  searchTerm: string
  history: {
    undo: string[]
    redo: string[]
  }
}

export interface VimCommand {
  command: string
  args?: string[]
  range?: {
    start: number
    end: number
  }
}

export interface VimKeySequence {
  key: string
  mode: VimMode
  delay: number
}

export interface VimFileInfo {
  filename: string
  content: string
  readOnly: boolean
  fileType: string
}
