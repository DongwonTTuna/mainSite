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
      height: 3rem;
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
      bottom: 3rem;
    }

    .node-circle.bottom {
      top: 3rem;
    }

    .timeline-node.hovered .node-circle {
      transform: translateX(-50%) scale(1.5);
    }
  `);

  const nodeRef = useSignal<HTMLElement>();
  const isHovered = useSignal(false);

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

    nodeRef.value.addEventListener('mouseenter', handleMouseEnter);
    nodeRef.value.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (nodeRef.value) {
        nodeRef.value.removeEventListener('mouseenter', handleMouseEnter);
        nodeRef.value.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  });

  return (
    <div
      ref={nodeRef}
      class={`timeline-node ${event.position} ${event.highlight ? 'highlight' : ''} ${isHovered.value ? 'hovered' : ''}`}
      style={`left: calc(${xPosition}px + 50vw);`}
    >
      {/* Branch line */}
      <div class={`branch-line ${event.position}`} />

      {/* Node circle */}
      <div
        class={`node-circle ${event.position}`}
        style={`background-color: ${nodeColor}; box-shadow: 0 0 0 2px ${nodeColor}20;`}
      />

    </div>
  );
});