import type { VimState, VimCommand } from "../types/terminal.types"

export class VimEngine {
  private commands: Map<string, VimCommand> = new Map()

  constructor() {
    this.registerDefaultCommands()
  }

  private registerDefaultCommands() {
    // Normal mode commands
    this.registerCommand({
      key: "i",
      modes: ["normal"],
      action: (state) => ({
        mode: "insert",
        savedContent: [...state.content]
      })
    })

    this.registerCommand({
      key: "a",
      modes: ["normal"],
      action: (state) => ({
        mode: "insert",
        cursorCol: Math.min(state.cursorCol + 1, state.content[state.cursorRow]?.length || 0),
        savedContent: [...state.content]
      })
    })

    this.registerCommand({
      key: "o",
      modes: ["normal"],
      action: (state) => {
        const newContent = [...state.content]
        newContent.splice(state.cursorRow + 1, 0, "")
        return {
          mode: "insert",
          content: newContent,
          cursorRow: state.cursorRow + 1,
          cursorCol: 0,
          savedContent: [...state.content]
        }
      }
    })

    this.registerCommand({
      key: "dd",
      modes: ["normal"],
      action: (state) => {
        const newContent = [...state.content]
        const deletedLine = newContent.splice(state.cursorRow, 1)
        return {
          content: newContent.length > 0 ? newContent : [""],
          cursorRow: Math.min(state.cursorRow, newContent.length - 1),
          cursorCol: 0,
          yankBuffer: deletedLine
        }
      }
    })

    this.registerCommand({
      key: "yy",
      modes: ["normal"],
      action: (state) => ({
        yankBuffer: [state.content[state.cursorRow] || ""]
      })
    })

    this.registerCommand({
      key: "p",
      modes: ["normal"],
      action: (state) => {
        if (state.yankBuffer.length === 0) return {}
        const newContent = [...state.content]
        newContent.splice(state.cursorRow + 1, 0, ...state.yankBuffer)
        return {
          content: newContent,
          cursorRow: state.cursorRow + 1
        }
      }
    })

    // Movement commands
    this.registerCommand({
      key: "h",
      modes: ["normal", "visual"],
      action: (state) => ({
        cursorCol: Math.max(0, state.cursorCol - 1)
      })
    })

    this.registerCommand({
      key: "j",
      modes: ["normal", "visual"],
      action: (state) => ({
        cursorRow: Math.min(state.content.length - 1, state.cursorRow + 1),
        cursorCol: Math.min(
          state.cursorCol,
          state.content[Math.min(state.content.length - 1, state.cursorRow + 1)]?.length || 0
        )
      })
    })

    this.registerCommand({
      key: "k",
      modes: ["normal", "visual"],
      action: (state) => ({
        cursorRow: Math.max(0, state.cursorRow - 1),
        cursorCol: Math.min(state.cursorCol, state.content[Math.max(0, state.cursorRow - 1)]?.length || 0)
      })
    })

    this.registerCommand({
      key: "l",
      modes: ["normal", "visual"],
      action: (state) => ({
        cursorCol: Math.min(state.content[state.cursorRow]?.length || 0, state.cursorCol + 1)
      })
    })

    // Visual mode
    this.registerCommand({
      key: "v",
      modes: ["normal"],
      action: (state) => ({
        mode: "visual",
        visualStart: { row: state.cursorRow, col: state.cursorCol },
        visualEnd: { row: state.cursorRow, col: state.cursorCol }
      })
    })

    // Command mode
    this.registerCommand({
      key: ":",
      modes: ["normal"],
      action: () => ({
        mode: "command",
        commandBuffer: ":"
      })
    })
  }

  registerCommand(command: VimCommand): void {
    this.commands.set(command.key, command)
  }

  executeCommand(key: string, state: VimState): Partial<VimState> | null {
    const command = this.commands.get(key)
    if (!command || !command.modes.includes(state.mode)) {
      return null
    }
    return command.action(state)
  }

  processInsertModeKey(key: string, state: VimState): Partial<VimState> {
    if (key === "Escape") {
      return {
        mode: "normal",
        savedContent: [...state.content]
      }
    }

    // Handle regular character input
    const newContent = [...state.content]

    // If content is empty, add first line
    if (newContent.length === 0) {
      newContent.push("")
    }

    const currentLine = newContent[state.cursorRow] || ""

    if (key === "Enter") {
      const beforeCursor = currentLine.substring(0, state.cursorCol)
      const afterCursor = currentLine.substring(state.cursorCol)
      newContent[state.cursorRow] = beforeCursor
      newContent.splice(state.cursorRow + 1, 0, afterCursor)

      return {
        content: newContent,
        cursorRow: state.cursorRow + 1,
        cursorCol: 0
      }
    }

    if (key === "Backspace") {
      if (state.cursorCol > 0) {
        newContent[state.cursorRow] =
          currentLine.substring(0, state.cursorCol - 1) + currentLine.substring(state.cursorCol)
        return {
          content: newContent,
          cursorCol: state.cursorCol - 1
        }
      }
      return {}
    }

    // Regular character
    newContent[state.cursorRow] =
      currentLine.substring(0, state.cursorCol) + key + currentLine.substring(state.cursorCol)

    return {
      content: newContent,
      cursorCol: state.cursorCol + key.length
    }
  }

  processCommandModeKey(key: string, state: VimState): Partial<VimState> {
    if (key === "Escape") {
      return {
        mode: "normal",
        commandBuffer: ""
      }
    }

    if (key === "Enter") {
      // Execute command
      const command = state.commandBuffer.substring(1) // Remove ':'
      return this.executeVimCommand(command)
    }

    if (key === "Backspace") {
      if (state.commandBuffer.length > 1) {
        return {
          commandBuffer: state.commandBuffer.slice(0, -1)
        }
      }
      return {
        mode: "normal",
        commandBuffer: ""
      }
    }

    // Add character to command buffer
    return {
      commandBuffer: state.commandBuffer + key
    }
  }

  private executeVimCommand(command: string): Partial<VimState> {
    // Handle common vim commands
    switch (command) {
      case "w":
      case "wq":
      case "q":
      case "q!":
        return {
          mode: "closed",
          commandBuffer: ""
        }

      case "set number":
        return {
          mode: "normal",
          commandBuffer: "",
          showLineNumbers: true
        }

      case "set nonumber":
        return {
          mode: "normal",
          commandBuffer: "",
          showLineNumbers: false
        }

      default:
        // Unknown command, just return to normal mode
        return {
          mode: "normal",
          commandBuffer: ""
        }
    }
  }

  updateViewport(state: VimState, visibleLines: number): number {
    if (state.cursorRow < state.viewportStart) {
      return state.cursorRow
    } else if (state.cursorRow >= state.viewportStart + visibleLines) {
      return state.cursorRow - visibleLines + 1
    }
    return state.viewportStart
  }
}
