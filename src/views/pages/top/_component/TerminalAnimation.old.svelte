<script lang="ts">
  import { onMount } from 'svelte'
  // Redirect to new refactored component
  import TerminalAnimation from './terminal/TerminalAnimation.svelte'
  export { TerminalAnimation as default }

  /*
  interface LogLine {
    id: number
    text: string
    type: 'command' | 'info' | 'success' | 'error' | 'log' | 'warning' | 'system' | 'vim'
    delay: number
  }

  interface VimState {
    mode: 'closed' | 'normal' | 'insert' | 'visual' | 'command'
    filename: string
    content: string[]
    cursorRow: number
    cursorCol: number
    viewportStart: number  // First visible line in vim
    savedContent: string[]  // Content before editing for ESC
    commandBuffer: string
    visualStart?: { row: number; col: number }
    visualEnd?: { row: number; col: number }
    yankBuffer: string[]
    lastCommand: string
    marks: { [key: string]: { row: number; col: number } }
  }

  let rotationX = -15
  let rotationY = 20
  let rotationZ = 0

  const terminalSequence: LogLine[] = [
    { id: 1, text: 'npm init -y', type: 'command', delay: 0 },
    { id: 2, text: 'Wrote to /home/dev/project/package.json:', type: 'info', delay: 300 },
    { id: 3, text: '{', type: 'log', delay: 100 },
    { id: 4, text: '  "name": "api-service",', type: 'log', delay: 50 },
    { id: 5, text: '  "version": "1.0.0",', type: 'log', delay: 50 },
    { id: 6, text: '  "main": "index.js",', type: 'log', delay: 50 },
    { id: 7, text: '  "license": "MIT"', type: 'log', delay: 50 },
    { id: 8, text: '}', type: 'log', delay: 50 },
    
    { id: 9, text: 'npm i -g @nestjs/cli', type: 'command', delay: 500 },
    { id: 10, text: '⠋ Installing @nestjs/cli...', type: 'system', delay: 200 },
    { id: 11, text: '✔ @nestjs/cli@10.2.1 installed successfully', type: 'success', delay: 1500 },
    
    { id: 12, text: 'nest new api-service --package-manager npm', type: 'command', delay: 300 },
    { id: 13, text: '⚡ We will scaffold your app in a few seconds..', type: 'info', delay: 400 },
    { id: 14, text: 'CREATE api-service/.eslintrc.js (663 bytes)', type: 'system', delay: 100 },
    { id: 15, text: 'CREATE api-service/.prettierrc (51 bytes)', type: 'system', delay: 50 },
    { id: 16, text: 'CREATE api-service/nest-cli.json (171 bytes)', type: 'system', delay: 50 },
    { id: 17, text: 'CREATE api-service/package.json (1980 bytes)', type: 'system', delay: 50 },
    { id: 18, text: 'CREATE api-service/tsconfig.json (546 bytes)', type: 'system', delay: 50 },
    { id: 19, text: 'CREATE api-service/src/main.ts (208 bytes)', type: 'system', delay: 50 },
    { id: 20, text: 'CREATE api-service/src/app.module.ts (249 bytes)', type: 'system', delay: 50 },
    { id: 21, text: 'CREATE api-service/src/app.controller.ts (274 bytes)', type: 'system', delay: 50 },
    { id: 22, text: 'CREATE api-service/src/app.service.ts (142 bytes)', type: 'system', delay: 50 },
    { id: 23, text: '✔ Installation in progress... ☕', type: 'success', delay: 300 },
    { id: 24, text: '🚀 Successfully created project api-service', type: 'success', delay: 2000 },
    
    { id: 44, text: 'nest g module auth', type: 'command', delay: 1000 },
    { id: 45, text: 'CREATE src/auth/auth.module.ts (82 bytes)', type: 'system', delay: 200 },
    { id: 46, text: 'UPDATE src/app.module.ts (312 bytes)', type: 'system', delay: 100 },
    
    { id: 47, text: 'nest g controller auth --no-spec', type: 'command', delay: 400 },
    { id: 48, text: 'CREATE src/auth/auth.controller.ts (97 bytes)', type: 'system', delay: 200 },
    { id: 49, text: 'UPDATE src/auth/auth.module.ts (170 bytes)', type: 'system', delay: 100 },
    
    { id: 50, text: 'nest g service auth --no-spec', type: 'command', delay: 400 },
    { id: 51, text: 'CREATE src/auth/auth.service.ts (88 bytes)', type: 'system', delay: 200 },
    { id: 52, text: 'UPDATE src/auth/auth.module.ts (246 bytes)', type: 'system', delay: 100 },
    
    { id: 53, text: 'npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt', type: 'command', delay: 500 },
    { id: 54, text: '⠋ Installing dependencies...', type: 'system', delay: 300 },
    { id: 55, text: 'added 23 packages, and audited 847 packages in 4s', type: 'info', delay: 1500 },
    { id: 56, text: '✔ Dependencies installed successfully', type: 'success', delay: 100 },
    
    { id: 57, text: 'vim src/auth/auth.service.ts', type: 'command', delay: 600 },
    { id: 59, text: 'import { Injectable } from \'@nestjs/common\';', type: 'vim', delay: 100 },
    { id: 60, text: 'import { JwtService } from \'@nestjs/jwt\';', type: 'vim', delay: 80 },
    { id: 61, text: 'import * as bcrypt from \'bcrypt\';', type: 'vim', delay: 80 },
    { id: 62, text: '', type: 'vim', delay: 50 },
    { id: 63, text: '@Injectable()', type: 'vim', delay: 80 },
    { id: 64, text: 'export class AuthService {', type: 'vim', delay: 80 },
    { id: 65, text: '  constructor(private jwtService: JwtService) {}', type: 'vim', delay: 100 },
    { id: 66, text: '', type: 'vim', delay: 50 },
    { id: 67, text: '  async validateUser(username: string, pass: string) {', type: 'vim', delay: 100 },
    { id: 68, text: '    // Mock user validation logic', type: 'vim', delay: 80 },
    { id: 681, text: ':vim-cmd:o', type: 'vim', delay: 200 },
    { id: 69, text: '    const user = { id: 1, username, password: await bcrypt.hash(pass, 10) };', type: 'vim', delay: 120 },
    { id: 70, text: '    return user;', type: 'vim', delay: 80 },
    { id: 71, text: '  }', type: 'vim', delay: 60 },
    { id: 72, text: '', type: 'vim', delay: 50 },
    { id: 73, text: '  async login(user: any) {', type: 'vim', delay: 100 },
    { id: 74, text: '    const payload = { username: user.username, sub: user.id };', type: 'vim', delay: 100 },
    { id: 75, text: '    return {', type: 'vim', delay: 80 },
    { id: 76, text: '      access_token: this.jwtService.sign(payload),', type: 'vim', delay: 100 },
    { id: 77, text: '    };', type: 'vim', delay: 60 },
    { id: 78, text: '  }', type: 'vim', delay: 60 },
    { id: 79, text: '}', type: 'vim', delay: 60 },
    { id: 80, text: ':wq', type: 'vim', delay: 300 },
    { id: 81, text: '\'src/auth/auth.service.ts\' written', type: 'system', delay: 100 },
    
    { id: 82, text: 'vim src/auth/jwt.strategy.ts', type: 'command', delay: 400 },
    { id: 83, text: ':set number', type: 'vim', delay: 300 },
    { id: 84, text: 'import { ExtractJwt, Strategy } from \'passport-jwt\';', type: 'vim', delay: 100 },
    { id: 85, text: 'import { PassportStrategy } from \'@nestjs/passport\';', type: 'vim', delay: 80 },
    { id: 86, text: 'import { Injectable } from \'@nestjs/common\';', type: 'vim', delay: 80 },
    { id: 87, text: '', type: 'vim', delay: 50 },
    { id: 88, text: '@Injectable()', type: 'vim', delay: 80 },
    { id: 89, text: 'export class JwtStrategy extends PassportStrategy(Strategy) {', type: 'vim', delay: 100 },
    { id: 90, text: '  constructor() {', type: 'vim', delay: 80 },
    { id: 91, text: '    super({', type: 'vim', delay: 60 },
    { id: 92, text: '      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),', type: 'vim', delay: 100 },
    { id: 93, text: '      ignoreExpiration: false,', type: 'vim', delay: 80 },
    { id: 94, text: '      secretOrKey: \'SECRET_KEY_HERE\',', type: 'vim', delay: 80 },
    { id: 95, text: '    });', type: 'vim', delay: 60 },
    { id: 96, text: '  }', type: 'vim', delay: 60 },
    { id: 97, text: '', type: 'vim', delay: 50 },
    { id: 98, text: '  async validate(payload: any) {', type: 'vim', delay: 100 },
    { id: 99, text: '    return { userId: payload.sub, username: payload.username };', type: 'vim', delay: 100 },
    { id: 100, text: '  }', type: 'vim', delay: 60 },
    { id: 101, text: '}', type: 'vim', delay: 60 },
    { id: 102, text: ':wq', type: 'vim', delay: 300 },
    { id: 103, text: '\'src/auth/jwt.strategy.ts\' written', type: 'system', delay: 100 },
    
    { id: 104, text: 'npm run test:e2e -- auth', type: 'command', delay: 500 },
    { id: 105, text: '> api-service@1.0.0 test:e2e', type: 'info', delay: 200 },
    { id: 106, text: '> jest --config ./test/jest-e2e.json auth', type: 'info', delay: 100 },
    { id: 107, text: 'PASS test/auth.e2e-spec.ts', type: 'success', delay: 800 },
    { id: 108, text: '  Auth API', type: 'log', delay: 100 },
    { id: 109, text: '    ✓ /auth/login (POST) - should return JWT token (125ms)', type: 'success', delay: 200 },
    { id: 110, text: '    ✓ /auth/profile (GET) - should return user profile (45ms)', type: 'success', delay: 150 },
    { id: 111, text: '    ✓ /auth/profile (GET) - should return 401 without token (23ms)', type: 'success', delay: 100 },
    { id: 112, text: '', type: 'log', delay: 50 },
    { id: 113, text: 'Test Suites: 1 passed, 1 total', type: 'success', delay: 100 },
    { id: 114, text: 'Tests:       3 passed, 3 total', type: 'success', delay: 50 },
    { id: 115, text: 'Time:        2.341s', type: 'info', delay: 50 },
    
    { id: 116, text: 'git add -A && git commit -m "feat: Add JWT authentication"', type: 'command', delay: 500 },
    { id: 117, text: '[main 8a3f2d1] feat: Add JWT authentication', type: 'system', delay: 300 },
    { id: 118, text: ' 5 files changed, 187 insertions(+)', type: 'info', delay: 100 },
    
    { id: 119, text: 'npm run deploy:prod', type: 'command', delay: 400 },
    { id: 120, text: '> Building for production...', type: 'info', delay: 200 },
    { id: 121, text: 'Hash: 3f8e2a1b4c5d6e7f8g9h', type: 'system', delay: 500 },
    { id: 122, text: 'Version: webpack 5.90.1', type: 'system', delay: 50 },
    { id: 123, text: 'Time: 8234ms', type: 'system', delay: 800 },
    { id: 124, text: 'Built at: 12/21/2024 11:15:32 AM', type: 'system', delay: 100 },
    { id: 125, text: 'Deploying to production environment...', type: 'info', delay: 300 },
    { id: 126, text: '✔ JWT authentication feature deployed successfully!', type: 'success', delay: 1200 },
    { id: 127, text: '🚀 API v1.1.0 is now live at https://api.production.com', type: 'success', delay: 200 }
  ]

  let displayedLines: LogLine[] = []
  let currentIndex = 0
  let isTyping = false
  let currentText = ''
  let cursorVisible = true
  let terminalBody: HTMLDivElement
  let scrollScheduled = false
  let savedLines: LogLine[] = []
  
  let vimState: VimState = {
    mode: 'closed',
    filename: '',
    content: [],
    cursorRow: 0,
    cursorCol: 0,
    viewportStart: 0,
    savedContent: [],
    commandBuffer: '',
    yankBuffer: [],
    lastCommand: '',
    marks: {}
  }

  function getLineColor(type: LogLine['type']) {
    switch(type) {
      case 'command': return 'var(--color-terminal-blue)'
      case 'success': return 'var(--color-terminal-green)'
      case 'error': return 'var(--color-terminal-red)'
      case 'warning': return 'var(--color-terminal-yellow)'
      case 'info': return 'var(--color-terminal-yellow)'
      case 'system': return 'var(--color-terminal-text)'
      case 'vim': return 'var(--color-terminal-text)'
      case 'log': default: return 'var(--color-terminal-text)'
    }
  }

  function typeWriter(text: string, callback: () => void) {
    isTyping = true
    let charIndex = 0
    currentText = ''
    
    function typeNextChar() {
      if (charIndex < text.length) {
        currentText += text[charIndex]
        charIndex++
        const delay = text[charIndex - 1] === ' ' ? 
          10 + Math.random() * 30 :
          30 + Math.random() * 60
        
        // Debounced scroll to bottom for better performance (only in terminal mode)
        if (terminalBody && !scrollScheduled && vimState.mode === 'closed') {
          scrollScheduled = true
          requestAnimationFrame(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight
            scrollScheduled = false
          })
        }
        
        setTimeout(typeNextChar, delay)
      } else {
        isTyping = false
        callback()
      }
    }
    
    typeNextChar()
  }

  function renderVimScreen() {
    const newDisplayedLines = []
    const visibleLines = 18
    const showLineNumbers = vimState.filename.includes('jwt.strategy.ts')
    
    // Update viewport if cursor moves out of view
    if (vimState.cursorRow < vimState.viewportStart) {
      vimState.viewportStart = vimState.cursorRow
    } else if (vimState.cursorRow >= vimState.viewportStart + visibleLines) {
      vimState.viewportStart = vimState.cursorRow - visibleLines + 1
    }
    
    // Show only visible lines in viewport
    for (let i = 0; i < visibleLines; i++) {
      const lineIndex = vimState.viewportStart + i
      
      if (lineIndex < vimState.content.length) {
        let line = vimState.content[lineIndex]
        let displayLine = line
        let linePrefix = showLineNumbers ? `<span class="vim-line-number">${String(lineIndex + 1).padStart(3, ' ')}</span> ` : ''
        
        // Visual mode highlighting
        if (vimState.mode === 'visual' && vimState.visualStart && vimState.visualEnd) {
          const startRow = Math.min(vimState.visualStart.row, vimState.visualEnd.row)
          const endRow = Math.max(vimState.visualStart.row, vimState.visualEnd.row)
          const startCol = vimState.visualStart.row < vimState.visualEnd.row ? vimState.visualStart.col : vimState.visualEnd.col
          const endCol = vimState.visualStart.row < vimState.visualEnd.row ? vimState.visualEnd.col : vimState.visualStart.col
          
          if (lineIndex >= startRow && lineIndex <= endRow) {
            // Apply visual selection highlighting
            if (lineIndex === startRow && lineIndex === endRow) {
              displayLine = line.substring(0, startCol) + 
                          '<span class="vim-visual">' + line.substring(startCol, endCol + 1) + '</span>' +
                          line.substring(endCol + 1)
            } else if (lineIndex === startRow) {
              displayLine = line.substring(0, startCol) + 
                          '<span class="vim-visual">' + line.substring(startCol) + '</span>'
            } else if (lineIndex === endRow) {
              displayLine = '<span class="vim-visual">' + line.substring(0, endCol + 1) + '</span>' +
                          line.substring(endCol + 1)
            } else {
              displayLine = '<span class="vim-visual">' + line + '</span>'
            }
          }
        }
        
        // Show cursor
        if (lineIndex === vimState.cursorRow) {
          // Parse out line number prefix if present
          let actualLine = displayLine
          let prefix = ''
          if (displayLine.includes('</span> ')) {
            const parts = displayLine.split('</span> ')
            prefix = parts[0] + '</span> '
            actualLine = parts[1] || ''
          }
          
          const beforeCursor = actualLine.substring(0, vimState.cursorCol)
          const cursorChar = actualLine[vimState.cursorCol] || ' '
          const afterCursor = actualLine.substring(vimState.cursorCol + 1)
          
          if (vimState.mode === 'insert') {
            displayLine = prefix + beforeCursor + '█' + afterCursor
          } else if (vimState.mode === 'normal' || vimState.mode === 'visual') {
            displayLine = prefix + beforeCursor + '<span class="vim-cursor-block">' + cursorChar + '</span>' + afterCursor
          }
        }
        
        newDisplayedLines.push({
          id: 800000 + lineIndex,
          text: linePrefix + displayLine,
          type: 'vim' as const,
          delay: 0
        })
      } else {
        // Show ~ for empty lines
        newDisplayedLines.push({
          id: 900000 + lineIndex + vimState.viewportStart * 1000,
          text: '~',
          type: 'vim' as const,
          delay: 0
        })
      }
    }
    
    displayedLines = newDisplayedLines
  }

  function processNextLine() {
    if (currentIndex >= terminalSequence.length) {
      setTimeout(() => {
        displayedLines = []
        currentIndex = 0
        vimState.mode = 'closed'
        processNextLine()
      }, 3000)
      return
    }

    const line = terminalSequence[currentIndex]
    
    setTimeout(() => {
      // Check if entering vim mode
      if (line.text.startsWith('vim') && vimState.mode === 'closed') {
        const match = line.text.match(/vim (.+)/)
        vimState.filename = match ? match[1] : 'untitled'
        vimState.content = []
        vimState.cursorRow = 0
        vimState.cursorCol = 0
        vimState.viewportStart = 0
        vimState.savedContent = []
        vimState.commandBuffer = ''
        vimState.yankBuffer = []
        vimState.lastCommand = ''
        vimState.marks = {}
        
        // Type vim command first
        typeWriter(line.text, () => {
          savedLines = [...displayedLines, { ...line, text: '$ ' + currentText }]
          
          // Clear screen and enter vim
          setTimeout(() => {
            vimState.mode = 'normal'
            renderVimScreen()
            
            // Ensure viewport stays at top
            if (terminalBody) {
              terminalBody.scrollTop = 0
            }
            
            currentIndex++
            
            // Check if this is the second vim file (jwt.strategy.ts)
            if (vimState.filename.includes('jwt.strategy.ts')) {
              // Simulate :set number command first
              setTimeout(() => {
                vimState.mode = 'command'
                vimState.commandBuffer = ':'
                renderVimScreen()
                setTimeout(() => {
                  vimState.commandBuffer = ':set number'
                  renderVimScreen()
                  setTimeout(() => {
                    vimState.mode = 'normal'
                    vimState.commandBuffer = ''
                    renderVimScreen()
                    currentIndex++
                    // Then press 'i' to enter insert mode
                    setTimeout(() => {
                      vimState.mode = 'insert'
                      vimState.savedContent = [...vimState.content]
                      processNextLine()
                    }, 300)
                  }, 300)
                }, 200)
              }, 500)
            } else {
              // Normal vim entry - just press 'i'
              setTimeout(() => {
                vimState.mode = 'insert'
                vimState.savedContent = [...vimState.content]
                processNextLine()
              }, 500)
            }
          }, 300)
        })
        return
      }
      
      // Handle vim mode content
      if ((vimState.mode === 'insert' || vimState.mode === 'command') && line.type === 'vim') {
        if (line.text === ':set number') {
          // Skip this line as it's handled in vim entry
          currentIndex++
          processNextLine()
          return
        }
        if (line.text.startsWith(':vim-cmd:')) {
          // Handle special vim commands
          const cmd = line.text.substring(9)
          if (cmd === 'o') {
            // Add new line below and enter insert mode
            vimState.content.splice(vimState.cursorRow + 1, 0, '')
            vimState.cursorRow++
            vimState.cursorCol = 0
            renderVimScreen()
          }
          currentIndex++
          processNextLine()
          return
        }
        if (line.text === ':wq') {
          // Keep INSERT mode visible while transitioning
          renderVimScreen() // Keep current display with INSERT
          setTimeout(() => {
            // Exit insert mode and enter command mode
            vimState.mode = 'command'
            renderVimScreen() // Now show without INSERT
            typeWriter(line.text, () => {
              setTimeout(() => {
                // Show save message before exiting
                displayedLines = [{
                  id: 999999,
                  text: `"${vimState.filename}" written`,
                  type: 'system' as const,
                  delay: 0
                }]
                setTimeout(() => {
                  // Exit vim and append save message to savedLines
                  savedLines = [...savedLines, {
                    id: 999999,
                    text: `"${vimState.filename}" written`,
                    type: 'system' as const,
                    delay: 0
                  }]
                  vimState.mode = 'closed'
                  displayedLines = savedLines
                  currentIndex++
                  processNextLine()
                }, 500)
              }, 300)
            })
          }, 300)
        } else {
          // Type content in insert mode - show in real time
          if (line.text !== '') {
            // Clear any typing state from previous line
            isTyping = false
            currentText = ''
            
            // Add new line to content and render immediately
            vimState.content.push('')
            vimState.cursorRow = vimState.content.length - 1
            vimState.cursorCol = 0
            
            // Ensure viewport follows cursor
            const visibleLines = 18
            if (vimState.cursorRow >= vimState.viewportStart + visibleLines) {
              vimState.viewportStart = vimState.cursorRow - visibleLines + 1
            }
            
            renderVimScreen()
            
            // Type character by character with real-time update
            let charIndex = 0
            const typeChar = () => {
              if (charIndex < line.text.length) {
                vimState.content[vimState.cursorRow] += line.text[charIndex]
                vimState.cursorCol++
                renderVimScreen()
                charIndex++
                
                const delay = line.text[charIndex - 1] === ' ' ? 
                  10 + Math.random() * 30 :
                  30 + Math.random() * 60
                setTimeout(typeChar, delay)
              } else {
                currentIndex++
                processNextLine()
              }
            }
            typeChar()
          } else {
            // Empty line
            vimState.content.push('')
            vimState.cursorRow = vimState.content.length - 1
            vimState.cursorCol = 0
            
            // Ensure viewport follows cursor
            const visibleLines = 18
            if (vimState.cursorRow >= vimState.viewportStart + visibleLines) {
              vimState.viewportStart = vimState.cursorRow - visibleLines + 1
            }
            
            renderVimScreen()
            currentIndex++
            processNextLine()
          }
        }
        return
      }
      
      // Normal terminal mode
      if (vimState.mode === 'closed') {
        if (line.type === 'command') {
          typeWriter(line.text, () => {
            displayedLines = [...displayedLines, { ...line, text: '$ ' + currentText }]
            currentIndex++
            processNextLine()
          })
        } else {
          displayedLines = [...displayedLines, line]
          currentIndex++
          processNextLine()
        }
        
        if (displayedLines.length > 20) {
          displayedLines = displayedLines.slice(-20)
        }
      } else {
        currentIndex++
        processNextLine()
      }
      
      // Auto scroll to bottom only for terminal mode
      if (terminalBody && vimState.mode === 'closed') {
        requestAnimationFrame(() => {
          terminalBody.scrollTop = terminalBody.scrollHeight
        })
      } else if (terminalBody && vimState.mode !== 'closed') {
        // VIM mode: keep scroll at top
        terminalBody.scrollTop = 0
      }
    }, line.delay)
  }

  onMount(() => {
    processNextLine()
    
    const cursorInterval = setInterval(() => {
      cursorVisible = !cursorVisible
    }, 500)
    
    // 3D 고정 각도 설정
    rotationX = -15
    rotationY = 20
    rotationZ = 0
    
    return () => {
      clearInterval(cursorInterval)
    }
  })
  */
</script>

<!-- Component has been refactored - using new modular version -->
<!--
<div class="terminal-wrapper">
  <div class="terminal-container" style="transform: perspective(1200px) rotateX({rotationX}deg) rotateY({rotationY}deg) rotateZ({rotationZ}deg);">
  <div class="terminal-header">
    <div class="terminal-buttons">
      <span class="terminal-button close"></span>
      <span class="terminal-button minimize"></span>
      <span class="terminal-button maximize"></span>
    </div>
    <div class="terminal-title">Terminal - api-service</div>
  </div>
  <div class="terminal-body" bind:this={terminalBody}>
    {#each displayedLines as line (line.id)}
      <div class="terminal-line {line.text === '~' ? 'vim-tilde' : ''} {line.type === 'log' || line.type === 'info' || line.type === 'system' || line.type === 'success' ? 'log-line' : ''}" style="color: {line.text === '~' ? '' : getLineColor(line.type)}">
        {#if line.text.startsWith(':wq') && line.type === 'vim'}
          <span class="vim-command">{line.text}</span>
        {:else}
          {@html line.text}
        {/if}
      </div>
    {/each}
    {#if isTyping && vimState.mode === 'closed'}
      <div class="terminal-line" style="color: {getLineColor('command')}">
        <span class="prompt">$</span>{` ${currentText}`}<span class="cursor">_</span>
      </div>
    {/if}
    {#if vimState.mode === 'command' && vimState.commandBuffer}
      <div class="vim-command-line">
        {vimState.commandBuffer}<span class="cursor">_</span>
      </div>
    {/if}
  </div>
  {#if vimState.mode !== 'closed'}
    <div class="vim-status-line">
      <span class="vim-mode">
        {#if vimState.mode === 'insert'}-- INSERT --{/if}
        {#if vimState.mode === 'visual'}-- VISUAL --{/if}
        {#if vimState.mode === 'normal'}&nbsp;{/if}
        {#if vimState.mode === 'command'}&nbsp;{/if}
      </span>
      <span class="vim-filename">{vimState.filename}{vimState.content.length > 0 && vimState.savedContent.join('\n') !== vimState.content.join('\n') ? ' [+]' : ''}</span>
      <span class="vim-position">{vimState.cursorRow + 1},{vimState.cursorCol + 1}</span>
    </div>
  {/if}
  </div>
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

  .terminal-container {
    width: 95%;
    max-width: 1200px;
    height: 600px;
    background: var(--color-terminal-bg);
    border: 1px solid rgba(251, 146, 60, 0.4);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: 
      0 20px 50px rgba(251, 146, 60, 0.15),
      0 0 40px rgba(251, 146, 60, 0.2),
      inset 0 0 80px rgba(251, 146, 60, 0.1);
    backdrop-filter: var(--blur-lg);
    transform-style: preserve-3d;
  }

  .terminal-header {
    background: rgba(254, 215, 170, 0.5);
    padding: var(--spacing-sm) var(--spacing-md);
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(251, 146, 60, 0.3);
  }

  .terminal-buttons {
    display: flex;
    gap: var(--spacing-sm);
    margin-right: var(--spacing-base);
  }

  .terminal-button {
    width: 12px;
    height: 12px;
    border-radius: var(--radius-full);
    display: block;
  }

  .terminal-button.close {
    background: var(--color-terminal-red);
  }

  .terminal-button.minimize {
    background: var(--color-terminal-yellow);
  }

  .terminal-button.maximize {
    background: var(--color-terminal-green);
  }

  .terminal-title {
    font-size: var(--font-size-sm);
    color: var(--color-terminal-blue);
    font-family: var(--font-family-mono);
    font-weight: var(--font-weight-ultralight);
  }

  .terminal-body {
    padding: var(--spacing-lg) var(--spacing-xl);
    height: calc(100% - 40px);
    overflow-y: auto;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-ultralight);
    line-height: var(--line-height-relaxed);
    padding-bottom: 50px; /* Space for vim status line */
    position: relative;
    color: var(--color-terminal-text);
    scroll-behavior: smooth;
  }

  .terminal-body::-webkit-scrollbar {
    width: 8px;
  }

  .terminal-body::-webkit-scrollbar-track {
    background: rgba(254, 215, 170, 0.2);
  }

  .terminal-body::-webkit-scrollbar-thumb {
    background: rgba(251, 146, 60, 0.5);
    border-radius: var(--radius-sm);
  }

  .terminal-body::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 146, 60, 0.8);
  }

  .terminal-line {
    margin-bottom: var(--spacing-xs);
    white-space: pre-wrap;
    text-shadow: 0 0 3px currentColor;
    font-weight: var(--font-weight-ultralight);
    letter-spacing: 0.02em;
  }
  
  .terminal-line.log-line {
    animation: fadeIn var(--transition-base);
  }

  .cursor {
    display: inline-block;
    animation: blink 1s infinite;
  }

  .vim-status-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(254, 215, 170, 0.5);
    padding: var(--spacing-sm) var(--spacing-xl);
    border-top: 1px solid rgba(251, 146, 60, 0.3);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-ultralight);
    display: flex;
    align-items: center;
  }

  .vim-mode {
    color: var(--color-terminal-blue);
    font-weight: var(--font-weight-semibold);
    text-shadow: 0 0 10px rgba(251, 146, 60, 0.5);
    margin-right: var(--spacing-lg);
  }
  
  .vim-filename {
    color: var(--color-terminal-yellow);
    flex: 1;
    text-align: center;
    font-weight: var(--font-weight-ultralight);
  }
  
  .vim-position {
    color: var(--color-terminal-blue);
    margin-left: auto;
    font-weight: var(--font-weight-ultralight);
  }
  
  
  .terminal-line :global(.vim-cursor-block) {
    background: var(--color-terminal-blue);
    color: var(--color-terminal-bg);
    font-weight: var(--font-weight-semibold);
  }
  
  .terminal-line :global(.vim-visual) {
    background: rgba(251, 146, 60, 0.3);
    color: var(--color-terminal-text);
  }
  
  .terminal-line :global(.vim-line-number) {
    color: var(--color-terminal-yellow);
    opacity: 0.6;
    margin-right: var(--spacing-sm);
  }
  
  .vim-command-line {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    padding: 0 var(--spacing-xl);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    color: var(--color-terminal-blue);
  }
  
  .terminal-line.vim-tilde {
    color: var(--color-accent);
    opacity: 0.8;
    transition: none;
  }

  .vim-command {
    background: var(--color-border-accent);
    padding: 2px var(--spacing-xs);
    border-radius: var(--radius-sm);
  }
  
  .prompt {
    color: var(--color-terminal-blue);
    font-weight: var(--font-weight-light);
  }
  
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
-->