import { component$, useSignal, useVisibleTask$, useStyles$ } from '@builder.io/qwik';
import { inlineTranslate } from 'qwik-speak';
import type { TimelineEvent } from '~/types/timeline';

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  currentYear?: number;
  currentMonth?: number;
}

export const TimelineNode = component$<TimelineNodeProps>(({ event, index, currentYear, currentMonth }) => {
  const t = inlineTranslate();
  
  const formatDate = (year: number, month: number) => {
    // Get language from pathname
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const lang = path.split('/')[1] || 'en';
    
    if (lang === 'ko') {
      return `${year}년 ${month}월`;
    } else if (lang === 'ja') {
      return `${year}年${month}月`;
    } else {
      const date = new Date(year, month - 1);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };
  
  useStyles$(`
    .timeline-node {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .node-circle {
      position: relative;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      
    }

    .timeline-node.highlight .node-circle {
      transform: scale(1.3);
    }

    .timeline-node.hovered .node-circle {
      transform: scale(1.3);
    }

    .node-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 1rem;
      padding: 0.5rem 0.75rem;
      background-color: var(--color-gray-800);
      color: white;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 200ms, transform 200ms;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .timeline-node.hovered .node-tooltip {
      opacity: 1;
      transform: translateX(-50%) translateY(-4px);
    }

    .node-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid var(--color-gray-800);
    }

    .category-indicator {
      position: absolute;
      top: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.625rem;
      padding: 0.125rem 0.375rem;
      background-color: var(--color-gray-100);
      border-radius: 9999px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      opacity: 0;
      transition: opacity 200ms;
    }

    .timeline-node.hovered .category-indicator {
      opacity: 1;
    }
  `);

  const nodeRef = useSignal<HTMLElement>();
  const isHovered = useSignal(false);
  
  // Check if this node should be highlighted based on current month/year
  const isHighlighted = currentYear === event.year && currentMonth === event.month;

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
      class={`timeline-node ${isHighlighted ? 'highlight' : ''} ${isHovered.value ? 'hovered' : ''}`}
      style={`left: calc(${xPosition}px - 9px + 50vw);`}
    >
      {/* Node circle */}
      <div
        class="node-circle"
        style={`background-color: ${nodeColor};`}
      />

      {/* Tooltip on hover */}
      <div class="node-tooltip">
        {formatDate(event.year, event.month)} - {event.title}
      </div>
    </div>
  );
});