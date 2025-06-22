import type { LogLine, AnimationQueueItem } from "../types/terminal.types"
import { TypingAnimator } from "./typing-animator"

export class CommandExecutor {
  private queue: AnimationQueueItem[] = []
  private isExecuting = false
  private typingAnimator: TypingAnimator
  private onUpdate: (item: AnimationQueueItem) => void
  private onComplete: () => void

  constructor(onUpdate: (item: AnimationQueueItem) => void, onComplete: () => void) {
    this.typingAnimator = new TypingAnimator()
    this.onUpdate = onUpdate
    this.onComplete = onComplete
  }

  addToQueue(item: AnimationQueueItem): void {
    this.queue.push(item)
    if (!this.isExecuting) {
      this.executeNext()
    }
  }

  addSequence(lines: LogLine[]): void {
    lines.forEach((line) => {
      this.addToQueue({
        type: "line",
        data: line,
        duration: line.delay
      })
    })
  }

  private async executeNext(): Promise<void> {
    if (this.queue.length === 0) {
      this.isExecuting = false
      this.onComplete()
      return
    }

    this.isExecuting = true
    const item = this.queue.shift()!

    switch (item.type) {
      case "line":
        await this.executeLine(item.data as LogLine)
        break

      case "command":
        await this.executeCommand(item.data)
        break

      case "vim-key":
        await this.executeVimKey(item.data)
        break

      case "delay":
        await this.delay(item.duration || 100)
        break
    }

    // Execute next item
    this.executeNext()
  }

  private async executeLine(line: LogLine): Promise<void> {
    // Wait for initial delay
    if (line.delay > 0) {
      await this.delay(line.delay)
    }

    // Handle different line types
    if (line.type === "command") {
      // Type command with animation
      await this.typingAnimator.animate(line.text, (currentText) => {
        this.onUpdate({
          type: "command",
          data: { ...line, currentText }
        })
      })
    } else {
      // Display line immediately
      this.onUpdate({
        type: "line",
        data: line
      })
    }
  }

  private async executeCommand(data: AnimationQueueItem["data"]): Promise<void> {
    if (typeof data === "number") return
    this.onUpdate({
      type: "command",
      data
    })
  }

  private async executeVimKey(data: AnimationQueueItem["data"]): Promise<void> {
    if (typeof data !== "object" || !("key" in data)) return
    this.onUpdate({
      type: "vim-key",
      data
    })
    await this.delay(data.delay || 100)
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  clear(): void {
    this.queue = []
    this.typingAnimator.cancel()
  }

  pause(): void {
    this.typingAnimator.cancel()
  }

  resume(): void {
    if (!this.isExecuting && this.queue.length > 0) {
      this.executeNext()
    }
  }
}
