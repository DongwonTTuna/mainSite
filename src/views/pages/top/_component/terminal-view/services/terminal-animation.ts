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
    return // Stop animation, will resume when vim closes
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
  runTerminalAnimation()
}
