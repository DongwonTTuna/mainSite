<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import Terminal from "./components/Terminal.svelte"
  import { terminalStore } from "./stores/terminal.store"
  import { vimStore } from "./stores/vim.store"
  import { CommandExecutor } from "./services/command-executor"
  import { terminalSequences } from "./data/terminal-sequences"
  import type { AnimationQueueItem, LogLine } from "./types/terminal.types"

  let executor: CommandExecutor
  let isAnimating = true
  let vimEditorRef: { typeContent: (lines: string[]) => void } | null = null
  let vimContentBuffer: string[] = []
  let isCollectingVimContent = false

  function handleAnimationUpdate(item: AnimationQueueItem) {
    if (item.type === "command") {
      if (typeof item.data === "object" && "currentText" in item.data) {
        const { currentText } = item.data
        terminalStore.updateTyping(true, currentText)

        // If typing is complete
        if ("text" in item.data && currentText === item.data.text) {
          const commandData = item.data as { text: string; currentText?: string }
          setTimeout(() => {
            terminalStore.updateTyping(false)
            const logLine: LogLine = {
              id: Date.now(),
              text: `$ ${commandData.text}`,
              type: "command",
              delay: 0
            }
            terminalStore.addLine(logLine)

            // Check for vim command after typing is complete
            if (commandData.text.startsWith("vim ")) {
              const filename = commandData.text.substring(4)
              setTimeout(() => {
                terminalStore.setMode("vim")
                vimStore.open(filename)
                isCollectingVimContent = true
                vimContentBuffer = []
              }, 300)
            }
          }, 100)
        }
      }
      return
    }

    if (item.type === "line") {
      const line = item.data as LogLine

      // Handle vim content
      if (line.type === "vim" && isCollectingVimContent) {
        if (line.text === ":set number") {
          // Will be handled by filename check in vimStore
          return
        }

        if (line.text.startsWith(":vim-cmd:")) {
          // Skip vim commands for now
          return
        }

        if (line.text === ":wq") {
          // Stop collecting and type content
          isCollectingVimContent = false

          // Wait for editor to be ready then type content
          setTimeout(() => {
            if (vimEditorRef) {
              vimEditorRef.typeContent(vimContentBuffer)
            }

            // Handle exit after content is typed
            const typingDuration = vimContentBuffer.join("").length * 50 + 2000
            setTimeout(() => {
              let filename = ""
              const unsubscribe = vimStore.subscribe((state) => {
                filename = state.filename
              })
              unsubscribe()

              const saveMessage = `'${filename}' written`
              terminalStore.addLine({
                id: Date.now(),
                text: saveMessage,
                type: "system",
                delay: 0
              })
              vimStore.close()
              terminalStore.setMode("terminal")
            }, typingDuration)
          }, 500) // Wait for editor to mount

          return
        }

        // Collect vim content
        vimContentBuffer.push(line.text)
      } else if (line.type !== "vim") {
        // Regular terminal line
        terminalStore.addLine(line)
      }

      // Trim lines if too many
      terminalStore.trimLines(20)
    }
  }

  function handleAnimationComplete() {
    if (isAnimating) {
      // Loop animation
      setTimeout(() => {
        terminalStore.reset()
        vimStore.close()
        vimContentBuffer = []
        isCollectingVimContent = false
        startAnimation()
      }, 3000)
    }
  }

  function startAnimation() {
    executor = new CommandExecutor(handleAnimationUpdate, handleAnimationComplete)

    // Queue all sequences
    executor.addSequence(terminalSequences)
  }

  onMount(() => {
    startAnimation()
  })

  onDestroy(() => {
    isAnimating = false
    if (executor) {
      executor.clear()
    }
  })
</script>

<div class="terminal-wrapper">
  <Terminal bind:vimEditorRef />
</div>

<style>
  .terminal-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
  }
</style>
