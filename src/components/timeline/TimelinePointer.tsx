import { component$, useStyles$ } from '@builder.io/qwik';

interface TimelinePointerProps {
  currentYear?: number;
  currentMonth?: number;
}

export const TimelinePointer = component$<TimelinePointerProps>(({ currentYear = 2022, currentMonth = 1 }) => {
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
      top: 15px;
    }

    .pointer-triangle {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 30px solid var(--color-gray-800);
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
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 6rem;
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
        {/* Current year and month display */}
        <div class="year-display">
          <div class="year-label-pointer">
            <span class="timeline-current-year">{formatDate(currentYear, currentMonth)}</span>
          </div>
        </div>
        
        {/* Main pointer triangle */}
        <div class="pointer-triangle" />
        
        {/* Vertical line below pointer */}
        <div class="pointer-line" />
      </div>
    </div>
  );
});