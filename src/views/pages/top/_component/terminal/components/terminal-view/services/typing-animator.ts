import type { TypingOptions } from "../types/terminal.types"

// Export typeCommand function for terminal-animation.ts
export async function typeCommand(text: string): Promise<void> {
  const animator = new TypingAnimator()
  const { terminalStore } = await import("../stores/terminal.store")

  return animator.animate(text, (currentText) => terminalStore.updateTyping(true, currentText), {
    minDelay: 30,
    maxDelay: 60,
    spaceDelay: 10,
    callback: () => terminalStore.updateTyping(false)
  })
}

export class TypingAnimator {
  private currentAnimation: { cancel: () => void } | null = null

  animate(
    text: string,
    onUpdate: (currentText: string) => void,
    options: TypingOptions = {
      minDelay: 30,
      maxDelay: 60,
      spaceDelay: 10
    }
  ): Promise<void> {
    // Cancel any existing animation
    this.cancel()

    return new Promise((resolve) => {
      let cancelled = false
      let charIndex = 0
      let currentText = ""

      const typeNextChar = () => {
        if (cancelled || charIndex >= text.length) {
          if (!cancelled && options.callback) {
            options.callback()
          }
          resolve()
          return
        }

        currentText += text[charIndex]
        onUpdate(currentText)
        charIndex++

        // Calculate delay based on character type
        const char = text[charIndex - 1]
        let delay: number

        if (char === " ") {
          delay = options.spaceDelay + Math.random() * 20
        } else {
          delay = options.minDelay + Math.random() * (options.maxDelay - options.minDelay)
        }

        setTimeout(typeNextChar, delay)
      }

      // Store cancel function
      this.currentAnimation = {
        cancel: () => {
          cancelled = true
          resolve()
        }
      }

      // Start typing
      typeNextChar()
    })
  }

  cancel(): void {
    if (this.currentAnimation) {
      this.currentAnimation.cancel()
      this.currentAnimation = null
    }
  }

  async typeInstant(text: string, onUpdate: (currentText: string) => void): Promise<void> {
    onUpdate(text)
  }
}
