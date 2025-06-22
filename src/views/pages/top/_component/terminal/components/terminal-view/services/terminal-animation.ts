import { terminalStore } from "../stores/terminal.store"
import { terminalSequences } from "../data/terminal-sequences"
import { typeCommand } from "./typing-animator"
import { executeCommand } from "./command-executor"
import { get } from "svelte/store"

let animationTimeout: ReturnType<typeof setTimeout> | null = null
let currentIndex = 0
let isInVimMode = false
let vimContentLines: string[] = []

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
    isInVimMode = true
    vimContentLines = []

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
  const terminalWrapper = (window as any).__terminalWrapper
  if (terminalWrapper && terminalWrapper.typeVimContent) {
    // Build the typing sequence
    const typingSequence: string[] = []

    // Start with 'i' to enter insert mode
    typingSequence.push("i")

    // Add all content with newlines
    contentLines.forEach((line, index) => {
      typingSequence.push(...line.split(""))
      if (index < contentLines.length - 1) {
        typingSequence.push("\n")
      }
    })

    // Exit insert mode and save
    typingSequence.push("\u001b") // ESC key
    typingSequence.push(":")
    typingSequence.push("w")
    typingSequence.push("q")
    typingSequence.push("\n")

    terminalWrapper.typeVimContent(typingSequence)
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
  isInVimMode = false

  // Add a delay before resuming to show the save message
  setTimeout(() => {
    runTerminalAnimation()
  }, 1000)
}
