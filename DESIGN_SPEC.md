# Interactive Portfolio Website - System Design Specification

## Project Overview
**Project**: Lee Dongwon Interactive Portfolio
**Objective**: Create a visually striking portfolio website featuring an interactive horizontal timeline that responds to vertical scrolling
**Tech Stack**: Qwik + Qwik City (SSG), Tailwind CSS, GSAP, Cloudflare Pages

## System Architecture

### 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
├─────────────────────────────────────────────────────────┤
│                  Qwik Application                        │
├──────────────┬────────────────┬────────────────────────┤
│  Components  │  State Manager │   Animation Engine      │
├──────────────┴────────────────┴────────────────────────┤
│                  Static Assets (CDN)                     │
└─────────────────────────────────────────────────────────┘
```

### 2. Application Structure

```
src/
├── routes/
│   └── index.tsx             # Main portfolio page
├── lib/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── FirstView.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── Contact.tsx
│   │   ├── timeline/
│   │   │   ├── TimelineContainer.tsx
│   │   │   ├── TimelineTrack.tsx
│   │   │   ├── TimelineNode.tsx
│   │   │   └── TimelinePointer.tsx
│   │   ├── ui/
│   │   │   ├── Modal.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   └── animations/
│   │       ├── FadeIn.tsx
│   │       └── Parallax.tsx
│   ├── stores/
│   │   ├── scroll.ts
│   │   └── timeline.ts
│   ├── hooks/
│   │   ├── useScrollHijack.tsx
│   │   ├── useTimelinePosition.tsx
│   │   └── useAnimation.tsx
│   ├── utils/
│   │   ├── animations.ts
│   │   └── responsive.ts
│   ├── data/
│   │   └── timeline.json
│   └── i18n/
│       ├── speak-config.ts
│       └── speak-functions.ts
├── i18n/
│   ├── en-US/
│   ├── ko/
│   └── ja/
└── public/
    ├── fonts/
    └── images/
```

## Component Design

### 1. Core Components

#### FirstView Component
```typescript
interface FirstViewProps {
  profile: {
    name: string;
    title: string;
    social: SocialLinks;
  };
}

// Features:
- Animated text entrance (staggered fade-in)
- Social link icons with hover effects
- Scroll indicator with bobbing animation
- Full viewport height with centered content
```

#### Timeline Component
```typescript
interface TimelineProps {
  events: TimelineEvent[];
  scrollProgress: number;
}

interface TimelineEvent {
  id: string;
  date: Date;
  type: 'education' | 'career' | 'project' | 'certification';
  title: string;
  subtitle?: string;
  description?: string;
  techStack?: string[];
  links?: Link[];
  position: 'above' | 'below';
  featured?: boolean;
}

// Features:
- Horizontal scroll controlled by vertical mouse wheel
- Fixed center pointer indicating current time
- Branching visualization for events
- Modal popups for detailed information
- Smooth parallax effects on scroll
```

#### Contact Component
```typescript
interface ContactProps {
  email: string;
  social: SocialLinks;
}

// Features:
- Clean, minimal design
- Animated entrance when scrolled into view
- Click-to-copy email functionality
- Social links with consistent styling
```

### 2. State Management

#### Scroll Store (Qwik Signals)
```typescript
// stores/scroll.ts
import { createContextId } from '@builder.io/qwik';

export interface ScrollStore {
  scrollY: number;
  scrollProgress: number;
  isScrolling: boolean;
  timelinePosition: number;
}

export const ScrollContext = createContextId<ScrollStore>('scroll');

// In component:
export const useScrollStore = () => {
  const store = useStore<ScrollStore>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolling: false,
    timelinePosition: 0
  });
  
  const updateScroll = $((deltaY: number) => {
    // Convert vertical scroll to horizontal progress
    store.scrollProgress = Math.max(0, Math.min(1, store.scrollProgress + deltaY / 10000));
    store.timelinePosition = store.scrollProgress * TIMELINE_WIDTH;
  });
  
  return { store, updateScroll };
};
```

#### Timeline Store
```typescript
// stores/timeline.ts
import { createContextId, useComputed$ } from '@builder.io/qwik';

export interface TimelineStore {
  events: TimelineEvent[];
  activeEvent: string | null;
  modalOpen: boolean;
  hoveredEvent: string | null;
}

export const TimelineContext = createContextId<TimelineStore>('timeline');

// In component:
export const useTimelineStore = () => {
  const store = useStore<TimelineStore>({
    events: [],
    activeEvent: null,
    modalOpen: false,
    hoveredEvent: null
  });
  
  const visibleEvents = useComputed$(() => {
    // Calculate which events are in viewport
    return store.events.filter(event => {
      // Visibility logic based on scroll position
    });
  });
  
  return { store, visibleEvents };
};
```

## Animation System

### 1. Scroll Hijacking Implementation
```typescript
// hooks/useScrollHijack.tsx
import { useVisibleTask$, useSignal } from '@builder.io/qwik';

export function useScrollHijack(scrollStore: ScrollStore) {
  const velocity = useSignal(0);
  const rafId = useSignal<number>(0);
  const friction = 0.95;
  
  useVisibleTask$(({ cleanup }) => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      velocity.value += e.deltaY * 0.5;
    }
    
    function updateScroll() {
      if (Math.abs(velocity.value) > 0.1) {
        scrollStore.updateScroll(velocity.value);
        velocity.value *= friction;
        rafId.value = requestAnimationFrame(updateScroll);
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    updateScroll();
    
    cleanup(() => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(rafId.value);
    });
  });
}
```

### 2. GSAP Integration
```typescript
// utils/animations.ts
import { useVisibleTask$ } from '@builder.io/qwik';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useTimelineAnimation() {
  const timelineRef = useSignal<HTMLElement>();
  
  useVisibleTask$(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (timelineRef.value) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.value,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  });
  
  return timelineRef;
}

export function useNodeAnimation(nodeRef: Signal<HTMLElement | undefined>) {
  useVisibleTask$(() => {
    if (nodeRef.value) {
      gsap.from(nodeRef.value, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }
  });
}
```

### 3. Mobile Touch Handling
```typescript
// hooks/useTouchScroll.tsx
import { useVisibleTask$, useSignal } from '@builder.io/qwik';

export function useTouchScroll(scrollStore: ScrollStore) {
  const touchStartX = useSignal(0);
  const currentX = useSignal(0);
  
  useVisibleTask$(({ cleanup }) => {
    function handleTouchStart(e: TouchEvent) {
      touchStartX.value = e.touches[0].clientX;
    }
    
    function handleTouchMove(e: TouchEvent) {
      currentX.value = e.touches[0].clientX;
      const deltaX = touchStartX.value - currentX.value;
      scrollStore.updateScroll(deltaX);
    }
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    
    cleanup(() => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    });
  });
}
```

## Data Structure

### Timeline Data Format
```json
{
  "profile": {
    "name": "Lee Dongwon",
    "title": "Full Stack Engineer",
    "email": "contact@example.com",
    "social": {
      "github": "https://github.com/DongwonTTuna",
      "linkedin": "https://linkedin.com/in/..."
    }
  },
  "timeline": [
    {
      "id": "edu-2022-04",
      "date": "2022-04-01",
      "type": "education",
      "title": "Tokyo IT Creator Academy",
      "subtitle": "Enrollment",
      "position": "above",
      "featured": true
    },
    {
      "id": "proj-2022-05",
      "date": "2022-05-01",
      "type": "project",
      "title": "Seat Arrangement System",
      "subtitle": "Personal Project",
      "description": "Interactive classroom seat arrangement tool",
      "techStack": ["JavaScript", "HTML5", "CSS3"],
      "position": "below",
      "links": [
        { "type": "github", "url": "https://github.com/..." }
      ]
    }
  ]
}
```

## Performance Optimization

### 1. Rendering Strategy
- **Static Generation**: Pre-render timeline data at build time
- **Lazy Loading**: Load modal content on demand
- **Virtual Scrolling**: Only render visible timeline nodes
- **GPU Acceleration**: Use transform3d for animations

### 2. Asset Optimization
```typescript
// Image optimization config
export const imageConfig = {
  formats: ['webp', 'jpg'],
  sizes: [640, 1280, 1920],
  quality: 85
};

// Font subsetting for Japanese characters
export const fontConfig = {
  subset: 'japanese',
  display: 'swap',
  preload: true
};
```

### 3. Bundle Optimization
- Code splitting by route
- Tree shaking unused Tailwind classes
- Minification and compression
- CDN deployment for static assets

## Responsive Design

### Breakpoint Strategy
```scss
// Mobile: < 768px - Vertical timeline
// Tablet: 768px - 1024px - Simplified horizontal
// Desktop: > 1024px - Full interactive experience

@media (max-width: 767px) {
  .timeline {
    // Convert to vertical layout
    // Touch-friendly tap targets
    // Reduced animations
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .timeline {
    // Horizontal scroll with touch
    // Larger hit areas
    // Simplified node design
  }
}
```

## Accessibility

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Tab through timeline nodes
- **Screen Readers**: ARIA labels and live regions
- **Motion Preferences**: Respect prefers-reduced-motion
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Indicators**: Visible focus states

### Implementation
```tsx
import { component$ } from '@builder.io/qwik';

export const Timeline = component$(() => {
  const { store } = useTimelineStore();
  
  return (
    <div 
      role="region" 
      aria-label="Career Timeline"
      aria-live="polite"
    >
      {store.events.map((event) => (
        <button
          key={event.id}
          role="button"
          aria-label={`${event.title} - ${formatDate(event.date)}`}
          aria-expanded={store.modalOpen && store.activeEvent === event.id}
          tabindex="0"
          onClick$={() => {
            store.activeEvent = event.id;
            store.modalOpen = true;
          }}
        >
          {/* Timeline node content */}
        </button>
      ))}
    </div>
  );
});
```

## Testing Strategy

### 1. Unit Tests
- Component props and rendering
- Store state updates
- Utility functions
- Animation calculations

### 2. Integration Tests
- Scroll behavior across browsers
- Modal interactions
- Responsive breakpoints
- Animation performance

### 3. E2E Tests
```typescript
// Playwright test example
test('timeline scrolls horizontally on vertical wheel', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.timeline');
  
  const initialPosition = await page.evaluate(() => window.scrollX);
  await page.mouse.wheel(0, 100);
  
  const newPosition = await page.evaluate(() => window.scrollX);
  expect(newPosition).toBeGreaterThan(initialPosition);
});
```

## Deployment Configuration

### Cloudflare Pages Deployment
```json
// wrangler.toml
name = "dongwontuna-portfolio"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"

[build]
command = "npm run build.server"

[[build.upload]]
format = "service-worker"

// _routes.json (auto-generated)
{
  "include": ["/*"],
  "exclude": [
    "/_headers",
    "/_redirects",
    "/build/*",
    "/favicon.ico",
    "/manifest.json"
  ],
  "version": 1
}
```

## Implementation Timeline

### Phase 1: Foundation (Week 1)
- [ ] Project setup with Qwik + Qwik City
- [ ] SSG configuration with static adapter
- [ ] Basic component structure (.tsx)
- [ ] Static timeline data
- [ ] Responsive layout with Tailwind CSS

### Phase 2: Interactions (Week 2)
- [ ] Scroll hijacking implementation
- [ ] Timeline navigation
- [ ] Basic animations
- [ ] Touch support

### Phase 3: Polish (Week 3)
- [ ] Advanced animations with GSAP
- [ ] Modal system
- [ ] Performance optimization
- [ ] Cross-browser testing

### Phase 4: Launch (Week 4)
- [ ] Final testing
- [ ] Deployment setup
- [ ] Performance monitoring
- [ ] Documentation

## Technical Decisions

### Why Qwik + Qwik City?
- Revolutionary resumability (no hydration needed)
- Automatic code splitting (~1KB initial JS)
- Built-in SSG capabilities with static adapter
- Fine-grained lazy loading
- Superior performance for Core Web Vitals

### Why GSAP over Framer Motion?
- More powerful scroll-based animations
- Better performance for complex timelines
- Mature ecosystem and documentation
- Cross-framework compatibility

### Why Tailwind CSS?
- Rapid prototyping
- Consistent design system
- Minimal CSS bundle with purging
- Easy responsive utilities

## Risk Mitigation

### Potential Issues & Solutions
1. **Scroll Performance on Low-End Devices**
   - Solution: Implement quality levels, reduce animations on detection

2. **Browser Compatibility (Safari)**
   - Solution: Extensive testing, polyfills for smooth scrolling

3. **SEO for Dynamic Content**
   - Solution: SSG with proper meta tags, structured data

4. **Large Timeline Data**
   - Solution: Virtual scrolling, progressive loading

## Conclusion

This design provides a solid foundation for building an impressive, performant, and accessible portfolio website. The modular architecture allows for easy maintenance and future enhancements while the animation system creates an engaging user experience that showcases technical expertise.