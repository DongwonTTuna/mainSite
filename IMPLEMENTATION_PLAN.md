# Interactive Portfolio - Implementation Plan

> **Note**: This implementation plan has been updated to reflect the migration from Svelte 5 to Qwik with SSG. All code examples and configurations now use Qwik patterns and best practices.

## Project Setup & Configuration

### Phase 1: Environment Setup (Day 1)

- [ ] Initialize Qwik project with TypeScript
  - Command: `npm create qwik@latest`
  - Options: Qwik City App, Static site (SSG)
  
- [ ] Install core dependencies
  ```bash
  # Styling
  npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
  
  # Animation
  npm install gsap
  
  # i18n
  npm install qwik-speak
  
  # Icons (if needed)
  npm install -D unplugin-icons
  ```
  
- [ ] Configure SSG adapter
  ```bash
  npm run qwik add static
  ```

- [ ] Configure Tailwind CSS
  - Initialize: `npx tailwindcss init -p`
  - Add custom animations and utilities
  - Configure purge paths

- [ ] Setup project structure
  - Create directory structure as per design spec
  - Configure path aliases in `vite.config.ts`
  - Setup environment variables

## Component Development

### Phase 2: Core Components (Days 2-4)

#### Day 2: Layout and FirstView
- [ ] Create base layout component
  - SEO meta tags
  - Font loading (Japanese support)
  - Global styles

- [ ] Implement FirstView section
  ```tsx
  // src/components/sections/FirstView.tsx
  - Hero text with staggered animations (useVisibleTask$)
  - Social links component
  - Scroll indicator with CSS animation
  - Responsive design
  - Multi-language support with inlineTranslate
  ```

- [ ] Setup animation utilities
  - GSAP configuration
  - Custom easing functions
  - Animation hooks

#### Day 3: Timeline Foundation
- [ ] Create scroll management system
  ```typescript
  // src/lib/stores/scroll.ts
  - Scroll hijacking logic with useVisibleTask$
  - Progress calculation with useSignal
  - Velocity and momentum tracking
  - Context-based state sharing
  ```

- [ ] Build Timeline components
  - TimelineContainer (scroll wrapper)
  - TimelineTrack (horizontal line)
  - TimelinePointer (fixed center indicator)
  - TimelineNode (event markers)

#### Day 4: Timeline Interactions
- [ ] Implement timeline data structure
  - Create `timeline.json` with all events
  - Type definitions
  - Data validation

- [ ] Add timeline interactivity
  - Hover states for nodes
  - Click handlers for modals
  - Tooltip system
  - Branch connections

### Phase 3: Advanced Features (Days 5-7)

#### Day 5: Modal System
- [ ] Create Modal components
  ```tsx
  // src/components/ui/Modal.tsx
  - Backdrop with blur
  - Content container
  - Smooth transitions (CSS)
  - Close on escape/click outside (onClick$)
  - Portal rendering for proper z-index
  ```

- [ ] Implement modal content
  - Project details view
  - Image gallery support
  - Tech stack badges
  - External links

#### Day 6: Animations & Polish
- [ ] GSAP ScrollTrigger integration
  - Timeline scrubbing
  - Parallax effects
  - Stagger animations
  - Performance optimization

- [ ] Add micro-interactions
  - Button hover effects
  - Link underline animations
  - Loading states
  - Page transitions

#### Day 7: Contact Section & Mobile
- [ ] Build Contact section
  - Clean layout
  - Email copy functionality
  - Social links (reuse component)
  - Entrance animations

- [ ] Mobile optimization
  - Touch event handling
  - Vertical timeline layout
  - Reduced animations
  - Gesture support

## Testing & Optimization

### Phase 4: Quality Assurance (Days 8-9)

#### Day 8: Testing Implementation
- [ ] Unit tests setup
  ```typescript
  // Component tests with Vitest + @builder.io/qwik/testing
  - Component rendering with createDOM
  - Signal updates validation
  - Event handling with $
  - Store context testing
  ```

- [ ] Integration tests
  - Scroll behavior
  - Modal functionality
  - Responsive layouts
  - Animation performance

- [ ] Cross-browser testing
  - Chrome, Firefox, Safari, Edge
  - Mobile browsers
  - Touch device testing

#### Day 9: Performance Optimization
- [ ] Performance audit
  - Lighthouse testing
  - Bundle analysis
  - Image optimization
  - Font subsetting

- [ ] Optimization implementation
  - Lazy loading
  - Code splitting
  - Asset compression
  - CDN setup

## Deployment & Launch

### Phase 5: Production Ready (Days 10-11)

#### Day 10: Final Polish
- [ ] Accessibility audit
  - Keyboard navigation
  - Screen reader testing
  - ARIA labels
  - Focus management

- [ ] SEO optimization
  - Meta tags
  - Open Graph
  - Structured data
  - Sitemap

#### Day 11: Deployment
- [ ] Cloudflare Pages configuration
  - Build settings for SSG
  - Environment variables
  - Domain setup
  - _routes.json configuration
  - Analytics integration

- [ ] Launch checklist
  - Final testing
  - Performance monitoring
  - Error tracking
  - Backup plan

## Code Implementation Examples

### 1. Scroll Hijacking Hook
```typescript
// src/lib/hooks/useScrollHijack.tsx
import { useVisibleTask$, useSignal, $ } from '@builder.io/qwik';
import type { ScrollStore } from '~/lib/stores/scroll';

export function useScrollHijack(scrollStore: ScrollStore) {
  const isScrolling = useSignal(false);
  const scrollTimeout = useSignal<number | null>(null);
  
  const handleWheel = $((e: WheelEvent) => {
    e.preventDefault();
    
    if (!isScrolling.value) {
      isScrolling.value = true;
      scrollStore.isScrolling = true;
    }
    
    if (scrollTimeout.value) {
      clearTimeout(scrollTimeout.value);
    }
    
    scrollTimeout.value = window.setTimeout(() => {
      isScrolling.value = false;
      scrollStore.isScrolling = false;
    }, 150);
    
    scrollStore.scrollProgress += e.deltaY / 10000;
    scrollStore.scrollProgress = Math.max(0, Math.min(1, scrollStore.scrollProgress));
  });
  
  useVisibleTask$(({ cleanup }) => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    cleanup(() => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.value) {
        clearTimeout(scrollTimeout.value);
      }
    });
  });
}
```

### 2. Timeline Node Component
```tsx
// src/components/timeline/TimelineNode.tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { TimelineEvent } from '~/lib/types';

interface TimelineNodeProps {
  event: TimelineEvent;
  isActive: boolean;
  onNodeClick$: (id: string) => void;
}

export const TimelineNode = component$<TimelineNodeProps>(({ 
  event, 
  isActive,
  onNodeClick$ 
}) => {
  const nodeRef = useSignal<HTMLElement>();
  
  useVisibleTask$(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (nodeRef.value) {
      gsap.from(nodeRef.value, {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: nodeRef.value,
          start: 'center center',
          toggleActions: 'play none none reverse'
        }
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });
  
  return (
    <button
      ref={nodeRef}
      class={`timeline-node ${event.position} ${isActive ? 'active' : ''}`}
      aria-label={event.title}
      onClick$={() => onNodeClick$(event.id)}
    >
      <div class="node-content">
        <span class="date">{formatDate(event.date)}</span>
        <h3>{event.title}</h3>
      </div>
    </button>
  );
});
```

### 3. Mobile Touch Handler
```typescript
// src/lib/hooks/useTouchScroll.tsx
import { useVisibleTask$, useSignal, $ } from '@builder.io/qwik';
import type { ScrollStore } from '~/lib/stores/scroll';

export function useTouchScroll(scrollStore: ScrollStore) {
  const containerRef = useSignal<HTMLElement>();
  const startX = useSignal(0);
  const scrollLeft = useSignal(0);
  
  const handleStart = $((e: TouchEvent) => {
    if (!containerRef.value) return;
    startX.value = e.touches[0].pageX - containerRef.value.offsetLeft;
    scrollLeft.value = containerRef.value.scrollLeft;
  });
  
  const handleMove = $((e: TouchEvent) => {
    if (!startX.value || !containerRef.value) return;
    e.preventDefault();
    
    const x = e.touches[0].pageX - containerRef.value.offsetLeft;
    const walk = (x - startX.value) * 2;
    containerRef.value.scrollLeft = scrollLeft.value - walk;
    
    // Update scroll store
    const maxScroll = containerRef.value.scrollWidth - containerRef.value.clientWidth;
    scrollStore.scrollProgress = containerRef.value.scrollLeft / maxScroll;
  });
  
  useVisibleTask$(({ cleanup }) => {
    if (containerRef.value) {
      containerRef.value.addEventListener('touchstart', handleStart);
      containerRef.value.addEventListener('touchmove', handleMove);
      
      cleanup(() => {
        if (containerRef.value) {
          containerRef.value.removeEventListener('touchstart', handleStart);
          containerRef.value.removeEventListener('touchmove', handleMove);
        }
      });
    }
  });
  
  return containerRef;
}
```

## Development Workflow

### Daily Tasks
1. **Morning**: Review previous day's work, plan current tasks
2. **Development**: Focus on one phase at a time
3. **Testing**: Test each component as built
4. **Evening**: Commit changes, update progress

### Git Workflow
```bash
# Feature branches
git checkout -b feature/timeline-components
git checkout -b feature/animations
git checkout -b feature/mobile-optimization

# Commit messages
feat: implement scroll hijacking system
fix: resolve Safari scroll performance issue
style: update timeline node hover states
perf: optimize image loading with lazy load
```

## Risk Management

### Potential Blockers & Solutions

1. **GSAP ScrollTrigger Performance**
   - Monitor FPS during development
   - Implement quality levels
   - Use CSS transforms only

2. **Mobile Browser Compatibility**
   - Test early and often
   - Progressive enhancement approach
   - Fallback to native scroll if needed

3. **Timeline Data Management**
   - Keep data structure simple
   - Validate at build time
   - Consider CMS integration later

## Success Metrics

### Technical Goals
- [ ] Lighthouse score > 90
- [ ] < 3s load time on 3G
- [ ] 60fps scroll performance
- [ ] Zero accessibility errors

### User Experience Goals
- [ ] Smooth, intuitive navigation
- [ ] Clear information hierarchy
- [ ] Memorable interactions
- [ ] Fast, responsive interface

## Resources & References

### Documentation
- [Qwik Documentation](https://qwik.builder.io/)
- [Qwik City SSG Guide](https://qwik.builder.io/docs/guides/static-site-generation/)
- [Qwik Speak i18n](https://github.com/robisim74/qwik-speak)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Tailwind CSS](https://tailwindcss.com/)

### Inspiration
- Apple's product pages (scroll effects)
- Awwwards timeline examples
- Japanese design aesthetics

This implementation plan provides a clear roadmap for building the portfolio website with daily goals and practical code examples.