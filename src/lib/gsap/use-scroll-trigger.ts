import { useVisibleTask$, type Signal } from '@builder.io/qwik';
import type { GSAPInstance } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

let gsapInstance: GSAPInstance | null = null;
let ScrollTriggerInstance: typeof ScrollTriggerType | null = null;

/**
 * Hook for using GSAP ScrollTrigger in Qwik components
 * 
 * @param callback - Function that sets up ScrollTrigger animations
 * @param deps - Array of dependencies to track
 * 
 * @example
 * ```tsx
 * const sectionRef = useSignal<HTMLElement>();
 * 
 * useScrollTrigger((gsap, ScrollTrigger) => {
 *   if (!sectionRef.value) return;
 *   
 *   gsap.to(sectionRef.value, {
 *     x: -100,
 *     scrollTrigger: {
 *       trigger: sectionRef.value,
 *       start: "top center",
 *       end: "bottom center",
 *       scrub: true,
 *       markers: false
 *     }
 *   });
 * }, [sectionRef.value]);
 * ```
 */
export const useScrollTrigger = (
  callback: (gsap: GSAPInstance, ScrollTrigger: typeof ScrollTriggerType) => void | (() => void),
  deps: Array<Signal<any> | any> = []
) => {
  useVisibleTask$(async ({ track, cleanup }) => {
    // Track dependencies
    deps.forEach(dep => {
      if (dep && typeof dep === 'object' && 'value' in dep) {
        track(() => dep.value);
      }
    });

    // Dynamically import GSAP and ScrollTrigger
    if (!gsapInstance || !ScrollTriggerInstance) {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);
      
      gsapInstance = gsapModule.default || gsapModule.gsap;
      ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
      
      // Register ScrollTrigger plugin
      gsapInstance.registerPlugin(ScrollTriggerInstance);
    }

    // Execute the callback
    const cleanupFn = callback(gsapInstance, ScrollTriggerInstance);

    // Set up cleanup
    cleanup(() => {
      if (typeof cleanupFn === 'function') {
        cleanupFn();
      }
      // Kill all ScrollTriggers to prevent memory leaks
      if (ScrollTriggerInstance) {
        ScrollTriggerInstance.getAll().forEach(trigger => trigger.kill());
      }
    });
  });
};

/**
 * Hook for refreshing ScrollTrigger instances
 * Useful when layout changes occur
 */
export const useScrollTriggerRefresh = () => {
  return async () => {
    if (!ScrollTriggerInstance) {
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
    }
    
    ScrollTriggerInstance.refresh();
  };
};