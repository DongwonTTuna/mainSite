# Repository Guidelines

## Project Structure & Module Organization

The app is a Bun-based SvelteKit application. Primary client code lives under `src`, with layout shells in `src/routes`, shared code in `src/lib`, and global styles in `src/app.css`. Static assets (favicons, fonts, images) belong in `static`, which Vite serves verbatim. Localization resources reside in `messages` and are wired through `project.inlang`, so add new language bundles there to keep translations centralized.

## Build, Test, and Development Commands

- `bun install`: syncs dependencies and updates `bun.lock`; always run after pulling.
- `bun run dev`: launches Vite + SvelteKit with hot module reload on `localhost:5173`.
- `bun run build`: produces the optimized adapter output under `build/` for deployment.
- `bun run preview`: serves the production build locally to verify runtime behavior.
- `bun run check`: executes `svelte-check` with the repo TS config for type, accessibility, and slot safety validation.
- `bun run lint` / `bun run format`: enforce ESLint + Prettier (with the Svelte and Tailwind plugins) to guarantee consistent style.
- `bun run test`: runs the Bun test suite.

## Coding Style & Naming Conventions

Use TypeScript for all modules and prefer Svelte single-file components for UI. Follow the default ESLint rules (2-space indentation, single quotes in TS, double quotes in JSON). Component files should be PascalCase (e.g., `HeroSection.svelte`); stores and utilities in `src/lib` stay camelCase. Co-locate component-specific styles and tests, but keep shared Tailwind utilities in `app.css` to avoid duplication.

## Svelte 5 Rune Usage

- Build every component with Svelte 5 runes and the official Svelte snippets (`$props`, `$bindable`, `$state`, `$derived`, etc.); avoid legacy `export let`/`bind:this` patterns unless Svelte 5 does not support the scenario yet.
- Prefer the snippet helpers shipped with Svelte (e.g., `{@const}`, `{@render}`, `<svelte:component>`) over hand-rolled utilities so files stay “svelteful” and consistent.
- When wrapping DOM elements or creating abstractions, surface configuration through rune-friendly props and slots so downstream components can opt into snippets like `<svelte:fragment>` cleanly.
- If you upgrade or add dependencies requiring Svelte interop, ensure the integration keeps rune syntax and snippets intact before merging.

## Testing Guidelines

This repo uses Bun's built-in test runner for unit-level regression coverage. Run `bun run check`, `bun run lint`, and `bun run test` before every commit. Keep tests in `tests/` or alongside modules when a feature benefits from tight locality. Name test files after the unit they exercise (e.g., `build-home-page-model.test.ts`) and prefer application/domain-layer tests unless UI behavior specifically needs browser coverage.

## Commit & Pull Request Guidelines

Adopt Conventional Commits (`feat:`, `fix:`, `chore:`) so releases can be auto-generated later. Keep commit scopes aligned with directories (`feat(routes): add hero layout`). Pull requests should summarize intent, list key changes, mention related issues, and include screenshots or video clips for UI-facing updates. Always confirm `bun run lint`, `bun run check`, and `bun run test` pass before requesting review.

## Security & Configuration Notes

Do not commit secrets; keep API keys in `.env` (untracked). If you introduce new environment variables, document them in `README.md` and add `env.d.ts` typings under `src`. Use adapter-auto defaults for development, but signal any hosting-specific requirements directly in the PR description.
