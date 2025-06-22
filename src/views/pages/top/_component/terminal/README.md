# Terminal Animation Component

## Overview

A modular, extensible terminal animation component with VIM editor simulation.

## Architecture

```
terminal/
├── components/          # UI Components
│   ├── Terminal.svelte       # Main terminal container
│   ├── TerminalHeader.svelte # Window controls and title
│   ├── TerminalBody.svelte   # Terminal content area
│   ├── VimEditor.svelte      # VIM mode editor
│   └── StatusLine.svelte     # VIM status line
├── stores/              # State Management
│   ├── terminal.store.ts     # Terminal state
│   └── vim.store.ts          # VIM editor state
├── services/            # Business Logic
│   ├── command-executor.ts   # Command queue and execution
│   ├── typing-animator.ts    # Typing animation engine
│   └── vim-engine.ts         # VIM command processor
├── data/                # Data
│   └── terminal-sequences.ts # Animation sequences
└── types/               # TypeScript Types
    └── terminal.types.ts     # Shared interfaces

```

## Features

- **Modular Design**: Separated concerns for better maintainability
- **Reactive State**: Svelte stores for state management
- **VIM Simulation**: Realistic VIM editor with modes and commands
- **Typing Animation**: Smooth, configurable typing effects
- **Command Queue**: Sequential command execution with delays
- **3D Perspective**: Configurable 3D transform effects

## Usage

```svelte
<script>
  import TerminalAnimation from './terminal/TerminalAnimation.svelte'
</script>

<TerminalAnimation />
```

## Customization

### Adding New Commands

1. Add to `terminal-sequences.ts`:
```typescript
export const terminalSequences: LogLine[] = [
  // ... existing sequences
  { id: 200, text: 'your-command', type: 'command', delay: 500 }
]
```

### Extending VIM Commands

1. Add to `vim-engine.ts`:
```typescript
this.registerCommand({
  key: 'your-key',
  modes: ['normal'],
  action: (state) => ({
    // State changes
  })
})
```

### Styling

All components use CSS variables from the global design system:
- `--color-terminal-*` for colors
- `--spacing-*` for spacing
- `--font-*` for typography

## Benefits of Refactoring

1. **Maintainability**: 784 lines → Multiple focused files
2. **Testability**: Isolated services and stores
3. **Extensibility**: Easy to add new features
4. **Performance**: Optimized rendering and animations
5. **Reusability**: Components can be used independently