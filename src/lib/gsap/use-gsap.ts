import { useVisibleTask$, type Signal } from '@builder.io/qwik';
import type { GSAPInstance } from 'gsap';

// We'll import GSAP dynamically to ensure it only loads on the client
let gsapInstance: GSAPInstance | null = null;

/**
 * Hook for using GSAP animations in Qwik components
 * 
 * @param callback - Function that sets up GSAP animations
 * @param deps - Array of dependencies to track for re-running the animation
 * 
 * @example
 * ```tsx
 * const boxRef = useSignal<HTMLElement>();
 * 
 * useGSAP(() => {
 *   if (!boxRef.value) return;
 *   
 *   gsap.to(boxRef.value, {
 *     rotation: 360,
 *     duration: 2,
 *     ease: "power2.inOut"
 *   });
 * }, [boxRef.value]);
 * ```
 */
export const useGSAP = (
  callback: (gsap: GSAPInstance) => void | (() => void),
  deps: Array<Signal<any> | any> = []
) => {
  useVisibleTask$(async ({ track, cleanup }) => {
    // Track dependencies
    deps.forEach(dep => {
      if (dep && typeof dep === 'object' && 'value' in dep) {
        track(() => dep.value);
      }
    });

    // Dynamically import GSAP only on the client
    if (!gsapInstance) {
      const gsapModule = await import('gsap');
      gsapInstance = gsapModule.default || gsapModule.gsap;
    }

    // Execute the callback with GSAP instance
    const cleanupFn = callback(gsapInstance);

    // Set up cleanup
    cleanup(() => {
      if (typeof cleanupFn === 'function') {
        cleanupFn();
      }
      // Kill all tweens to prevent memory leaks
      if (gsapInstance) {
        gsapInstance.killTweensOf('*');
      }
    });
  });
};