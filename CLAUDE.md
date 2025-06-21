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
- **File Structure**: SvelteKit with separate PC/SP components in views/pages/*
- **Imports**: Use aliases ($i18n, $views) for cleaner imports
- **Components**: Use .svelte extension, follow kebab-case for filenames
- **CSS**: Browser compatibility checked with stylelint (except css-nesting)
- **Internationalization**: Uses paraglide with translations in messages/*.json

## Architecture Overview

This is DongwonTTuna's portfolio site built with SvelteKit 2.x and deployed on Cloudflare Pages.

### Project Structure
- **src/routes**: SvelteKit routing (delegates to views/pages components)
- **src/views/pages**: Page components with PC/SP variants
- **src/views/common**: Reusable layouts (with-nav/without-nav) and components
- **src/lib**: Utilities and hooks for device detection and i18n

### Key Patterns
1. **Device-based rendering**: Server detects device type, renders PC or SP components
2. **Layout system**: Pages wrapped in with-nav or without-nav layouts
3. **Component organization**: _components, _images, _types folders within each feature
4. **API routes**: Located in src/routes/api for server-side functionality