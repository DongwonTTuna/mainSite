# 🚀 Interactive Developer Portfolio - Implementation Workflow

## 📋 Project Overview
**Client**: Lee Dongwon (이동원)
**Type**: Interactive Portfolio Website
**Core Feature**: Horizontal scrolling timeline with vertical scroll input
**Stack**: SvelteKit (Svelte 5 Runes), TypeScript, Tailwind CSS, GSAP

---

## 🏗️ Phase 1: Foundation & Architecture (Week 1)

### 1.1 Project Initialization

#### Task 1.1.1: Initialize Project
```bash
# Create SvelteKit project
npx sv create portfolio-dongwon --template minimal --types ts
cd portfolio-dongwon

# Install core dependencies
npm install -D tailwindcss postcss autoprefixer @types/node
npm install gsap @gsap/react

# Install UI enhancement libraries
npm install lucide-svelte
npm install -D @sveltejs/enhanced-img
```

#### Task 1.1.2: Configure TypeScript
```typescript
// tsconfig.json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "allowJs": false,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true
  }
}
```

#### Task 1.1.3: Setup Tailwind CSS
```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'portfolio-dark': '#0a0a0a',
        'portfolio-accent': '#3b82f6'
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'bob': 'bobbing 2s ease-in-out infinite'
      }
    }
  }
}
```

### 1.2 Data Architecture

#### Task 1.2.1: Timeline Data Types
```typescript
// src/lib/types/timeline.ts
export interface TimelineEvent {
  id: string;
  year: number;
  month: number;
  title: string;
  category: 'education' | 'career' | 'project' | 'certification';
  description?: string;
  techStack?: string[];
  links?: {
    github?: string;
    live?: string;
    docs?: string;
  };
  position: {
    branch: 'top' | 'bottom';
    offset: number; // Vertical offset from base branch
  };
}

export interface TimelineData {
  events: TimelineEvent[];
  startYear: number;
  endYear: number;
}
```

#### Task 1.2.2: Project Configuration
```typescript
// src/lib/config/portfolio.ts
export const portfolioConfig = {
  owner: {
    name: 'Lee Dongwon',
    nameKorean: '이동원',
    title: 'Full Stack Engineer',
    email: 'your-email@example.com', // TODO: Replace
    social: {
      github: 'https://github.com/DongwonTTuna',
      linkedin: 'https://linkedin.com/in/your-profile' // TODO: Replace
    }
  },
  timeline: {
    pixelsPerYear: 1200,
    branchHeight: 300,
    nodeSize: 80,
    animationDuration: 0.8
  }
};
```

---

## 🎨 Phase 2: Core Components Development (Week 2-3)

### 2.1 Landing Page (First View)

#### Task 2.1.1: Hero Component
```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
  
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
</script>

<section class="min-h-screen bg-portfolio-dark flex items-center justify-center">
  {#if mounted}
    <div class="text-center space-y-8">
      <h1 
        in:fade={{ duration: 800, delay: 200 }}
        class="text-6xl font-bold text-white"
      >
        LEE DONGWON
      </h1>
      <p 
        in:fade={{ duration: 800, delay: 400 }}
        class="text-2xl text-gray-300"
      >
        Full Stack Engineer
      </p>
      <!-- Social Links -->
      <ScrollIndicator />
    </div>
  {/if}
</section>
```

### 2.2 Interactive Timeline System

#### Task 2.2.1: Scroll Transformation Logic
```typescript
// src/lib/utils/scrollTransform.ts
export class ScrollToHorizontal {
  private scrollPosition = $state(0);
  private maxScroll = 0;
  private isScrolling = false;
  
  constructor(
    private container: HTMLElement,
    private config: {
      totalWidth: number;
      sensitivity: number;
    }
  ) {
    this.init();
  }
  
  private init() {
    this.maxScroll = this.config.totalWidth - window.innerWidth;
    
    window.addEventListener('wheel', this.handleWheel.bind(this), { 
      passive: false 
    });
    
    // Touch support
    let touchStartY = 0;
    this.container.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });
    
    this.container.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      this.updatePosition(deltaY * 2);
    });
  }
  
  private handleWheel(e: WheelEvent) {
    if (!this.isScrolling) {
      e.preventDefault();
      this.updatePosition(e.deltaY * this.config.sensitivity);
    }
  }
  
  private updatePosition(delta: number) {
    this.scrollPosition = Math.max(
      0, 
      Math.min(this.maxScroll, this.scrollPosition + delta)
    );
  }
  
  get position() {
    return this.scrollPosition;
  }
}
```

#### Task 2.2.2: Timeline Component
```svelte
<!-- src/lib/components/Timeline.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollToHorizontal } from '$lib/utils/scrollTransform';
  import TimelineNode from './TimelineNode.svelte';
  import type { TimelineData } from '$lib/types/timeline';
  
  let { data }: { data: TimelineData } = $props();
  
  let container: HTMLElement;
  let timeline: HTMLElement;
  let scrollController: ScrollToHorizontal;
  let currentPosition = $state(0);
  
  onMount(() => {
    const totalWidth = data.events.length * 400 + 1000;
    
    scrollController = new ScrollToHorizontal(container, {
      totalWidth,
      sensitivity: 1.5
    });
    
    // Animate timeline position
    const updateLoop = () => {
      currentPosition = scrollController.position;
      gsap.to(timeline, {
        x: -currentPosition,
        duration: 0.1,
        ease: 'power2.out'
      });
      requestAnimationFrame(updateLoop);
    };
    
    updateLoop();
  });
</script>

<section bind:this={container} class="timeline-container">
  <div class="fixed-pointer" />
  
  <div bind:this={timeline} class="timeline-track">
    <!-- Base Branch Line -->
    <div class="base-branch" />
    
    {#each data.events as event, index}
      <TimelineNode 
        {event} 
        position={index * 400 + 500}
      />
    {/each}
  </div>
</section>

<style>
  .timeline-container {
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: white;
  }
  
  .fixed-pointer {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 4px;
    height: 100px;
    background: #3b82f6;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  
  .timeline-track {
    position: absolute;
    height: 100%;
    width: auto;
  }
  
  .base-branch {
    position: absolute;
    top: 50%;
    height: 4px;
    width: 100%;
    background: #000;
    transform: translateY(-50%);
  }
</style>
```

### 2.3 Interactive Features

#### Task 2.3.1: Timeline Node Component
```svelte
<!-- src/lib/components/TimelineNode.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { TimelineEvent } from '$lib/types/timeline';
  
  let { event, position }: { event: TimelineEvent; position: number } = $props();
  
  let isHovered = $state(false);
  let showModal = $state(false);
</script>

<div 
  class="timeline-node"
  style="left: {position}px; {event.position.branch === 'top' ? 'top' : 'bottom'}: {event.position.offset}px"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onclick={() => showModal = true}
>
  <div class="node-circle {event.category}">
    <!-- Icon based on category -->
  </div>
  
  {#if isHovered}
    <div class="tooltip" transition:fade={{ duration: 200 }}>
      <h4>{event.title}</h4>
      <p>{event.year}.{event.month.toString().padStart(2, '0')}</p>
    </div>
  {/if}
</div>

{#if showModal}
  <Modal {event} onClose={() => showModal = false} />
{/if}
```

---

## 🚀 Phase 3: Enhancement & Polish (Week 4)

### 3.1 Animation Choreography

#### Task 3.1.1: GSAP Timeline Animations
```typescript
// src/lib/animations/timelineAnimations.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTimelineAnimations() {
  // Branch growing animation
  gsap.from('.base-branch', {
    scaleX: 0,
    duration: 2,
    ease: 'power2.out',
    transformOrigin: 'left center'
  });
  
  // Node entrance animations
  gsap.utils.toArray('.timeline-node').forEach((node, i) => {
    gsap.from(node, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'back.out(1.7)'
    });
  });
}
```

### 3.2 Mobile Optimization

#### Task 3.2.1: Responsive Timeline
```typescript
// src/lib/hooks/useResponsive.ts
export function useResponsive() {
  let isMobile = $state(false);
  let isTablet = $state(false);
  
  $effect(() => {
    const checkDevice = () => {
      isMobile = window.innerWidth < 640;
      isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  });
  
  return { isMobile, isTablet };
}
```

---

## 🧪 Phase 4: Testing & Optimization (Week 4-5)

### 4.1 E2E Testing Setup

#### Task 4.1.1: Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } }
  ]
});
```

#### Task 4.1.2: Timeline Interaction Tests
```typescript
// tests/timeline.spec.ts
import { test, expect } from '@playwright/test';

test('timeline scroll interaction', async ({ page }) => {
  await page.goto('/');
  
  // Test vertical scroll to horizontal movement
  await page.mouse.wheel(0, 500);
  
  const timeline = await page.locator('.timeline-track');
  const transform = await timeline.evaluate(el => 
    window.getComputedStyle(el).transform
  );
  
  expect(transform).not.toBe('none');
});
```

### 4.2 Performance Optimization

#### Task 4.2.1: Image Optimization
```svelte
<!-- Using enhanced-img for optimized images -->
<script>
  import { enhanced } from '$lib/enhanced-img';
</script>

<enhanced:img 
  src="./profile.jpg" 
  alt="Profile" 
  sizes="(max-width: 640px) 100vw, 50vw"
/>
```

---

## 🚀 Phase 5: Deployment (Week 5)

### 5.1 Vercel Deployment

#### Task 5.1.1: Adapter Configuration
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x',
      maxDuration: 10
    })
  }
};
```

#### Task 5.1.2: Environment Setup
```bash
# .env.production
PUBLIC_BASE_URL=https://dongwon.dev
PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📊 Success Metrics & Validation

### Performance Targets
- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1
- **Timeline FPS**: 60fps consistent

### Quality Checklist
- [ ] Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
- [ ] Mobile gesture support (iOS/Android)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] SEO optimization (meta tags, structured data)
- [ ] Progressive enhancement
- [ ] Error handling and fallbacks

---

## 🎯 Immediate Next Steps

1. **Initialize Project**: Run the setup commands above
2. **Create Base Structure**: Set up routes and layouts
3. **Implement Scroll Logic**: Build the core transformation system
4. **Add Timeline Data**: Create the event data structure
5. **Test on Mobile**: Ensure touch gestures work smoothly

---

## 📝 Todo List

### High Priority
- [ ] Initialize SvelteKit project with TypeScript and Tailwind CSS
- [ ] Set up project structure and routing (/, /timeline, /contact)
- [ ] Install and configure GSAP for scroll animations
- [ ] Create timeline data structure and TypeScript interfaces
- [ ] Build scroll-to-horizontal transformation logic

### Medium Priority
- [ ] Implement landing page (First View) with basic layout
- [ ] Create timeline visualization components
- [ ] Implement modal/tooltip system for project details
- [ ] Add mobile touch gesture support

### Low Priority
- [ ] Create contact page layout
- [ ] Set up E2E testing with Playwright
- [ ] Deploy to Vercel and configure domain

This workflow provides a complete roadmap from concept to deployment for the interactive portfolio website with all the unique features specified in the requirements.