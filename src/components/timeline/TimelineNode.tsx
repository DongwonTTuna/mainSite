import { component$, useSignal, useVisibleTask$, useStyles$ } from '@builder.io/qwik';
import type { TimelineEvent } from '~/types/timeline';

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
}

export const TimelineNode = component$<TimelineNodeProps>(({ event, index }) => {
  useStyles$(`
    .timeline-node {
      position: absolute;
    }

    .timeline-node.highlight .node-circle {
      width: 1.5rem;
      height: 1.5rem;
    }

    .branch-line {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 6rem;
      background-color: var(--color-gray-400);
      transition: all 300ms;
    }

    .branch-line.top {
      bottom: 0;
    }

    .branch-line.bottom {
      top: 0;
    }

    .timeline-node.hovered .branch-line {
      background-color: var(--color-gray-600);
    }

    .node-circle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 4px solid white;
      transition: all 300ms;
      cursor: pointer;
    }

    .node-circle.top {
      bottom: 6rem;
    }

    .node-circle.bottom {
      top: 6rem;
    }

    .timeline-node.hovered .node-circle {
      transform: translateX(-50%) scale(1.5);
    }

    .content-card {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      width: 16rem;
      transition: all 300ms;
      cursor: pointer;
      border-top: 3px solid;
    }

    .content-card.top {
      bottom: 8rem;
    }

    .content-card.bottom {
      top: 8rem;
    }

    .timeline-node.hovered .content-card {
      transform: translateX(-50%) scale(1.05);
      box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
    }

    .event-date {
      font-size: 0.75rem;
      color: var(--color-gray-500);
      margin-bottom: 0.25rem;
    }

    .event-title {
      font-weight: bold;
      color: var(--color-gray-800);
      margin-bottom: 0.5rem;
    }

    .event-title.highlight {
      font-size: 1.125rem;
    }

    .event-description {
      font-size: 0.875rem;
      color: var(--color-gray-600);
      margin-bottom: 0.5rem;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }

    .tech-tag {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      background-color: var(--color-gray-100);
      color: var(--color-gray-600);
      border-radius: 9999px;
    }

    .event-links {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .event-link {
      font-size: 0.75rem;
      color: var(--color-blue-600);
      transition: color 300ms;
    }

    .event-link:hover {
      color: var(--color-blue-800);
    }

    .category-badge {
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      color: white;
      border-radius: 9999px;
      font-weight: 500;
    }
  `);

  const nodeRef = useSignal<HTMLElement>();
  const isHovered = useSignal(false);
  const isExpanded = useSignal(false);

  // Category colors
  const categoryColors = {
    education: 'var(--color-blue-500)',
    work: 'var(--color-green-500)',
    project: 'var(--color-purple-500)',
    certification: 'var(--color-amber-500)',
  };

  const nodeColor = categoryColors[event.category] || 'var(--color-gray-500)';

  // Calculate position on timeline
  const monthOffset = (event.month - 1) * 100;
  const yearOffset = (event.year - 2022) * 1200;
  const xPosition = yearOffset + monthOffset;

  useVisibleTask$(() => {
    if (!nodeRef.value) return;

    const handleMouseEnter = () => {
      isHovered.value = true;
    };

    const handleMouseLeave = () => {
      isHovered.value = false;
    };

    const handleClick = () => {
      isExpanded.value = !isExpanded.value;
    };

    nodeRef.value.addEventListener('mouseenter', handleMouseEnter);
    nodeRef.value.addEventListener('mouseleave', handleMouseLeave);
    nodeRef.value.addEventListener('click', handleClick);

    return () => {
      if (nodeRef.value) {
        nodeRef.value.removeEventListener('mouseenter', handleMouseEnter);
        nodeRef.value.removeEventListener('mouseleave', handleMouseLeave);
        nodeRef.value.removeEventListener('click', handleClick);
      }
    };
  });

  return (
    <div
      ref={nodeRef}
      class={`timeline-node ${event.position} ${event.highlight ? 'highlight' : ''} ${isHovered.value ? 'hovered' : ''}`}
      style={`left: ${xPosition}px;`}
    >
      {/* Branch line */}
      <div class={`branch-line ${event.position}`} />

      {/* Node circle */}
      <div
        class={`node-circle ${event.position}`}
        style={`background-color: ${nodeColor}; box-shadow: 0 0 0 2px ${nodeColor}20;`}
      />

      {/* Content card */}
      <div
        class={`content-card ${event.position}`}
        style={`border-top-color: ${nodeColor};`}
      >
        <div class="event-date">
          {event.year}년 {event.month}월
        </div>
        <h3 class={`event-title ${event.highlight ? 'highlight' : ''}`}>
          {event.title}
        </h3>
        
        {/* Show description on hover or when expanded */}
        {(isHovered.value || isExpanded.value) && (
          <div class="event-description">
            {event.description}
          </div>
        )}

        {/* Tech stack */}
        {event.techStack && event.techStack.length > 0 && (
          <div class="tech-stack">
            {event.techStack.map((tech) => (
              <span key={tech} class="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {event.links && (
          <div class="event-links">
            {event.links.github && (
              <a
                href={event.links.github}
                target="_blank"
                rel="noopener noreferrer"
                class="event-link"
                onClick$={(e) => e.stopPropagation()}
              >
                GitHub →
              </a>
            )}
            {event.links.live && (
              <a
                href={event.links.live}
                target="_blank"
                rel="noopener noreferrer"
                class="event-link"
                onClick$={(e) => e.stopPropagation()}
              >
                Live →
              </a>
            )}
          </div>
        )}

        {/* Category badge */}
        <div
          class="category-badge"
          style={`background-color: ${nodeColor};`}
        >
          {event.category}
        </div>
      </div>
    </div>
  );
});