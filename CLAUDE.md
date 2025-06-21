# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Code Style Guidelines

- **Formatting**: 120 char width, 2-space indent, no semi, single quotes, no trailing commas
- **TypeScript**: Strict mode enabled, consistent file casing enforced
- **File Structure**: SvelteKit with separate PC/SP components in views/pages/\*
- **Imports**: Use aliases ($i18n, $views) for cleaner imports
- **Components**: Use .svelte extension, follow kebab-case for filenames
- **CSS**: Browser compatibility checked with stylelint (except css-nesting)
- **Internationalization**: Uses paraglide with translations in messages/\*.json
- **Comments**: Use JSDoc style for function and component documentation
  - 꼭 필요한 경우에만 주석을 작성하고, 코드가 명확하게 이해될 수 있도록 작성합니다.
  - 최대한 코드로 의도를 표현하고, 주석은 코드로만 의도를 전달할 수 없을 때 작성합니다.

## Architecture Overview

This is DongwonTTuna's portfolio site built with SvelteKit 2.x and deployed on Cloudflare Pages.
TOP page만 사용하며, 그 이외에는 어떠한 페이지도 사용하지 않습니다.

### Developer Information

Personal profile and resume information is available in [PROFILE.md](./PROFILE.md).

### Project Structure

- **src/routes**: SvelteKit routing (delegates to views/pages components)
- **src/views/pages**: Page components with PC/SP variants
- **src/views/common**: Reusable layouts (with-nav/without-nav) and components
- **src/lib**: Utilities and hooks for device detection and i18n

### Key Patterns

1. **Device-based rendering**: Server detects device type, renders PC or SP components
2. **Layout system**: Pages wrapped in with-nav or without-nav layouts
3. **Component organization**: \_components, \_images, \_types folders within each feature
4. **API routes**: Located in src/routes/api for server-side functionality

## Design System

### Overview

This project implements a comprehensive design system using CSS custom properties (CSS variables) to ensure consistency, maintainability, and theme support. All design tokens are defined in `/static/css/global.css`.

### Design Tokens

#### Typography
```css
--font-family-primary: "Noto Sans JP", sans-serif
--font-family-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace

/* Font Sizes */
--font-size-xs: 0.75rem      /* 12px */
--font-size-sm: 0.875rem     /* 14px */
--font-size-base: 1rem       /* 16px */
--font-size-lg: 1.125rem     /* 18px */
--font-size-xl: 1.25rem      /* 20px */
--font-size-2xl: 1.5rem      /* 24px */
--font-size-3xl: 2rem        /* 32px */
--font-size-4xl: 2.5rem      /* 40px */
--font-size-5xl: 3rem        /* 48px */
--font-size-hero: clamp(3rem, 8vw, 6rem)
--font-size-hero-sub: clamp(1.5rem, 4vw, 2.5rem)

/* Font Weights */
--font-weight-ultralight: 100
--font-weight-light: 300
--font-weight-normal: 400
--font-weight-semibold: 600
--font-weight-bold: 700
--font-weight-black: 900

/* Line Heights */
--line-height-tight: 1.2
--line-height-normal: 1.5
--line-height-relaxed: 1.6
--line-height-loose: 1.8
```

#### Spacing
```css
--spacing-xs: 0.25rem    /* 4px */
--spacing-sm: 0.5rem     /* 8px */
--spacing-md: 0.75rem    /* 12px */
--spacing-base: 1rem     /* 16px */
--spacing-lg: 1.5rem     /* 24px */
--spacing-xl: 2rem       /* 32px */
--spacing-2xl: 3rem      /* 48px */
--spacing-3xl: 4rem      /* 64px */
--spacing-4xl: 5rem      /* 80px */
```

#### Layout
```css
--max-width-container: 1200px
--max-width-content: 800px
```

#### Border Radius
```css
--radius-sm: 0.25rem     /* 4px */
--radius-base: 0.5rem    /* 8px */
--radius-md: 0.75rem     /* 12px */
--radius-lg: 1rem        /* 16px */
--radius-xl: 1.5rem      /* 24px */
--radius-2xl: 2rem       /* 32px */
--radius-full: 9999px    /* Circle */
```

#### Transitions & Animations
```css
--transition-fast: 0.2s ease
--transition-base: 0.3s ease
--transition-slow: 0.8s ease
--transition-material: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

#### Z-index Layers
```css
--z-background: 0
--z-content: 1
--z-overlay: 10
--z-modal: 100
--z-fixed: 1000
```

#### Effects
```css
--blur-sm: blur(4px)
--blur-base: blur(10px)
--blur-lg: blur(20px)
```

### Theme System

The design system supports light and dark themes through the `data-theme` attribute on the document root.

#### Theme Colors

Colors automatically adapt based on the active theme:

```css
/* Example color variables */
--color-background         /* Main background color */
--color-background-secondary    /* Secondary backgrounds */
--color-text-primary       /* Primary text color */
--color-text-secondary     /* Secondary text color */
--color-accent            /* Primary accent color */
--color-accent-light      /* Light variant of accent */
--color-border            /* Border colors */
--shadow-base             /* Standard shadow */
```

#### Theme Switching

Theme is controlled by the `ThemeToggle.svelte` component which:
1. Persists theme preference in localStorage
2. Respects system preference (`prefers-color-scheme`)
3. Applies theme via `data-theme` attribute

```javascript
// Set theme programmatically
document.documentElement.setAttribute('data-theme', 'dark')
// Remove for light theme (default)
document.documentElement.removeAttribute('data-theme')
```

### Usage Guidelines

#### Using Design Tokens

Always use CSS variables instead of hardcoded values:

```css
/* ❌ Don't do this */
.component {
  padding: 16px;
  font-size: 14px;
  color: #000011;
}

/* ✅ Do this */
.component {
  padding: var(--spacing-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}
```

#### Responsive Design

The design system includes responsive adjustments:
- Font sizes scale down on mobile
- Spacing adjusts for smaller screens
- Container padding adapts to viewport

#### Component Styling

1. **Always use design tokens** for consistency
2. **Leverage CSS variables** for theme-aware styling
3. **Follow spacing scale** for margins and padding
4. **Use semantic color names** (e.g., `--color-accent` not `--color-blue`)

#### Shadow System

Shadows adapt to theme context:
```css
--shadow-sm     /* Subtle shadows */
--shadow-base   /* Standard elevation */
--shadow-md     /* Medium elevation */
--shadow-lg     /* High elevation */
--shadow-xl     /* Maximum elevation */
--shadow-glow   /* Glow effects */
```

### Animations

Pre-defined animations are available globally:
- `fadeIn` - Simple opacity fade
- `fadeInUp` - Fade with upward motion
- `glow` - Pulsing glow effect
- `twinkle` - Star twinkle effect
- `blink` - Cursor blink

### Best Practices

1. **Never hardcode colors** - Always use color variables
2. **Follow the spacing scale** - Don't use arbitrary spacing values
3. **Use semantic naming** - Choose variables based on purpose, not appearance
4. **Maintain consistency** - Use the same tokens for similar purposes
5. **Test both themes** - Ensure components look good in light and dark modes

## Internationalization (i18n) Guidelines

### Overview

This project uses **Paraglide JS v2** (`@inlang/paraglide-js`) for type-safe internationalization. Currently, only English (en) is configured, but the infrastructure is ready for additional languages.

### Language Switching

The runtime supports multiple strategies for locale detection:

1. Cookie (`PARAGLIDE_LOCALE`)
2. Global variable
3. Base locale fallback (en)

LocaleChange: setLocale(locale)
Use Language: import { m } from '$lib/i18n'

### Current Status

- **Supported Languages**: English (en), Korean (ko), Japanese (ja)
- **Translation Coverage**: Minimal (only test message exists)
- **URL Pattern**: Supports localized URLs (e.g., `/en/path`)
- **Middleware**: `handleParaglide` configured but currently pass-through

## MCP (Model Context Protocol) Usage Guidelines

### Overview

MCP is an open protocol that enables Claude to securely connect to external tools and data sources through standardized server connections.

### Available MCP Tools in This Session

- `mcp__ide__getDiagnostics`: Get diagnostic information from the IDE
- `mcp__brave-search__brave_web_search`: Perform web searches (up to 20 results)
- `mcp__brave-search__brave_local_search`: Search for local businesses and places

### Best Practices

1. **Security**: Only use trusted MCP servers - third-party servers can pose security risks
2. **Resource References**: Use "@" mentions to reference external resources
3. **Commands**: Execute server-specific commands via slash commands
4. **Tool Priority**: Prefer MCP-provided tools (prefixed with "mcp\_\_") over built-in tools when available

### Common Use Cases

- Database schema exploration and queries
- API documentation access and testing
- Web searches for current information
- Cross-platform tool integration
- Secure external data retrieval

### Important Notes

- MCP servers run in isolated environments for security
- Always verify server authenticity before connecting
- Use project-scope servers for team collaboration
- Keep sensitive credentials in local-scope configurations
