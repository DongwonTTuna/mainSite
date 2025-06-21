# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Lint/Test Commands

- Build: `pnpm build` (vite build)
- Dev: `pnpm dev` (vite dev)
- Lint: `pnpm lint` (prettier --check . && eslint .)
- Format: `pnpm format` (prettier --write .)
- Type check: `pnpm check` (svelte-kit sync && svelte-check)
- E2E tests: `pnpm test:e2e` (playwright test)
- Unit tests: `pnpm test:unit` (vitest)
- Single unit test: `pnpm test:unit -- -t "test name"`

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

## MCP (Model Context Protocol) Usage Guidelines

### Overview

MCP is an open protocol that enables Claude to securely connect to external tools and data sources through standardized server connections.

### Configuration

- **Server Setup**: Add MCP servers via CLI using transport methods (stdio, SSE, HTTP)
- **Scopes**: Configure servers at local (project-specific), project (team-shared), or user (personal) level
- **Authentication**: Supports OAuth 2.0 for secure remote server connections

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
