import { component$, useStyles$ } from '@builder.io/qwik';

export const ScrollIndicator = component$(() => {
  useStyles$(`
    .scroll-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      color: var(--color-gray-400);
    }

    .scroll-text {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.7;
      white-space: nowrap;
    }

    .scroll-arrow {
      width: 1.5rem;
      height: 1.5rem;
       animation: bounce 1s infinite;
      animation: bounce-horizontal 1s infinite;
    }

    @keyframes bounce-horizontal {
      0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  `);

  return (
    <div class="scroll-indicator">
      <div class="scroll-content">
        <span className="scroll-text">Scroll to Explore</span>
        <svg
          class="scroll-arrow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
});