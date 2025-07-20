# Portfolio Website Pre-Research and Design Document

## 1. Requirements Analysis

Based on the project specifications (implement.md), the portfolio website for Lee Dongwon (이동원) requires:

### Core Requirements
- **First View (FV)**: Dark theme landing page with name, title, and social links
- **Middle Page**: Interactive horizontal timeline (2022-2025) that scrolls horizontally when user scrolls vertically
- **Last Page**: Contact information section
- **Responsive Design**: Must work seamlessly on mobile, tablet, and desktop
- **Performance**: Optimized loading and smooth animations
- **Tech Stack**: Svelte 5 with Runes (as specified in CLAUDE.md)

### Key Features
- Vertical scroll to horizontal scroll transformation
- Timeline with branching nodes for different activities
- Hover tooltips on timeline nodes
- Click modals for detailed project information
- Smooth transitions and animations
- Mobile touch gesture support

## 2. Technology Stack Research

### 2.1 Svelte 5 with Runes
Svelte 5 introduces a new reactivity system based on "Runes" - compiler primitives that provide explicit reactive state management.

**Key Runes for this project:**
- `$state()`: Reactive state declaration
- `$derived()`: Computed values
- `$effect()`: Side effects and lifecycle management
- `$props()`: Component property handling
- `$bindable()`: Two-way binding support

**Selection Rationale:**
- Zero runtime overhead - compiler optimizes everything
- Excellent performance for animations and scroll-driven interactions
- Native support for reactive programming patterns
- Built-in transition and animation capabilities

**Important Patterns:**
```javascript
// Reactive state
let scrollProgress = $state(0);
let timelinePosition = $derived(scrollProgress * totalWidth);

// Effects for scroll handling
$effect(() => {
  // Handle scroll events and update state
});
```

### 2.2 Animation Libraries

After researching both Motion and GSAP, I recommend using **Motion** for this project.

**Motion (Recommended)**
- Lightweight (5.2KB for scroll functionality)
- Modern API designed for performance
- Native Scroll Timeline API support
- Excellent spring physics for natural animations
- Works seamlessly with vanilla JavaScript/Svelte

**Key Features:**
- `scroll()` function for scroll-linked animations
- Spring animations with customizable physics
- Hardware-accelerated transforms
- Scroll velocity detection

**GSAP + ScrollTrigger (Alternative)**
- More mature ecosystem
- Extensive documentation and examples
- Larger bundle size (~25KB for core + ScrollTrigger)
- More complex API but more features

**Decision:** Motion provides everything needed for this project with a smaller footprint and cleaner API.

### 2.3 Horizontal Scrolling Implementation

**Approach:** Transform vertical scroll input into horizontal timeline movement using Motion's scroll function.

```javascript
import { scroll, animate } from "motion";

// Create horizontal scroll effect
const timelineContainer = document.querySelector('.timeline');
const animation = animate(timelineContainer, 
  { x: [0, -totalWidth] },
  { ease: "linear" }
);

scroll(animation, {
  target: window,
  offset: ["start start", "end end"]
});
```

### 2.4 CSS Architecture
- **Tailwind CSS** or **CSS Custom Properties** for theming
- CSS Grid for timeline layout
- CSS transforms for performance
- Will-change property for optimization

## 3. System Architecture Design

### Component Structure
```
src/
├── lib/
│   ├── components/
│   │   ├── FirstView.svelte
│   │   ├── Timeline/
│   │   │   ├── Timeline.svelte
│   │   │   ├── TimelineNode.svelte
│   │   │   ├── TimelineBranch.svelte
│   │   │   └── NodeModal.svelte
│   │   ├── LastPage.svelte
│   │   └── common/
│   │       ├── SocialLinks.svelte
│   │       └── ScrollIndicator.svelte
│   ├── stores/
│   │   ├── scroll.js
│   │   ├── timeline.js
│   │   └── ui.js
│   └── utils/
│       ├── animations.js
│       ├── responsive.js
│       └── timeline-data.js
├── routes/
│   └── +page.svelte
└── app.css
```

### State Management Architecture
```javascript
// stores/scroll.js
export const scrollState = {
  progress: $state(0),
  velocity: $state(0),
  direction: $state(0),
  isScrolling: $state(false)
};

// stores/timeline.js
export const timelineState = {
  currentYear: $state(2022),
  selectedNode: $state(null),
  hoveredNode: $state(null),
  horizontalOffset: $derived(() => scrollState.progress * TIMELINE_WIDTH)
};
```

### Data Flow
1. User scrolls vertically → Scroll event captured
2. Scroll progress calculated → State updated
3. Horizontal offset derived → Timeline transforms
4. Nodes check visibility → Animations trigger
5. User interactions → Modals/tooltips display

## 4. Detailed Design

### 4.1 First View Component
**Responsibilities:**
- Display name and title with fade-in animation
- Render social links with hover effects
- Show scroll indicator with bobbing animation
- Handle dark theme styling

**Implementation Details:**
- Use Motion's `animate()` for entrance animations
- CSS Grid for layout
- Custom SVG icons for social links
- Intersection Observer for lazy animation triggering

### 4.2 Timeline Component
**Core Mechanism:**
- Fixed-height container (100vh)
- Horizontal timeline that extends beyond viewport
- Transform based on scroll progress
- Sticky positioning during scroll

**Node System:**
- Base branch as horizontal line
- Nodes positioned absolutely along timeline
- Branches extend up/down from nodes
- Each node contains:
  - Date marker
  - Activity type icon
  - Brief description
  - Interaction handlers

**Interaction Patterns:**
- Hover: Show tooltip with summary
- Click: Open modal with full details
- Scroll: Animate node entrance/exit

### 4.3 Timeline Data Structure
```javascript
const timelineData = [
  {
    id: 'edu-start-2022',
    date: '2022-04',
    type: 'education',
    title: '도쿄정보크리에이터공학원 입학',
    branch: 'top',
    details: {
      description: 'Started studies at Tokyo IT Creator College',
      skills: ['Programming Fundamentals', 'Web Development'],
      links: []
    }
  },
  // ... more entries
];
```

### 4.4 Modal System
**Features:**
- Backdrop blur effect
- Smooth open/close transitions
- Responsive layout
- Keyboard navigation (ESC to close)
- Focus trap for accessibility

**Content Structure:**
- Project title and date
- Technology stack badges
- Detailed description
- Screenshots/demos (if applicable)
- External links

### 4.5 Responsive Design Strategy
**Mobile (< 768px):**
- Simplified timeline with vertical scrolling
- Touch gestures for timeline navigation
- Full-screen modals
- Larger touch targets

**Tablet (768px - 1024px):**
- Hybrid approach with partial horizontal scroll
- Optimized node spacing
- Side-panel modals

**Desktop (> 1024px):**
- Full horizontal scroll experience
- Hover interactions enabled
- Centered modal overlays

## 5. Technical Considerations

### 5.1 Performance Optimization
**Critical Strategies:**
- Use CSS transforms (not position changes)
- Implement virtual scrolling for timeline nodes
- Lazy load modal content
- Debounce scroll events
- Use will-change CSS property judiciously
- Preload critical assets

**Code Splitting:**
- Separate modal content into dynamic imports
- Load animation library only when needed
- Split CSS by component

### 5.2 Accessibility
- ARIA labels for timeline navigation
- Keyboard navigation support
- Screen reader announcements for timeline position
- Focus management in modals
- Sufficient color contrast
- Reduced motion preferences support

### 5.3 Browser Compatibility
- Target modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Fallback for browsers without Scroll Timeline API
- Progressive enhancement approach
- Test touch events on various devices

### 5.4 SEO Considerations
- Server-side rendering with SvelteKit
- Structured data for timeline events
- Meta tags for social sharing
- Semantic HTML structure
- Performance metrics optimization

## 6. Risk Assessment and Mitigation

### 6.1 Technical Risks
**Risk:** Horizontal scroll performance on low-end devices
- **Mitigation:** Implement quality settings, reduce node count on mobile, use CSS containment

**Risk:** Browser compatibility issues with Scroll Timeline API
- **Mitigation:** Use Motion library's polyfill, implement fallback with traditional scroll listeners

**Risk:** Large timeline data causing memory issues
- **Mitigation:** Implement virtualization, load nodes on demand

### 6.2 UX Risks
**Risk:** Users not understanding horizontal scroll mechanic
- **Mitigation:** Clear visual indicators, tutorial on first visit, intuitive scroll hints

**Risk:** Mobile users struggling with timeline navigation
- **Mitigation:** Alternative mobile layout, touch-optimized controls, swipe gestures

### 6.3 Development Risks
**Risk:** Svelte 5 Runes being relatively new
- **Mitigation:** Thorough testing, fallback patterns, active community monitoring

## 7. Development Roadmap

### Phase 1: Foundation (Days 1-2)
- Set up Svelte 5 project with TypeScript
- Configure build tools and development environment
- Implement basic routing and layout structure
- Create design system (colors, typography, spacing)

### Phase 2: Core Components (Days 3-5)
- Build FirstView component with animations
- Implement basic Timeline container
- Create scroll state management
- Add responsive grid system

### Phase 3: Timeline Implementation (Days 6-9)
- Develop horizontal scroll mechanism
- Create TimelineNode components
- Implement timeline data structure
- Add node positioning logic

### Phase 4: Interactions (Days 10-12)
- Add hover tooltips
- Implement modal system
- Create smooth transitions
- Add keyboard navigation

### Phase 5: Polish and Optimization (Days 13-15)
- Performance optimization
- Mobile experience refinement
- Accessibility testing
- Cross-browser testing
- Final animations and transitions

### Phase 6: Content and Deployment (Days 16-17)
- Add all timeline content
- Final testing and bug fixes
- Deployment setup
- Performance monitoring setup

## 8. Success Metrics
- Lighthouse Performance Score > 95
- Smooth 60fps animations on target devices
- < 3 second initial load time
- Zero accessibility violations
- Positive user feedback on interaction design