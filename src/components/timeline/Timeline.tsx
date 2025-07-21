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

    .timeline-container {
      position: relative;
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      margin-top: 4rem;
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
      margin-top: 0.5rem;
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
    currentMonth: 1,
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
            const totalProgress = currentX / pixelsPerMonth;
            const year = Math.floor(startYear + totalProgress / 12);
            const month = Math.floor(totalProgress % 12) + 1;
            
            if (state.currentYear !== year && year >= startYear && year <= endYear) {
              state.currentYear = year;
            }
            if (state.currentMonth !== month) {
              state.currentMonth = month;
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
        const totalProgress = scrollLeft / pixelsPerMonth;
        const year = Math.floor(startYear + totalProgress / 12);
        const month = Math.floor(totalProgress % 12) + 1;
        
        if (state.currentYear !== year && year >= startYear && year <= endYear) {
          state.currentYear = year;
        }
        if (state.currentMonth !== month) {
          state.currentMonth = month;
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
        y: node.classList.contains('top') ? -30 : 30,
        duration: 0.6,
        delay: index * 0.1,
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
            <TimelineNode key={event.id} event={event} index={index} />
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