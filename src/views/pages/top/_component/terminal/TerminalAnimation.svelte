<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Terminal from './components/Terminal.svelte'
  import { terminalStore } from './stores/terminal.store'
  import { vimStore } from './stores/vim.store'
  import { CommandExecutor } from './services/command-executor'
  import { terminalSequences } from './data/terminal-sequences'
  import type { AnimationQueueItem, LogLine } from './types/terminal.types'
  
  let executor: CommandExecutor
  let currentIndex = 0
  let isAnimating = true
  
  function handleAnimationUpdate(item: AnimationQueueItem) {
    if (item.type === 'command') {
      const { currentText } = item.data
      terminalStore.updateTyping(true, currentText)
      
      // If typing is complete
      if (currentText === item.data.text) {
        setTimeout(() => {
          terminalStore.updateTyping(false)
          terminalStore.addLine({
            ...item.data,
            text: `$ ${item.data.text}`
          })
          
          // Check for vim command after typing is complete
          if (item.data.text.startsWith('vim ')) {
            const filename = item.data.text.substring(4)
            setTimeout(() => {
              terminalStore.setMode('vim')
              vimStore.open(filename)
              
              // Handle special vim setup for jwt.strategy.ts
              if (filename.includes('jwt.strategy.ts')) {
                setTimeout(() => {
                  vimStore.processCommandKey(':')
                  setTimeout(() => {
                    vimStore.processCommandKey('s')
                    vimStore.processCommandKey('e')
                    vimStore.processCommandKey('t')
                    vimStore.processCommandKey(' ')
                    vimStore.processCommandKey('n')
                    vimStore.processCommandKey('u')
                    vimStore.processCommandKey('m')
                    vimStore.processCommandKey('b')
                    vimStore.processCommandKey('e')
                    vimStore.processCommandKey('r')
                    vimStore.processCommandKey('Enter')
                    setTimeout(() => {
                      vimStore.setMode('insert')
                    }, 300)
                  }, 200)
                }, 500)
              } else {
                setTimeout(() => {
                  vimStore.setMode('insert')
                }, 500)
              }
            }, 300)
          }
        }, 100)
      }
      return
    }
    
    if (item.type === 'line') {
      const line = item.data as LogLine
      
      // Handle vim content
      if (line.type === 'vim') {
        if (line.text === ':set number') {
          // Skip - handled above
          return
        }
        
        if (line.text.startsWith(':vim-cmd:')) {
          const cmd = line.text.substring(9)
          if (cmd === 'o') {
            vimStore.executeCommand('o')
          }
          return
        }
        
        if (line.text === ':wq') {
          // Exit vim sequence
          setTimeout(() => {
            vimStore.setMode('normal')
            setTimeout(() => {
              vimStore.processCommandKey(':')
              setTimeout(() => {
                vimStore.processCommandKey('w')
                setTimeout(() => {
                  vimStore.processCommandKey('q')
                  setTimeout(() => {
                    vimStore.processCommandKey('Enter')
                    setTimeout(() => {
                      // Get filename from store
                      let filename = ''
                      const unsubscribe = vimStore.subscribe(state => {
                        filename = state.filename
                      })
                      unsubscribe()
                      
                      const saveMessage = `'${filename}' written`
                      terminalStore.addLine({
                        id: Date.now(),
                        text: saveMessage,
                        type: 'system',
                        delay: 0
                      })
                      vimStore.close()
                      terminalStore.setMode('terminal')
                    }, 300)
                  }, 300)
                }, 100)
              }, 100)
            }, 400)
          }, 300)
          return
        }
        
        // Add content line to vim
        let currentState: any = null
        const unsubscribe = vimStore.subscribe(state => {
          currentState = state
        })
        unsubscribe()
        
        if (currentState && currentState.mode === 'insert') {
          if (line.text === '') {
            // Empty line - just add new line
            vimStore.addLine('')
            vimStore.setCursor(currentState.cursorRow + 1, 0)
          } else {
            // Add text to current line and create new line
            vimStore.updateLine(currentState.cursorRow, line.text)
            vimStore.addLine('')
            vimStore.setCursor(currentState.cursorRow + 1, 0)
          }
        }
      } else if (line.type !== 'vim') {
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
        currentIndex = 0
        startAnimation()
      }, 3000)
    }
  }
  
  function startAnimation() {
    executor = new CommandExecutor(
      handleAnimationUpdate,
      handleAnimationComplete
    )
    
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
  <Terminal />
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