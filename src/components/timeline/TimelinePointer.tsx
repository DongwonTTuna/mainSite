import { component$, useStyles$ } from '@builder.io/qwik';

interface TimelinePointerProps {
  currentYear?: number;
  currentMonth?: number;
}

export const TimelinePointer = component$<TimelinePointerProps>(({ currentYear = 2022, currentMonth = 1 }) => {
  useStyles$(`
    .timeline-pointer {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 50;
      pointer-events: none;
    }

    .pointer-content {
      position: relative;
      bottom: 15px;
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
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 3rem;
      background-color: var(--color-gray-800);
    }

    .year-display {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 6rem;
      text-align: center;
    }

    .year-label-pointer {
      padding: 0.5rem 1rem;
      background-color: var(--color-gray-800);
      color: white;
      border-radius: 0.5rem;
      font-weight: bold;
      font-size: 1.125rem;
      white-space: nowrap;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: inline-block;
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
        <div class="pointer-triangle" />
        
        {/* Vertical line above pointer */}
        <div class="pointer-line" />
        
        {/* Current year and month display */}
        <div class="year-display">
          <div class="year-label-pointer">
            <span class="timeline-current-year">{currentYear}년 {currentMonth}월</span>
          </div>
        </div>
      </div>
    </div>
  );
});