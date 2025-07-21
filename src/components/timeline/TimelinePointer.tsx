import { component$, useStyles$ } from '@builder.io/qwik';

interface TimelinePointerProps {
  currentYear?: number;
  currentMonth?: number;
}

export const TimelinePointer = component$<TimelinePointerProps>(({ currentYear = 2022, currentMonth = 1 }) => {
  useStyles$(`
    .timeline-pointer {
      position: fixed;
      left: 50%;
      top: calc(4rem + 100px);
      transform: translateX(-50%);
      z-index: 50;
      pointer-events: none;
    }

    .pointer-content {
      position: relative;
    }

    .pointer-triangle {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 30px solid var(--color-gray-800);
    }

    .pointer-line {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 3rem;
      background-color: var(--color-gray-800);
    }

    .year-display {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 4rem;
      padding: 0.5rem 1rem;
      background-color: var(--color-gray-800);
      color: white;
      border-radius: 0.5rem;
      font-weight: bold;
      font-size: 1.125rem;
      white-space: nowrap;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .pointer-triangle.inverted {
      border-top: none;
      border-bottom: 30px solid var(--color-gray-800);
    }
  `);

  return (
    <div class="timeline-pointer">
      <div class="pointer-content">
        {/* Main pointer triangle */}
        <div class="pointer-triangle inverted" />
        
        {/* Vertical line below pointer */}
        <div class="pointer-line" />
        
        {/* Current year and month display */}
        <div class="year-display">
          <span class="timeline-current-year">{currentYear}년 {currentMonth}월</span>
        </div>
      </div>
    </div>
  );
});