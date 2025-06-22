import { vimStore } from "../stores/vim.store"
import { get } from "svelte/store"
import type { VimCommand } from "../types/vim.types"

export class VimEngine {
  private commandHistory: string[] = []

  executeCommand(commandString: string): boolean {
    const command = this.parseCommand(commandString)

    switch (command.command) {
      case "w":
      case "write":
        return this.handleSave()

      case "q":
      case "quit":
        return this.handleQuit()

      case "wq":
      case "x":
        return this.handleSaveAndQuit()

      case "q!":
        return this.handleForceQuit()

      case "set":
        return this.handleSet(command.args)

      case "e":
      case "edit":
        return this.handleEdit(command.args?.[0])

      case "help":
        return this.handleHelp()

      case "":
        vimStore.setStatusMessage("")
        return true

      default:
        if (/^\d+$/.test(command.command)) {
          return this.handleLineJump(parseInt(command.command))
        }
        vimStore.setStatusMessage(`E492: Not an editor command: ${commandString}`)
        return false
    }
  }

  private parseCommand(commandString: string): VimCommand {
    const parts = commandString.split(/\s+/)
    const command = parts[0] || ""
    const args = parts.slice(1)

    return { command, args }
  }

  private handleSave(): boolean {
    const state = get(vimStore)
    if (!state.filename) {
      vimStore.setStatusMessage("E32: No file name")
      return false
    }

    vimStore.saveFile()
    return true
  }

  private handleQuit(): boolean {
    const state = get(vimStore)
    if (state.isModified) {
      vimStore.setStatusMessage("E37: No write since last change (add ! to override)")
      return false
    }

    return true
  }

  private handleSaveAndQuit(): boolean {
    if (this.handleSave()) {
      return true
    }
    return false
  }

  private handleForceQuit(): boolean {
    return true
  }

  private handleSet(args?: string[]): boolean {
    if (!args || args.length === 0) {
      vimStore.setStatusMessage("E518: Unknown option")
      return false
    }

    const option = args[0]
    switch (option) {
      case "number":
      case "nu":
        vimStore.setStatusMessage("Line numbers enabled")
        return true

      case "nonumber":
      case "nonu":
        vimStore.setStatusMessage("Line numbers disabled")
        return true

      case "paste":
        vimStore.setStatusMessage("Paste mode enabled")
        return true

      case "nopaste":
        vimStore.setStatusMessage("Paste mode disabled")
        return true

      default:
        vimStore.setStatusMessage(`E518: Unknown option: ${option}`)
        return false
    }
  }

  private handleEdit(filename?: string): boolean {
    if (!filename) {
      vimStore.setStatusMessage("E32: No file name")
      return false
    }

    vimStore.openVim(filename)
    return true
  }

  private handleHelp(): boolean {
    vimStore.setStatusMessage("VIM - Vi IMproved")
    return true
  }

  private handleLineJump(line: number): boolean {
    const state = get(vimStore)
    const lines = state.content.split("\n")
    const maxLine = lines.length

    if (line < 1 || line > maxLine) {
      vimStore.setStatusMessage(`E16: Invalid range`)
      return false
    }

    vimStore.setCursor(line - 1, 0)
    return true
  }

  processNormalModeKey(key: string, ctrlKey: boolean, shiftKey: boolean): void {
    const state = get(vimStore)
    const lines = state.content.split("\n")
    const currentLine = state.cursor.line
    const currentColumn = state.cursor.column

    switch (key) {
      case "i":
        vimStore.setMode("insert")
        break

      case "a":
        vimStore.setMode("insert")
        vimStore.setCursor(currentLine, Math.min(currentColumn + 1, lines[currentLine]?.length || 0))
        break

      case "o": {
        vimStore.setMode("insert")
        const newLines = [...lines]
        newLines.splice(currentLine + 1, 0, "")
        vimStore.setContent(newLines.join("\n"))
        vimStore.setCursor(currentLine + 1, 0)
        break
      }

      case "O": {
        vimStore.setMode("insert")
        const newLinesO = [...lines]
        newLinesO.splice(currentLine, 0, "")
        vimStore.setContent(newLinesO.join("\n"))
        vimStore.setCursor(currentLine, 0)
        break
      }

      case "v":
        vimStore.setMode("visual")
        break

      case "R":
        vimStore.setMode("replace")
        break

      case ":":
        vimStore.setMode("command")
        vimStore.setCommandBuffer("")
        break

      case "h":
      case "ArrowLeft":
        if (currentColumn > 0) {
          vimStore.setCursor(currentLine, currentColumn - 1)
        }
        break

      case "j":
      case "ArrowDown":
        if (currentLine < lines.length - 1) {
          const nextLineLength = lines[currentLine + 1]?.length || 0
          vimStore.setCursor(currentLine + 1, Math.min(currentColumn, nextLineLength))
        }
        break

      case "k":
      case "ArrowUp":
        if (currentLine > 0) {
          const prevLineLength = lines[currentLine - 1]?.length || 0
          vimStore.setCursor(currentLine - 1, Math.min(currentColumn, prevLineLength))
        }
        break

      case "l":
      case "ArrowRight": {
        const lineLength = lines[currentLine]?.length || 0
        if (currentColumn < lineLength - 1) {
          vimStore.setCursor(currentLine, currentColumn + 1)
        }
        break
      }

      case "g":
        if (shiftKey) {
          vimStore.setCursor(lines.length - 1, 0)
        } else {
          vimStore.setCursor(0, 0)
        }
        break

      case "0":
        vimStore.setCursor(currentLine, 0)
        break

      case "$":
        vimStore.setCursor(currentLine, Math.max(0, (lines[currentLine]?.length || 1) - 1))
        break

      case "u":
        vimStore.undo()
        break

      case "r":
        if (ctrlKey) {
          vimStore.redo()
        }
        break

      case "d":
        if (shiftKey) {
          const newLines = [...lines]
          newLines.splice(currentLine, 1)
          if (newLines.length === 0) {
            newLines.push("")
          }
          vimStore.setContent(newLines.join("\n"))
          vimStore.setCursor(Math.min(currentLine, newLines.length - 1), 0)
        }
        break
    }
  }

  processInsertModeKey(key: string): void {
    if (key === "Escape") {
      vimStore.setMode("normal")
      const state = get(vimStore)
      const lines = state.content.split("\n")
      const lineLength = lines[state.cursor.line]?.length || 0
      if (state.cursor.column > 0 && state.cursor.column >= lineLength) {
        vimStore.setCursor(state.cursor.line, Math.max(0, lineLength - 1))
      }
    }
  }

  processCommandModeKey(key: string): boolean {
    const state = get(vimStore)

    if (key === "Escape") {
      vimStore.setMode("normal")
      vimStore.setCommandBuffer("")
      return false
    }

    if (key === "Enter") {
      const shouldExit = this.executeCommand(state.commandBuffer)
      vimStore.setMode("normal")
      vimStore.setCommandBuffer("")
      return shouldExit
    }

    if (key === "Backspace") {
      if (state.commandBuffer.length > 0) {
        vimStore.setCommandBuffer(state.commandBuffer.slice(0, -1))
      } else {
        vimStore.setMode("normal")
      }
      return false
    }

    if (key.length === 1) {
      vimStore.setCommandBuffer(state.commandBuffer + key)
    }

    return false
  }
}
