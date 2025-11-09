# Repository Guidelines

## Project Structure & Module Organization

The app is a SvelteKit monorepo managed with pnpm workspaces. Primary client code lives under `src`, with layout shells in `src/routes`, shared UI in `src/lib`, and global styles in `src/app.css`. Static assets (favicons, fonts, images) belong in `static`, which Vite serves verbatim. Localization resources reside in `messages` and are wired through `project.inlang`, so add new language bundles there to keep translations centralized.

## Build, Test, and Development Commands

- `pnpm install`: syncs dependencies across the workspace; always run after pulling.
- `pnpm run dev`: launches Vite + SvelteKit with hot module reload on `localhost:5173`.
- `pnpm run build`: produces the optimized adapter output under `build/` for deployment.
- `pnpm run preview`: serves the production build locally to verify runtime behavior.
- `pnpm run check`: executes `svelte-check` with the repo TS config for type, accessibility, and slot safety validation.
- `pnpm run lint` / `pnpm run format`: enforce ESLint + Prettier (with the Svelte and Tailwind plugins) to guarantee consistent style.

## Coding Style & Naming Conventions

Use TypeScript for all modules and prefer Svelte single-file components for UI. Follow the default ESLint rules (2-space indentation, single quotes in TS, double quotes in JSON). Component files should be PascalCase (e.g., `HeroSection.svelte`); stores and utilities in `src/lib` stay camelCase. Co-locate component-specific styles and tests, but keep shared Tailwind utilities in `app.css` to avoid duplication.

## Svelte 5 Rune Usage

- Build every component with Svelte 5 runes and the official Svelte snippets (`$props`, `$bindable`, `$state`, `$derived`, etc.); avoid legacy `export let`/`bind:this` patterns unless Svelte 5 does not support the scenario yet.
- Prefer the snippet helpers shipped with Svelte (e.g., `{@const}`, `{@render}`, `<svelte:component>`) over hand-rolled utilities so files stay “svelteful” and consistent.
- When wrapping DOM elements or creating abstractions, surface configuration through rune-friendly props and slots so downstream components can opt into snippets like `<svelte:fragment>` cleanly.
- If you upgrade or add dependencies requiring Svelte interop, ensure the integration keeps rune syntax and snippets intact before merging.

## Testing Guidelines

This repo currently relies on static analysis instead of a full test harness. Run `pnpm run check` before every commit and add exploratory Playwright or Vitest suites inside `src/lib/__tests__` when features demand regression coverage. Name test files after the unit they exercise (e.g., `HeroSection.spec.ts`) and document any mocked data fixtures inside the same folder for clarity.

## Commit & Pull Request Guidelines

Adopt Conventional Commits (`feat:`, `fix:`, `chore:`) so releases can be auto-generated later. Keep commit scopes aligned with directories (`feat(routes): add hero layout`). Pull requests should summarize intent, list key changes, mention related issues, and include screenshots or video clips for UI-facing updates. Always confirm `pnpm run lint` and `pnpm run check` pass before requesting review.

## Security & Configuration Notes

Do not commit secrets; keep API keys in `.env` (untracked). If you introduce new environment variables, document them in `README.md` and add `env.d.ts` typings under `src`. Use adapter-auto defaults for development, but signal any hosting-specific requirements directly in the PR description.
