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
    }

    .carousel-card.highlight {
      border-color: var(--color-blue-500);
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
    }

    .carousel-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
  
  // Category colors
  const categoryColors = {
    education: 'var(--color-blue-500)',
    work: 'var(--color-green-500)',
    project: 'var(--color-purple-500)',
    certification: 'var(--color-amber-500)',
  };

  // Filter events for current year
  const yearEvents = events.filter(event => event.year === currentYear);

  useVisibleTask$(() => {
    if (!containerRef.value) return;

    // Auto-scroll to highlighted card
    const highlightedCard = containerRef.value.querySelector('.carousel-card.highlight');
    if (highlightedCard) {
      highlightedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  return (
    <div class="event-carousel">
      <h3 class="carousel-title">{currentYear}년 이벤트</h3>
      {yearEvents.length > 0 ? (
        <div ref={containerRef} class="carousel-container">
          {yearEvents.map((event) => {
            const isHighlight = event.month === currentMonth;
            const categoryColor = categoryColors[event.category] || 'var(--color-gray-500)';
            
            return (
              <div
                key={event.id}
                class={`carousel-card ${isHighlight ? 'highlight' : ''}`}
              >
                <div class="card-header">
                  <div class="card-date">{event.month}월</div>
                  <div
                    class="card-category"
                    style={`background-color: ${categoryColor};`}
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