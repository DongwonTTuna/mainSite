# Portfolio Website Implementation Plan

> **⚠️ DEPRECATED**: This plan was created for the original Svelte 5 implementation. 
> 
> **For the current Qwik implementation, please refer to:**
> - **[PLAN-MIGRATION.md](./PLAN-MIGRATION.md)** - Comprehensive Svelte to Qwik migration guide
> - **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - Updated implementation plan with Qwik patterns
> 
> The content below is preserved for historical reference but should not be used for the current Qwik-based project.

## Development Environment Setup

- [ ] Initialize Qwik project with SSG
  - Tool: npm create qwik@latest
  - Implementation:
    1. Run `npm create qwik@latest`
    2. Select "Qwik City App" and "Static site (SSG)"
    3. Configure vite.config.ts for optimal build settings
    4. Run `npm run qwik add static` for SSG adapter
  - Requirements:
    - Qwik + Qwik City framework
    - TypeScript configuration
    - SSG adapter for static site generation
  - Test plan:
    - [ ] Verify useSignal() works in a test component
    - [ ] Check HMR works with component$
    - [ ] Confirm SSG build generates static HTML

- [ ] Install and configure GSAP animation library
  - Tool: npm/GSAP with ScrollTrigger
  - Implementation:
    1. Run `npm install gsap`
    2. Register ScrollTrigger plugin in useVisibleTask$
    3. Test basic animation with Qwik's lifecycle
  - Requirements:
    - GSAP for timeline animations
    - ScrollTrigger for scroll-based animations
    - Client-side only execution (useVisibleTask$)
  - Test plan:
    - [ ] GSAP imports work in components
    - [ ] Animations run only on client side
    - [ ] ScrollTrigger syncs with scroll

- [ ] Set up CSS architecture and design system
  - Tool: CSS Custom Properties + PostCSS
  - Implementation:
    1. Create app.css with CSS custom properties for theming
    2. Define color palette (dark theme)
    3. Set up typography scale
    4. Create spacing system (8px base)
    5. Configure PostCSS for autoprefixer
  - Requirements:
    - Dark theme by default
    - Responsive typography
    - CSS Grid support
  - Test plan:
    - [ ] CSS variables accessible in components
    - [ ] Dark theme applies correctly

## Core State Management

### Implement scroll state management
- [ ] Create scroll state store
  - Tool: Qwik Context API with useStore
  - Implementation:
    ```typescript
    // stores/scroll.ts
    import { createContextId } from '@builder.io/qwik';
    
    export interface ScrollStore {
      progress: number;
      velocity: number;
      direction: number;
      isScrolling: boolean;
    }
    
    export const ScrollContext = createContextId<ScrollStore>('scroll');
    
    // In component:
    const scrollStore = useStore<ScrollStore>({
      progress: 0,
      velocity: 0,
      direction: 0,
      isScrolling: false
    });
    ```
    1. Create context with createContextId
    2. Use useStore for reactive state
    3. Add scroll handler in useVisibleTask$
  - Requirements:
    - Track scroll progress (0-1)
    - Detect scroll velocity
    - Determine scroll direction
  - Test plan:
    - [ ] Store updates trigger re-renders
    - [ ] Context accessible in child components

### Implement timeline state management
- [ ] Create timeline state store
  - Tool: Qwik useStore + useComputed$
  - Implementation:
    ```typescript
    // stores/timeline.ts
    import { createContextId, useComputed$ } from '@builder.io/qwik';
    
    export interface TimelineStore {
      currentYear: number;
      selectedNode: string | null;
      hoveredNode: string | null;
      visibleNodes: string[];
    }
    
    export const TimelineContext = createContextId<TimelineStore>('timeline');
    
    // In component:
    const timelineStore = useStore<TimelineStore>({
      currentYear: 2022,
      selectedNode: null,
      hoveredNode: null,
      visibleNodes: []
    });
    
    const horizontalOffset = useComputed$(() => 
      scrollStore.progress * TIMELINE_WIDTH
    );
    ```
    1. Create timeline context and store
    2. Use useComputed$ for derived values
    3. Track user interactions with onClick$
  - Requirements:
    - Synchronize with scroll state
    - Track node visibility
    - Handle user interactions
  - Test plan:
    - [ ] Computed values update reactively
    - [ ] Event handlers work with $

## Component Implementation

### FirstView Component
- [ ] Create landing page component
  - Tool: Svelte 5 + Motion
  - Implementation:
    1. Create src/lib/components/FirstView.svelte
    2. Implement dark theme background
    3. Add name and title with fade-in animation
    4. Create social links component
    5. Add scroll indicator with bobbing animation
  - Requirements:
    - Fade-in animation on mount
    - Social links (GitHub, LinkedIn)
    - Scroll hint animation
  - Test plan:
    - [ ] Animations trigger on page load
    - [ ] Social links are clickable
    - [ ] Scroll indicator visible and animated

- [ ] Implement entrance animations
  - Tool: GSAP + useVisibleTask$
  - Implementation:
    ```typescript
    import { useVisibleTask$ } from '@builder.io/qwik';
    import gsap from 'gsap';
    
    useVisibleTask$(() => {
      gsap.fromTo('.title', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      );
      gsap.fromTo('.social-links', 
        { opacity: 0 }, 
        { opacity: 1, delay: 0.4 }
      );
    });
    ```
    1. Use useVisibleTask$ for client-side animations
    2. Stagger animations for visual hierarchy
    3. Add GSAP easing functions
  - Requirements:
    - Smooth fade-in effects
    - Proper timing sequence
    - No layout shift
  - Test plan:
    - [ ] Animations run once when visible
    - [ ] No SSR errors

### Timeline Container Component
- [ ] Create horizontal scrolling container
  - Tool: Qwik component$ + GSAP ScrollTrigger
  - Implementation:
    1. Create src/components/timeline/Timeline.tsx
    2. Set up fixed 100vh container
    3. Create horizontal timeline element with ref
    4. Implement scroll-to-horizontal transform
  - Requirements:
    - Vertical scroll transforms to horizontal movement
    - Smooth animation performance
    - Sticky positioning during scroll
  - Test plan:
    - [ ] Vertical scroll moves timeline horizontally
    - [ ] Performance maintains 60fps
    - [ ] No hydration issues

- [ ] Implement scroll-driven animation
  - Tool: GSAP ScrollTrigger
  - Implementation:
    ```typescript
    import { useVisibleTask$, useSignal } from '@builder.io/qwik';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    
    const timelineRef = useSignal<HTMLElement>();
    
    useVisibleTask$(() => {
      gsap.registerPlugin(ScrollTrigger);
      
      if (timelineRef.value) {
        gsap.to(timelineRef.value, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true
          }
        });
      }
    });
    ```
    1. Register ScrollTrigger plugin
    2. Create scrubbed animation
    3. Pin container during scroll
  - Requirements:
    - Smooth horizontal movement
    - Correct offset calculations
    - No jank or stutter
  - Test plan:
    - [ ] Timeline moves with scroll
    - [ ] Pinning works correctly

### Timeline Node Component
- [ ] Create individual timeline node
  - Tool: Qwik component$ with TypeScript
  - Implementation:
    1. Create src/components/timeline/TimelineNode.tsx
    2. Define props interface for node data
    3. Position based on date calculation
    4. Add hover/click handlers with $
  - Requirements:
    - Display date, title, type icon
    - Hover state with tooltip
    - Click to open modal (onClick$)
  - Test plan:
    - [ ] Nodes render at correct positions
    - [ ] Hover effects work
    - [ ] Click events fire with $

- [ ] Implement node animations
  - Tool: GSAP + Intersection Observer in useVisibleTask$
  - Implementation:
    ```typescript
    import { useVisibleTask$, useSignal } from '@builder.io/qwik';
    import gsap from 'gsap';
    
    const nodeRef = useSignal<HTMLElement>();
    
    useVisibleTask$(() => {
      if (nodeRef.value) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.fromTo(entry.target, 
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5 }
              );
            }
          });
        });
      
      observer.observe(node);
    });
    ```
    1. Set up intersection observer
    2. Animate nodes on visibility
    3. Add stagger effect
  - Requirements:
    - Nodes animate when entering viewport
    - Smooth scale and fade effects
    - One-time animation
  - Test plan:
    - [ ] Animations trigger at right time
    - [ ] Performance remains smooth

### Modal System
- [ ] Create modal component
  - Tool: Svelte 5 + Portal pattern
  - Implementation:
    1. Create src/lib/components/Timeline/NodeModal.svelte
    2. Implement backdrop with blur
    3. Add content container
    4. Handle open/close states
  - Requirements:
    - Smooth open/close transitions
    - Backdrop blur effect
    - ESC key to close
    - Click outside to close
  - Test plan:
    - [ ] Modal opens on node click
    - [ ] ESC key closes modal
    - [ ] Backdrop click closes modal

- [ ] Implement focus trap and accessibility
  - Tool: Custom focus management
  - Implementation:
    ```javascript
    let previousFocus;
    
    function trapFocus(node) {
      previousFocus = document.activeElement;
      const focusableElements = node.querySelectorAll('button, a, input');
      
      // Focus first element
      focusableElements[0]?.focus();
      
      return {
        destroy() {
          previousFocus?.focus();
        }
      };
    }
    ```
    1. Save previous focus
    2. Trap focus within modal
    3. Restore focus on close
  - Requirements:
    - Keyboard navigation works
    - Focus restored after close
    - ARIA attributes present
  - Test plan:
    - [ ] Tab navigation stays in modal
    - [ ] Focus returns to trigger element

### LastPage Component
- [ ] Create contact section
  - Tool: Svelte 5 component
  - Implementation:
    1. Create src/lib/components/LastPage.svelte
    2. Add contact headline
    3. Display email with mailto link
    4. Include social links again
    5. Add thank you message
  - Requirements:
    - Clean, minimal design
    - Accessible contact methods
    - Consistent with overall theme
  - Test plan:
    - [ ] Email link opens mail client
    - [ ] Social links functional
    - [ ] Layout responsive

## Data and Content Management

### Timeline Data Structure
- [ ] Create timeline data module
  - Tool: JavaScript modules
  - Implementation:
    1. Create src/lib/utils/timeline-data.js
    2. Define data structure for all events
    3. Include all timeline entries from 2022-2025
    4. Add helper functions for data access
  - Requirements:
    - Complete timeline data
    - Type-safe structure
    - Easy to maintain
  - Test plan:
    - [ ] All data entries valid
    - [ ] Dates in correct order
    - [ ] Required fields present

## Responsive Design Implementation

### Mobile Layout
- [ ] Implement mobile-specific timeline
  - Tool: CSS Media Queries + Svelte
  - Implementation:
    1. Create vertical timeline for mobile
    2. Adjust node sizing and spacing
    3. Implement touch gestures
    4. Full-screen modals
  - Requirements:
    - Works on devices < 768px
    - Touch-friendly interactions
    - Readable typography
  - Test plan:
    - [ ] Layout switches at breakpoint
    - [ ] Touch gestures work
    - [ ] Content remains accessible

### Tablet Layout
- [ ] Implement tablet optimizations
  - Tool: CSS Grid + Media Queries
  - Implementation:
    1. Hybrid scroll approach
    2. Optimize node spacing
    3. Side-panel modals
  - Requirements:
    - Works 768px - 1024px
    - Balanced information density
    - Smooth interactions
  - Test plan:
    - [ ] Layout appropriate for screen size
    - [ ] Interactions feel natural

## Performance Optimization

### Animation Performance
- [ ] Optimize scroll animations
  - Tool: CSS transforms + will-change
  - Implementation:
    1. Use transform instead of position
    2. Apply will-change judiciously
    3. Implement frame throttling
    4. Use CSS containment
  - Requirements:
    - Maintain 60fps
    - Smooth on mid-range devices
    - No memory leaks
  - Test plan:
    - [ ] Chrome DevTools shows 60fps
    - [ ] No frame drops during scroll
    - [ ] Memory usage stable

### Bundle Optimization
- [ ] Implement code splitting
  - Tool: Vite + Dynamic imports
  - Implementation:
    1. Split modal content
    2. Lazy load animation library
    3. Optimize CSS delivery
  - Requirements:
    - Initial bundle < 150KB
    - Fast initial paint
    - Progressive enhancement
  - Test plan:
    - [ ] Bundle size meets target
    - [ ] Lighthouse score > 95

## Accessibility Implementation

### Keyboard Navigation
- [ ] Implement full keyboard support
  - Tool: Native HTML + ARIA
  - Implementation:
    1. Add keyboard event handlers
    2. Implement focus indicators
    3. Support arrow key navigation
    4. Add skip links
  - Requirements:
    - All interactive elements keyboard accessible
    - Visible focus indicators
    - Logical tab order
  - Test plan:
    - [ ] Can navigate entire site with keyboard
    - [ ] Focus indicators visible
    - [ ] Tab order makes sense

### Screen Reader Support
- [ ] Add ARIA labels and live regions
  - Tool: ARIA attributes
  - Implementation:
    1. Label all interactive elements
    2. Add timeline navigation hints
    3. Announce timeline position
    4. Modal announcements
  - Requirements:
    - Meaningful labels
    - Context provided
    - State changes announced
  - Test plan:
    - [ ] Screen reader testing passes
    - [ ] All content accessible
    - [ ] Navigation clear

## Testing and Quality Assurance

### Unit Tests
- [ ] Write component tests
  - Tool: Vitest + Svelte Testing Library
  - Coverage target: 80%
  - Test scenarios:
    - [ ] State management works
    - [ ] Props passed correctly
    - [ ] Events fire as expected

### Integration Tests
- [ ] Test user flows
  - Tool: Playwright
  - Test scenarios:
    - [ ] Scroll animation works
    - [ ] Modal open/close flow
    - [ ] Responsive layouts
    - [ ] Keyboard navigation

### E2E Tests
- [ ] Test complete user journey
  - Tool: Playwright
  - Test scenarios:
    - [ ] Page loads correctly
    - [ ] Timeline scrolls smoothly
    - [ ] All interactions work
    - [ ] Performance benchmarks met

## Deployment Preparation

### Build Configuration
- [ ] Optimize production build
  - Tool: Vite configuration
  - Implementation:
    1. Configure minification
    2. Set up compression
    3. Generate source maps
    4. Configure caching headers
  - Requirements:
    - Optimized asset delivery
    - Proper cache strategies
    - Fast load times
  - Test plan:
    - [ ] Build completes without errors
    - [ ] Assets properly optimized

### Deployment Setup
- [ ] Configure hosting
  - Tool: Vercel/Netlify
  - Implementation:
    1. Set up deployment pipeline
    2. Configure environment variables
    3. Set up custom domain
    4. Enable HTTPS
  - Requirements:
    - Automated deployment
    - SSL certificate
    - CDN enabled
  - Test plan:
    - [ ] Deployment succeeds
    - [ ] Site accessible via HTTPS
    - [ ] Performance optimal

## Documentation

### Code Documentation
- [ ] Document component APIs
  - Tool: JSDoc comments
  - Requirements:
    - All props documented
    - Usage examples provided
    - State management explained

### User Documentation
- [ ] Create README
  - Tool: Markdown
  - Requirements:
    - Setup instructions
    - Development workflow
    - Deployment guide

### Architecture Documentation
- [ ] Document system design
  - Tool: Markdown + diagrams
  - Requirements:
    - Component hierarchy
    - State flow diagram
    - Performance considerations