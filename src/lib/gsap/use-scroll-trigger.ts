import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { GSAPInstance } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

// Cache for instances
let gsapInstance: GSAPInstance | null = null;
let ScrollTriggerInstance: typeof ScrollTriggerType | null = null;

interface ScrollTriggerResult {
  gsap: GSAPInstance | null;
  ScrollTrigger: typeof ScrollTriggerType | null;
}

/**
 * Hook for loading GSAP with ScrollTrigger in Qwik components
 * Returns a signal containing GSAP and ScrollTrigger instances once loaded
 * 
 * @example
 * ```tsx
 * const sectionRef = useSignal<HTMLElement>();
 * const gsapWithST = useScrollTrigger();
 * 
 * useVisibleTask$(() => {
 *   const { gsap, ScrollTrigger } = gsapWithST.value || {};
 *   if (!sectionRef.value || !gsap || !ScrollTrigger) return;
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
 * });
 * ```
 */
export const useScrollTrigger = () => {
  const result = useSignal<ScrollTriggerResult>({
    gsap: null,
    ScrollTrigger: null
  });

  useVisibleTask$(async () => {
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

    result.value = {
      gsap: gsapInstance,
      ScrollTrigger: ScrollTriggerInstance
    };
  });

  return result;
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