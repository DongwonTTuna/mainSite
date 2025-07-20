# Interactive Portfolio Website - System Design Specification

## Project Overview
**Project**: Lee Dongwon Interactive Portfolio
**Objective**: Create a visually striking portfolio website featuring an interactive horizontal timeline that responds to vertical scrolling
**Tech Stack**: SvelteKit 5 (Runes), Tailwind CSS, GSAP, Vercel

## System Architecture

### 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
├─────────────────────────────────────────────────────────┤
│                 SvelteKit Application                    │
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
│   └── +page.svelte          # Main portfolio page
├── lib/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── FirstView.svelte
│   │   │   ├── Timeline.svelte
│   │   │   └── Contact.svelte
│   │   ├── timeline/
│   │   │   ├── TimelineContainer.svelte
│   │   │   ├── TimelineTrack.svelte
│   │   │   ├── TimelineNode.svelte
│   │   │   └── TimelinePointer.svelte
│   │   ├── ui/
│   │   │   ├── Modal.svelte
│   │   │   ├── SocialLinks.svelte
│   │   │   └── ScrollIndicator.svelte
│   │   └── animations/
│   │       ├── FadeIn.svelte
│   │       └── Parallax.svelte
│   ├── stores/
│   │   ├── scroll.ts
│   │   └── timeline.ts
│   ├── hooks/
│   │   ├── useScrollHijack.ts
│   │   ├── useTimelinePosition.ts
│   │   └── useAnimation.ts
│   ├── utils/
│   │   ├── animations.ts
│   │   └── responsive.ts
│   └── data/
│       └── timeline.json
├── static/
│   ├── fonts/
│   └── images/
└── app.html
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

#### Scroll Store (Svelte 5 Runes)
```typescript
// stores/scroll.ts
class ScrollStore {
  scrollY = $state(0);
  scrollProgress = $state(0);
  isScrolling = $state(false);
  
  timelinePosition = $derived(() => {
    return this.scrollProgress * TIMELINE_WIDTH;
  });
  
  updateScroll(deltaY: number) {
    // Convert vertical scroll to horizontal progress
  }
}
```

#### Timeline Store
```typescript
// stores/timeline.ts
class TimelineStore {
  events = $state<TimelineEvent[]>([]);
  activeEvent = $state<string | null>(null);
  modalOpen = $state(false);
  
  hoveredEvent = $state<string | null>(null);
  
  visibleEvents = $derived(() => {
    // Calculate which events are in viewport
  });
}
```

## Animation System

### 1. Scroll Hijacking Implementation
```typescript
// hooks/useScrollHijack.ts
export function useScrollHijack() {
  let rafId: number;
  let velocity = 0;
  const friction = 0.95;
  
  $effect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      velocity += e.deltaY * 0.5;
    }
    
    function updateScroll() {
      if (Math.abs(velocity) > 0.1) {
        scrollStore.updateScroll(velocity);
        velocity *= friction;
        rafId = requestAnimationFrame(updateScroll);
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    updateScroll();
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(rafId);
    };
  });
}
```

### 2. GSAP Integration
```typescript
// utils/animations.ts
export function createTimelineAnimation(element: HTMLElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom center",
      scrub: 1,
    }
  });
  
  return tl;
}

export function animateNodeEntrance(node: HTMLElement) {
  gsap.from(node, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(1.7)"
  });
}
```

### 3. Mobile Touch Handling
```typescript
// hooks/useTouchScroll.ts
export function useTouchScroll() {
  let touchStartX = 0;
  let currentX = 0;
  
  $effect(() => {
    function handleTouchStart(e: TouchEvent) {
      touchStartX = e.touches[0].clientX;
    }
    
    function handleTouchMove(e: TouchEvent) {
      currentX = e.touches[0].clientX;
      const deltaX = touchStartX - currentX;
      scrollStore.updateScroll(deltaX);
    }
    
    // Add event listeners with proper cleanup
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
```svelte
<div 
  role="region" 
  aria-label="Career Timeline"
  aria-live="polite"
>
  {#each events as event}
    <button
      role="button"
      aria-label={`${event.title} - ${formatDate(event.date)}`}
      aria-expanded={modalOpen && activeEvent === event.id}
      tabindex="0"
    >
      <!-- Timeline node content -->
    </button>
  {/each}
</div>
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

### Vercel Deployment
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".svelte-kit/output",
  "framework": "sveltekit",
  "regions": ["hnd1", "sfo1"],
  "functions": {
    "routes/*": {
      "memory": 512
    }
  }
}
```

## Implementation Timeline

### Phase 1: Foundation (Week 1)
- [ ] Project setup with SvelteKit 5
- [ ] Basic component structure
- [ ] Static timeline data
- [ ] Responsive layout

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

### Why SvelteKit 5 with Runes?
- Superior performance with compiled output
- Built-in SSG capabilities
- Simpler state management with Runes
- Excellent developer experience

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