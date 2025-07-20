import { createContextId, type Signal } from '@builder.io/qwik';

/**
 * Scroll store interface
 */
export interface ScrollStore {
  scrollY: Signal<number>;
  scrollProgress: Signal<number>;
  scrollDirection: Signal<'up' | 'down' | 'idle'>;
  isScrolling: Signal<boolean>;
}

/**
 * Context ID for scroll store
 * This allows sharing scroll state across components
 */
export const ScrollContext = createContextId<ScrollStore>('scroll-store');

/**
 * Scroll thresholds and configuration
 */
export const SCROLL_CONFIG = {
  // Debounce delay for scroll events
  debounceDelay: 10,
  // Threshold for detecting scroll direction change
  directionThreshold: 5,
  // Duration to consider scroll as "idle" after stopping
  idleTimeout: 150,
} as const;