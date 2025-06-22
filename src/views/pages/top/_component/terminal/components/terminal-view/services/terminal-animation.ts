import { terminalStore } from "../stores/terminal.store"
import { terminalSequences } from "../data/terminal-sequences"
import { typeCommand } from "./typing-animator"
import { executeCommand } from "./command-executor"

let animationTimeout: ReturnType<typeof setTimeout> | null = null
let currentIndex = 0

export async function runTerminalAnimation() {
  if (currentIndex >= terminalSequences.length) {
    terminalStore.completeAnimation()
    return
  }

  const sequence = terminalSequences[currentIndex]

  // Handle vim commands specially - they will trigger mode switch
  if (sequence.type === "command" && sequence.text.startsWith("vim ")) {
    await typeCommand(sequence.text)
    await new Promise((resolve) => setTimeout(resolve, 300))
    executeCommand(sequence.text)
    currentIndex++

    // Store the index so we can resume after vim closes
    terminalStore.setAnimationIndex(currentIndex)

    // Wait a bit for vim to open, then start collecting vim content
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Collect vim content lines
    collectVimContent()
    return
  }

  // Regular terminal animation
  if (sequence.type === "command") {
    await typeCommand(sequence.text)
    await new Promise((resolve) => setTimeout(resolve, 300))
    executeCommand(sequence.text)
  } else {
    terminalStore.addLine({
      id: sequence.id,
      text: sequence.text,
      type: sequence.type,
      delay: sequence.delay
    })
  }

  currentIndex++

  // Schedule next animation
  animationTimeout = setTimeout(() => {
    runTerminalAnimation()
  }, sequence.delay)
}

function collectVimContent() {
  // Collect all vim lines until we hit :wq or :x
  const contentLines: string[] = []
  let tempIndex = currentIndex

  while (tempIndex < terminalSequences.length) {
    const sequence = terminalSequences[tempIndex]

    if (sequence.type === "vim") {
      contentLines.push(sequence.text)
    } else if (sequence.text === ":wq" || sequence.text === ":x") {
      // Found exit command, trigger vim typing animation
      triggerVimTyping(contentLines)
      currentIndex = tempIndex + 1
      return
    }

    tempIndex++
  }
}

function triggerVimTyping(contentLines: string[]) {
  // Get the terminal wrapper to trigger vim typing
  const terminalWrapper = (
    window as unknown as { __terminalWrapper?: { typeVimContent: (sequence: string[]) => void } }
  ).__terminalWrapper
  if (terminalWrapper && terminalWrapper.typeVimContent) {
    // Build the typing sequence with special commands
    const typingSequence: string[] = []

    // Start with insert mode command
    typingSequence.push("INSERT_MODE")

    // Add all content with proper newlines
    contentLines.forEach((line, index) => {
      // Split line into individual characters
      const chars = line.split("")
      typingSequence.push(...chars)

      // Add newline after each line except the last
      if (index < contentLines.length - 1) {
        typingSequence.push("NEWLINE")
      }
    })

    // Exit insert mode
    typingSequence.push("ESCAPE")

    // Enter command mode and save/quit
    typingSequence.push("COMMAND_MODE")
    typingSequence.push("SAVE_QUIT")

    // Start typing animation
    setTimeout(() => {
      terminalWrapper.typeVimContent(typingSequence)
    }, 300)
  }
}

export function pauseAnimation() {
  if (animationTimeout) {
    clearTimeout(animationTimeout)
    animationTimeout = null
  }
}

export function resumeAnimation(index?: number) {
  if (index !== undefined) {
    currentIndex = index
  }

  // Add a delay before resuming to show the save message
  setTimeout(() => {
    runTerminalAnimation()
  }, 1000)
}
