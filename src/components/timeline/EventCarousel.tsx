import { component$, useSignal, useVisibleTask$, useStyles$ } from '@builder.io/qwik';
import type { TimelineEvent } from '~/types/timeline';

interface EventCarouselProps {
  events: TimelineEvent[];
  currentMonth: number;
  currentYear: number;
}

export const EventCarousel = component$<EventCarouselProps>(({ events, currentMonth, currentYear }) => {
  useStyles$(`
    .event-carousel {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 1200px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .carousel-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-gray-800);
      margin-bottom: 1rem;
      text-align: center;
    }

    .carousel-container {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
    }

    .carousel-container::-webkit-scrollbar {
      display: none;
    }

    .carousel-card {
      flex: 0 0 calc(25% - 0.75rem);
      min-width: 250px;
      background: white;
      border-radius: 0.75rem;
      padding: 1.25rem;
      border: 2px solid transparent;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .carousel-card.highlight {
      border-color: var(--color-blue-500);
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 30px rgba(59, 130, 246, 0.25);
      background: linear-gradient(to bottom, rgba(59, 130, 246, 0.05), white);
    }

    .carousel-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .carousel-card.highlight:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 14px 35px rgba(59, 130, 246, 0.3);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
    }

    .card-date {
      font-size: 0.875rem;
      color: var(--color-gray-500);
      font-weight: 500;
    }

    .card-category {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }
    
    .card-category.education {
      background-color: var(--color-blue-500);
    }
    
    .card-category.work {
      background-color: var(--color-green-500);
    }
    
    .card-category.project {
      background-color: var(--color-purple-500);
    }
    
    .card-category.certification {
      background-color: var(--color-amber-500);
    }
    
    /* Default category color for unknown categories */
    .card-category {
      background-color: var(--color-gray-500);
    }

    .card-title {
      font-size: 1.125rem;
      font-weight: bold;
      color: var(--color-gray-800);
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .card-description {
      font-size: 0.875rem;
      color: var(--color-gray-600);
      margin-bottom: 0.75rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: 0.75rem;
    }

    .tech-tag {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      background-color: var(--color-gray-100);
      color: var(--color-gray-600);
      border-radius: 9999px;
    }

    .card-links {
      display: flex;
      gap: 0.5rem;
    }

    .card-link {
      font-size: 0.875rem;
      color: var(--color-blue-600);
      text-decoration: none;
      transition: color 300ms;
    }

    .card-link:hover {
      color: var(--color-blue-800);
      text-decoration: underline;
    }

    .no-events {
      text-align: center;
      color: var(--color-gray-500);
      padding: 2rem;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .event-carousel {
        bottom: 1rem;
        width: 95%;
        padding: 1rem;
      }

      .carousel-card {
        flex: 0 0 calc(50% - 0.5rem);
        min-width: 200px;
      }

      .carousel-title {
        font-size: 1.25rem;
      }
    }
  `);

  const containerRef = useSignal<HTMLElement>();
  const prevMonthRef = useSignal<number>(currentMonth);
  const prevYearRef = useSignal<number>(currentYear);

  // Filter events for current year - ensure events is defined
  const yearEvents = events?.filter(event => event.year === currentYear) || [];

  useVisibleTask$(({ track }) => {
    track(() => currentMonth);
    track(() => currentYear);
    
    if (!containerRef.value) return;
    
    // Only process if month or year actually changed
    if (prevMonthRef.value === currentMonth && prevYearRef.value === currentYear) return;
    prevMonthRef.value = currentMonth;
    prevYearRef.value = currentYear;

    // Delay to ensure DOM updates
    setTimeout(() => {
      const highlightedCard = containerRef.value.querySelector('.carousel-card.highlight') as HTMLElement;
      if (!highlightedCard) return;

      const container = containerRef.value;
      const containerRect = container.getBoundingClientRect();
      const cardRect = highlightedCard.getBoundingClientRect();
      
      // Check if card is fully visible
      const isFullyVisible = 
        cardRect.left >= containerRect.left && 
        cardRect.right <= containerRect.right;
      
      // Only scroll if card is not fully visible
      if (!isFullyVisible) {
        const cardOffsetLeft = highlightedCard.offsetLeft;
        const cardWidth = highlightedCard.offsetWidth;
        const containerWidth = container.offsetWidth;
        const currentScroll = container.scrollLeft;
        
        // Calculate minimal scroll needed
        if (cardRect.left < containerRect.left) {
          // Card is hidden on the left - scroll just enough to show it
          container.scrollTo({ 
            left: cardOffsetLeft - 20, // 20px padding
            behavior: 'smooth' 
          });
        } else if (cardRect.right > containerRect.right) {
          // Card is hidden on the right - scroll just enough to show it
          container.scrollTo({ 
            left: cardOffsetLeft - containerWidth + cardWidth + 20, // 20px padding
            behavior: 'smooth' 
          });
        }
      }
    }, 100);
  });

  return (
    <div class="event-carousel">
      <h3 class="carousel-title">{currentYear}년 이벤트</h3>
      {yearEvents.length > 0 ? (
        <div ref={containerRef} class="carousel-container">
          {yearEvents.map((event) => {
            // Highlight card when year and month match
            const isHighlight = event.year === currentYear && event.month === currentMonth;
            
            return (
              <div
                key={event.id}
                class={`carousel-card ${isHighlight ? 'highlight' : ''}`}
              >
                <div class="card-header">
                  <div class="card-date">{event.month}월</div>
                  <div
                    class={`card-category ${event.category}`}
                  >
                    {event.category}
                  </div>
                </div>
                
                <h4 class="card-title">{event.title}</h4>
                <p class="card-description">{event.description}</p>
                
                {event.techStack && event.techStack.length > 0 && (
                  <div class="card-tech-stack">
                    {event.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} class="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {event.links && (
                  <div class="card-links">
                    {event.links.github && (
                      <a
                        href={event.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="card-link"
                      >
                        GitHub →
                      </a>
                    )}
                    {event.links.live && (
                      <a
                        href={event.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="card-link"
                      >
                        Live →
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div class="no-events">
          {currentYear}년에는 이벤트가 없습니다.
        </div>
      )}
    </div>
  );
});