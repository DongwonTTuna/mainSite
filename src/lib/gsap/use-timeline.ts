import { useSignal, useVisibleTask$, type Signal } from '@builder.io/qwik';
import type { GSAPInstance, GSAPTimeline } from 'gsap';

let gsapInstance: GSAPInstance | null = null;

/**
 * Hook for managing GSAP timelines in Qwik components
 * 
 * @param config - Timeline configuration options
 * @param deps - Array of dependencies to track
 * @returns Signal containing the timeline instance
 * 
 * @example
 * ```tsx
 * const boxRef = useSignal<HTMLElement>();
 * const timeline = useTimeline({ paused: true }, []);
 * 
 * useVisibleTask$(() => {
 *   if (!boxRef.value || !timeline.value) return;
 *   
 *   timeline.value
 *     .to(boxRef.value, { x: 100, duration: 1 })
 *     .to(boxRef.value, { y: 100, duration: 1 })
 *     .to(boxRef.value, { rotation: 360, duration: 1 });
 * });
 * ```
 */
export const useTimeline = (
  config: GSAPTimeline.Vars = {},
  deps: Array<Signal<any> | any> = []
): Signal<GSAPTimeline | null> => {
  const timeline = useSignal<GSAPTimeline | null>(null);

  useVisibleTask$(async ({ track, cleanup }) => {
    // Track dependencies
    deps.forEach(dep => {
      if (dep && typeof dep === 'object' && 'value' in dep) {
        track(() => dep.value);
      }
    });

    // Dynamically import GSAP
    if (!gsapInstance) {
      const gsapModule = await import('gsap');
      gsapInstance = gsapModule.default || gsapModule.gsap;
    }

    // Create timeline
    timeline.value = gsapInstance.timeline(config);

    // Set up cleanup
    cleanup(() => {
      if (timeline.value) {
        timeline.value.kill();
        timeline.value = null;
      }
    });
  });

  return timeline;
};

/**
 * Hook for creating a controlled timeline with play/pause/reverse methods
 * 
 * @param config - Timeline configuration options
 * @returns Object with timeline and control methods
 */
export const useControlledTimeline = (config: GSAPTimeline.Vars = {}) => {
  const timeline = useTimeline({ paused: true, ...config }, []);
  
  const play = () => timeline.value?.play();
  const pause = () => timeline.value?.pause();
  const reverse = () => timeline.value?.reverse();
  const restart = () => timeline.value?.restart();
  const progress = (value?: number) => {
    if (timeline.value) {
      if (value !== undefined) {
        timeline.value.progress(value);
      }
      return timeline.value.progress();
    }
    return 0;
  };

  return {
    timeline,
    play,
    pause,
    reverse,
    restart,
    progress
  };
};