import { component$, useSignal, useStore } from '@builder.io/qwik';
import { inlineTranslate } from 'qwik-speak';
import { useScrollTrigger } from '~/lib/gsap';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'work' | 'project' | 'education' | 'achievement';
  tags?: string[];
  link?: string;
  image?: string;
}

export const Timeline = component$(() => {
  const t = inlineTranslate();
  const containerRef = useSignal<HTMLElement>();
  const trackRef = useSignal<HTMLElement>();
  
  // Timeline events data
  const events = useStore<TimelineEvent[]>([
    {
      id: '1',
      date: '2023 - Present',
      title: t('app.work.engineer'),
      description: t('app.work.nextbeat_desc'),
      category: 'work',
      tags: ['Svelte', 'Nest.js', 'Scala', 'AWS']
    },
    {
      id: '2',
      date: '2023',
      title: t('app.projects.seat_assignment_system'),
      description: 'Full-stack restaurant recommendation application',
      category: 'project',
      tags: ['React', 'Python', 'PostgreSQL']
    },
    {
      id: '3',
      date: '2022',
      title: t('app.about.cert_fit'),
      description: 'Professional certification in information technology',
      category: 'achievement',
      tags: ['Certification']
    },
    {
      id: '4',
      date: '2022',
      title: t('app.about.tokyo_info_creator'),
      description: 'Specialized in web development and software engineering',
      category: 'education',
      tags: ['Education']
    },
    {
      id: '5',
      date: '2021',
      title: t('app.projects.crypto_chart_viewer'),
      description: 'Data processing pipeline for restaurant analytics',
      category: 'project',
      tags: ['Python', 'Data Science']
    }
  ]);

  // Category colors
  const categoryColors = {
    work: '#667eea',
    project: '#48bb78',
    education: '#ed8936',
    achievement: '#e53e3e'
  };

  // GSAP ScrollTrigger animation
  useScrollTrigger((gsap, ScrollTrigger) => {
    if (!containerRef.value || !trackRef.value) return;

    // Calculate total width needed for horizontal scroll
    const totalWidth = trackRef.value.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // Main timeline animation
    gsap.to(trackRef.value, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Animate individual timeline items
    const items = trackRef.value.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.value,
          start: `top+=${index * 100} center`,
          end: `top+=${index * 100 + 200} center`,
          scrub: true
        }
      });
    });

    // Refresh on window resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef.value, trackRef.value]);

  return (
    <section ref={containerRef} class="timeline-section">
      <div class="timeline-header">
        <h2 class="timeline-title">{t('app.work.title')} & {t('app.projects.title')}</h2>
        <p class="timeline-subtitle">My professional journey and key projects</p>
      </div>

      <div class="timeline-container">
        <div ref={trackRef} class="timeline-track">
          {/* Timeline line */}
          <div class="timeline-line"></div>

          {/* Timeline events */}
          {events.map((event, index) => (
            <div key={event.id} class="timeline-item" data-category={event.category}>
              <div class="timeline-dot" style={`background-color: ${categoryColors[event.category]}`}></div>
              
              <div class="timeline-content">
                <div class="timeline-date">{event.date}</div>
                <h3 class="timeline-event-title">{event.title}</h3>
                <p class="timeline-event-description">{event.description}</p>
                
                {event.tags && (
                  <div class="timeline-tags">
                    {event.tags.map(tag => (
                      <span key={tag} class="timeline-tag">{tag}</span>
                    ))}
                  </div>
                )}

                {event.link && (
                  <a href={event.link} class="timeline-link" target="_blank" rel="noopener noreferrer">
                    {t('app.projects.view_project')} →
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Extra space at the end */}
          <div class="timeline-end"></div>
        </div>
      </div>

      <style>{`
        .timeline-section {
          position: relative;
          padding: 4rem 0;
          background: #f7fafc;
          overflow: hidden;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 4rem;
          padding: 0 1rem;
        }

        .timeline-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 1rem;
          color: #2d3748;
        }

        .timeline-subtitle {
          font-size: 1.25rem;
          color: #718096;
        }

        .timeline-container {
          position: relative;
          width: 100%;
          height: 500px;
        }

        .timeline-track {
          position: absolute;
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 50px;
          will-change: transform;
        }

        .timeline-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: #e2e8f0;
          transform: translateY(-50%);
          z-index: 1;
        }

        .timeline-item {
          position: relative;
          flex-shrink: 0;
          width: 350px;
          margin-right: 100px;
          z-index: 2;
        }

        .timeline-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 4px white, 0 0 0 6px currentColor;
          z-index: 3;
        }

        .timeline-content {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transform: translateY(-50%);
          transition: all 0.3s ease;
        }

        .timeline-item:nth-child(odd) .timeline-content {
          margin-bottom: 80px;
        }

        .timeline-item:nth-child(even) .timeline-content {
          margin-top: 80px;
        }

        .timeline-content:hover {
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        }

        .timeline-date {
          font-size: 0.875rem;
          font-weight: 600;
          color: #a0aec0;
          margin-bottom: 0.5rem;
        }

        .timeline-event-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.75rem;
        }

        .timeline-event-description {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .timeline-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .timeline-tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #edf2f7;
          color: #4a5568;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .timeline-link {
          display: inline-flex;
          align-items: center;
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .timeline-link:hover {
          color: #5a67d8;
          transform: translateX(4px);
        }

        .timeline-end {
          width: 100px;
          flex-shrink: 0;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .timeline-container {
            height: auto;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .timeline-track {
            position: static;
            padding: 2rem 1rem;
          }

          .timeline-item {
            width: 280px;
            margin-right: 2rem;
          }

          .timeline-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
});