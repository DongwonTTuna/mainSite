import { component$, useSignal, useVisibleTask$, useStore, useStyles$ } from '@builder.io/qwik';
import { timelineData } from '~/data/timeline-data';
import { TimelineNode } from './TimelineNode';
import { TimelinePointer } from './TimelinePointer';
import { EventCarousel } from './EventCarousel';

export const Timeline = component$(() => {
  useStyles$(`
    .timeline-section {
      position: relative;
      background-color: white;
      min-height: 100vh;
      overflow: hidden;
    }

    .timeline-header {
      position: absolute;
      top: 4rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 10;
    }

    .timeline-title {
      font-size: 3rem;
      font-weight: bold;
      color: var(--color-gray-800);
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .timeline-subtitle {
      font-size: 1.25rem;
      color: var(--color-gray-600);
      font-weight: 400;
    }

    .timeline-container {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
    }

    .timeline-track {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      will-change: transform;
    }

    .timeline-main-line {
      position: absolute;
      top: 50%;
      left: 50vw;
      width: 4800px;
      height: 4px;
      background-color: black;
      transform: translateY(-50%);
    }

    .year-marker {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .year-label {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 35px;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-gray-800);
      white-space: nowrap;
      margin-top: -3rem;
    }

    .year-tick {
      width: 2px;
      height: 2rem;
      background-color: black;
    }

    .month-marker {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .month-tick {
      width: 2px;
      height: 1rem;
      background-color: var(--color-gray-800);
    }

    .timeline-end-padding {
      width: 100vw;
      flex-shrink: 0;
    }

    .mobile-hint {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      color: var(--color-gray-500);
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .timeline-section {
        min-height: auto;
      }

      .timeline-header {
        top: 2rem;
      }

      .timeline-title {
        font-size: 2rem;
      }

      .timeline-subtitle {
        font-size: 1rem;
      }

      .timeline-container {
        height: 400px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
      }

      .timeline-track {
        position: relative;
      }
    }
  `);

  const containerRef = useSignal<HTMLElement>();
  const trackRef = useSignal<HTMLElement>();
  const currentYearRef = useSignal<HTMLElement>();
  
  const state = useStore({
    scrollProgress: 0,
    currentYear: 2022,
    currentMonth: 4,
    isMobile: false,
  });

  useVisibleTask$(async ({ cleanup }) => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.value || !trackRef.value) return;

    // Check if mobile
    state.isMobile = window.innerWidth < 768;

    // Timeline dimensions
    const startYear = 2022;
    const endYear = 2025;
    const pixelsPerMonth = 100;
    const pixelsPerYear = pixelsPerMonth * 12;
    const totalYears = endYear - startYear + 1;
    const totalWidth = totalYears * pixelsPerYear + window.innerWidth;

    // Set track width
    trackRef.value.style.width = `${totalWidth}px`;

    if (!state.isMobile) {
      // Desktop: Convert vertical scroll to horizontal movement
      let scrollTween: GSAPTween;
      
      scrollTween = gsap.to(trackRef.value, {
        x: -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.value,
          start: 'top top',
          end: () => `+=${totalWidth * 2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentX = progress * (totalWidth - window.innerWidth);
            
            // Calculate current position in months
            const monthsFromStart = currentX / pixelsPerMonth;
            const totalMonths = Math.floor(monthsFromStart);
            const year = startYear + Math.floor(totalMonths / 12);
            const month = (totalMonths % 12) + 1;
            
            // Update state only if values changed and are valid
            if (year >= startYear && year <= endYear) {
              if (state.currentYear !== year) {
                state.currentYear = year;
              }
              if (state.currentMonth !== month && month >= 1 && month <= 12) {
                state.currentMonth = month;
              }
            }
          }
        }
      });

      cleanup(() => {
        if (scrollTween) scrollTween.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      });
    } else {
      // Mobile: Touch-based horizontal scrolling
      const container = containerRef.value;
      
      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        
        // Calculate current position in months
        const monthsFromStart = scrollLeft / pixelsPerMonth;
        const totalMonths = Math.floor(monthsFromStart);
        const year = startYear + Math.floor(totalMonths / 12);
        const month = (totalMonths % 12) + 1;
        
        // Update state only if values changed and are valid
        if (year >= startYear && year <= endYear) {
          if (state.currentYear !== year) {
            state.currentYear = year;
          }
          if (state.currentMonth !== month && month >= 1 && month <= 12) {
            state.currentMonth = month;
          }
        }
      };

      container.addEventListener('scroll', handleScroll);

      cleanup(() => {
        container.removeEventListener('scroll', handleScroll);
      });
    }

    // Animate timeline nodes on appearance
    const nodes = containerRef.value.querySelectorAll('.timeline-node');
    nodes.forEach((node, index) => {
      gsap.from(node, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        delay: index * 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: node,
          start: 'left 80%',
          end: 'left 20%',
          toggleActions: 'play none none reverse',
          horizontal: true,
        }
      });
    });
  });

  return (
    <section ref={containerRef} class="timeline-section">
      {/* Timeline Header */}
      <div class="timeline-header">
        <h2 class="timeline-title">My Journey</h2>
        <p class="timeline-subtitle">A timeline of my professional growth and achievements</p>
      </div>

      {/* Fixed center pointer for desktop */}
      {!state.isMobile && <TimelinePointer currentYear={state.currentYear} currentMonth={state.currentMonth} />}

      {/* Timeline container */}
      <div class="timeline-container">
        <div ref={trackRef} class="timeline-track">
          {/* Main timeline line */}
          <div class="timeline-main-line" />

          {/* Initial offset for centering */}
          <div style="width: 50vw; flex-shrink: 0;" />
          
          {/* Year markers */}
          {[2022, 2023, 2024, 2025, 2026].map((year) => {
            const xPosition = (year - 2022) * 1200;
            return (
              <div
                key={year}
                class="year-marker"
                style={`left: calc(${xPosition}px + 50vw);`}
              >
                <div class="year-label">{year}</div>
                <div class="year-tick" />
              </div>
            );
          })}

          {/* Month markers */}
          {Array.from({ length: 48 }, (_, i) => {
            const xPosition = i * 100;
            const isYearMarker = i % 12 === 0;
            return !isYearMarker && (
              <div
                key={i}
                class="month-marker"
                style={`left: calc(${xPosition}px + 50vw);`}
              >
                <div class="month-tick" />
              </div>
            );
          })}

          {/* Timeline events */}
          {timelineData.map((event, index) => (
            <TimelineNode 
              key={event.id} 
              event={event} 
              index={index} 
              currentYear={state.currentYear}
              currentMonth={state.currentMonth}
            />
          ))}

          {/* Extra padding at the end */}
          <div class="timeline-end-padding" />
        </div>
      </div>

      {/* Mobile scroll hint */}
      {state.isMobile && (
        <div class="mobile-hint">
          ← Swipe to explore →
        </div>
      )}

      {/* Event Carousel */}
      <EventCarousel 
        events={timelineData} 
        currentYear={state.currentYear}
        currentMonth={state.currentMonth}
      />
    </section>
  );
});