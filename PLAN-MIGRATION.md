# Svelte 5 to Qwik Migration Plan with SSG

## Executive Summary

### Overview
This document outlines a comprehensive migration strategy from Svelte 5 (with SvelteKit and runes) to Qwik with Static Site Generation (SSG) for the Lee Dongwon Interactive Portfolio website.

### Timeline Estimate
- **Total Duration**: 3-4 weeks
- **Phase 1 (Setup & Infrastructure)**: 3-4 days
- **Phase 2 (Component Migration)**: 1-2 weeks
- **Phase 3 (Feature Migration)**: 1 week
- **Phase 4 (Testing & Optimization)**: 3-4 days

### Risk Assessment
| Risk | Severity | Mitigation Strategy |
|------|----------|-------------------|
| Animation Performance | High | Use Qwik's `useVisibleTask$` for GSAP, test thoroughly |
| SEO Impact | Medium | Maintain URL structure, proper redirects, sitemap |
| Build Time Increase | Low | Qwik's resumability may offset SSG build time |
| Learning Curve | Medium | Team training, documentation, gradual migration |

## Framework Comparison

### Core Differences

| Feature | Svelte 5 | Qwik |
|---------|----------|-------|
| **Reactivity** | Runes (`$state`, `$derived`) | Signals (`useSignal`, `useStore`) |
| **Compilation** | Compiles to vanilla JS | Fine-grained lazy loading |
| **Hydration** | Traditional hydration | Resumability (no hydration) |
| **Component Syntax** | `.svelte` files | `.tsx` files with `component$` |
| **Routing** | SvelteKit file-based | Qwik City file-based |
| **SSG** | `@sveltejs/adapter-static` | `@builder.io/qwik-city/adapters/static` |
| **i18n** | Paraglide | Qwik Speak |
| **Bundle Size** | Smaller initial | Smaller initial + progressive |

### Syntax Comparison

#### Component Definition
```svelte
<!-- Svelte 5 -->
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

```tsx
// Qwik
export default component$(() => {
  const count = useSignal(0);
  const doubled = useComputed$(() => count.value * 2);
});
```

## Pre-Migration Checklist

- [ ] Backup current project
- [ ] Document all custom configurations
- [ ] List all dependencies and find Qwik equivalents
- [ ] Audit current routes and URL structure
- [ ] Export all translation files
- [ ] Document GSAP animations and interactions
- [ ] Create migration branch
- [ ] Set up rollback strategy

## Migration Strategy

### Phase 1: Project Setup and Infrastructure (Days 1-4)

#### 1.1 Initialize Qwik Project
```bash
npm create qwik@latest
# Select "Qwik City App"
# Choose "Static site (SSG)"
```

#### 1.2 Configure SSG Adapter
```bash
npm run qwik add static
```

Update `adapters/static/vite.config.ts`:
```typescript
import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['@qwik-city-plan'],
      },
    },
    plugins: [
      staticAdapter({
        origin: 'https://dongwontuna.net',
      }),
    ],
  };
});
```

#### 1.3 Install Dependencies
```bash
# Core dependencies
npm install @builder.io/qwik @builder.io/qwik-city

# Animation
npm install gsap

# i18n
npm install qwik-speak

# Development tools
npm install -D @types/node typescript vite
```

#### 1.4 Project Structure Setup
```
src/
├── routes/
│   ├── [lang]/           # Localized routes
│   │   ├── index.tsx     # Home page
│   │   └── layout.tsx    # Layout wrapper
│   └── plugin.ts         # Middleware for i18n
├── components/
│   ├── sections/
│   ├── timeline/
│   ├── ui/
│   └── animations/
├── lib/
│   ├── i18n/
│   │   ├── speak-config.ts
│   │   └── speak-functions.ts
│   └── stores/
└── i18n/
    ├── en-US/
    ├── ja/
    └── ko/
```

### Phase 2: Component Migration (Days 5-14)

#### 2.1 State Management Migration

**Svelte 5 Runes → Qwik Signals**

```typescript
// stores/scroll.ts - Svelte
let scrollY = $state(0);
let scrollProgress = $derived(scrollY / maxScroll);

// stores/scroll.ts - Qwik
import { createContextId } from '@builder.io/qwik';

export interface ScrollStore {
  scrollY: number;
  scrollProgress: number;
}

export const ScrollContext = createContextId<ScrollStore>('scroll');
```

**In Components:**
```tsx
// Qwik Component
export default component$(() => {
  const scrollStore = useContext(ScrollContext);
  
  useVisibleTask$(({ track }) => {
    track(() => scrollStore.scrollY);
    // Update scroll-based animations
  });
});
```

#### 2.2 Component Migration Pattern

**Example: FirstView Component**

Svelte 5:
```svelte
<script>
  import { fade } from 'svelte/transition';
  let visible = $state(false);
</script>

<section class="first-view" transition:fade>
  <h1>{t('hero.title')}</h1>
</section>
```

Qwik:
```tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { inlineTranslate } from 'qwik-speak';

export default component$(() => {
  const t = inlineTranslate();
  const visible = useSignal(false);
  
  useVisibleTask$(() => {
    visible.value = true;
  });
  
  return (
    <section class={`first-view ${visible.value ? 'visible' : ''}`}>
      <h1>{t('hero.title')}</h1>
    </section>
  );
});
```

#### 2.3 Timeline Component Migration (Critical)

```tsx
// components/timeline/TimelineContainer.tsx
import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default component$(() => {
  const timelineRef = useSignal<HTMLElement>();
  
  useVisibleTask$(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize timeline animation
    if (timelineRef.value) {
      gsap.to(timelineRef.value, {
        x: '-50%',
        scrollTrigger: {
          trigger: timelineRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true
        }
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });
  
  return (
    <div ref={timelineRef} class="timeline-container">
      <Slot />
    </div>
  );
});
```

### Phase 3: Feature Migration (Days 15-21)

#### 3.1 Routing Migration

**SvelteKit Routes → Qwik City Routes**

```
# Svelte Structure
src/routes/
├── +page.svelte
├── +layout.svelte
└── [lang]/
    └── +page.svelte

# Qwik Structure  
src/routes/
├── index.tsx
├── layout.tsx
├── [lang]/
│   ├── index.tsx
│   └── layout.tsx
└── plugin.ts
```

**Route Configuration:**
```typescript
// src/routes/plugin.ts
import type { RequestHandler } from '@builder.io/qwik-city';
import { setSpeakContext, validateLocale } from 'qwik-speak';
import { config } from '~/lib/i18n/speak-config';

export const onRequest: RequestHandler = ({ params, locale }) => {
  const lang = params.lang && validateLocale(params.lang) 
    ? params.lang 
    : config.defaultLocale.lang;
    
  setSpeakContext(config);
  locale(lang);
};
```

#### 3.2 i18n Migration (Paraglide → Qwik Speak)

**Configuration:**
```typescript
// lib/i18n/speak-config.ts
import type { SpeakConfig } from 'qwik-speak';

export const config: SpeakConfig = {
  defaultLocale: { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
  supportedLocales: [
    { lang: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
    { lang: 'ko', currency: 'KRW', timeZone: 'Asia/Seoul' },
    { lang: 'ja', currency: 'JPY', timeZone: 'Asia/Tokyo' }
  ],
  assets: ['app', 'home', 'timeline'],
  runtimeAssets: ['runtime']
};
```

**Translation Function:**
```typescript
// lib/i18n/speak-functions.ts
import { server$ } from '@builder.io/qwik-city';
import type { LoadTranslationFn, Translation, TranslationFn } from 'qwik-speak';

const translationData = import.meta.glob<Translation>('/i18n/**/*.json');

const loadTranslation$: LoadTranslationFn = server$(async (lang: string, asset: string) =>
  await translationData[`/i18n/${lang}/${asset}.json`]?.()
);

export const translationFn: TranslationFn = {
  loadTranslation$: loadTranslation$
};
```

**Vite Configuration:**
```typescript
// vite.config.ts
import { qwikSpeakInline } from 'qwik-speak/inline';

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(), 
      qwikSpeakInline({
        supportedLangs: ['en-US', 'ko', 'ja'],
        defaultLang: 'en-US',
        assetsPath: 'i18n'
      }),
    ],
  };
});
```

#### 3.3 Animation System Migration

**GSAP Integration Pattern:**
```tsx
// hooks/useGSAP.ts
import { useVisibleTask$ } from '@builder.io/qwik';
import gsap from 'gsap';

export const useGSAP = (callback: () => void | (() => void)) => {
  useVisibleTask$(() => {
    const cleanup = callback();
    return () => {
      if (cleanup) cleanup();
      // Kill all GSAP animations
      gsap.killTweensOf("*");
    };
  });
};
```

### Phase 4: Build and Deployment (Days 22-25)

#### 4.1 Build Configuration

```json
// package.json
{
  "scripts": {
    "dev": "vite --mode ssr",
    "build": "qwik build",
    "build.server": "vite build -c adapters/static/vite.config.ts",
    "preview": "vite preview",
    "qwik-speak-extract": "qwik-speak-extract --supportedLangs=en-US,ko,ja --assetsPath=i18n"
  }
}
```

#### 4.2 SSG Configuration

```typescript
// src/routes/[lang]/index.tsx
export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: config.supportedLocales.map(locale => ({
      lang: locale.lang
    }))
  };
};
```

#### 4.3 Deployment Updates

```toml
# wrangler.toml - Update for Cloudflare Pages
name = "dongwontuna-net"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"

[[build.upload]]
format = "service-worker"
```

## Testing Strategy

### 4.1 Component Testing
```typescript
// tests/timeline.spec.ts
import { createDOM } from '@builder.io/qwik/testing';
import { test, expect } from 'vitest';

test('Timeline animates on scroll', async () => {
  const { render, userEvent } = await createDOM();
  const { container } = await render(<Timeline />);
  
  // Test scroll interactions
  await userEvent.scroll(window, { top: 500 });
  
  const timeline = container.querySelector('.timeline-container');
  expect(timeline).toHaveStyle({ transform: 'translateX(-25%)' });
});
```

### 4.2 E2E Testing
```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('language switching works', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="lang-ko"]');
  await expect(page).toHaveURL('/ko/');
  await expect(page.locator('h1')).toContainText('이동원');
});
```

## Performance Considerations

### Bundle Size Comparison
- **Svelte 5**: ~50KB initial JS
- **Qwik**: ~1KB initial JS + progressive loading

### Optimization Strategies
1. **Lazy Loading**: Utilize Qwik's automatic code splitting
2. **Image Optimization**: Use Qwik's image optimization
3. **Prefetching**: Configure service worker for resource hints
4. **CSS**: Extract critical CSS for above-the-fold content

## Rollback Plan

1. **Git Strategy**: 
   - Tag current version: `git tag v1.0.0-svelte`
   - Create migration branch: `git checkout -b migration/qwik`

2. **Deployment Strategy**:
   - Deploy to staging URL first
   - A/B test with partial traffic
   - Monitor metrics for 48 hours
   - Full rollout or rollback decision

3. **Rollback Triggers**:
   - Performance degradation >20%
   - Critical bugs in production
   - SEO ranking drops
   - User experience issues

## Post-Migration Checklist

- [ ] All routes return 200 status
- [ ] Animations perform at 60fps
- [ ] All languages load correctly
- [ ] SEO meta tags present
- [ ] Sitemap generated
- [ ] Build size <100KB initial
- [ ] Lighthouse score >90
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] Form submissions work

## Migration Commands Reference

```bash
# Development
npm run dev

# Build SSG
npm run build.server

# Extract translations
npm run qwik-speak-extract

# Preview production build
npm run preview

# Type checking
npm run qwik sync
```

## Resources

- [Qwik Documentation](https://qwik.builder.io/)
- [Qwik City Static Site Generation](https://qwik.builder.io/docs/guides/static-site-generation/)
- [Qwik Speak Documentation](https://github.com/robisim74/qwik-speak)
- [GSAP with Qwik](https://qwik.builder.io/docs/guides/qwik-nutshell/#usevisibletask)
- [Migration Examples](https://github.com/BuilderIO/qwik/tree/main/starters)

## Conclusion

This migration plan provides a structured approach to transitioning from Svelte 5 to Qwik while maintaining feature parity and improving performance through Qwik's resumability architecture. The phased approach minimizes risk and allows for incremental validation at each stage.