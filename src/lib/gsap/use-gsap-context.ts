import { useSignal, useVisibleTask$, type Signal } from '@builder.io/qwik';
import type { Context } from 'gsap';

let gsapInstance: any = null;

/**
 * Hook for using GSAP Context in Qwik components
 * GSAP Context helps with scoped selector text and makes cleanup easier
 * 
 * @param scope - The scope element (container) for the context
 * @returns Object with add method for adding animations to the context
 * 
 * @example
 * ```tsx
 * const containerRef = useSignal<HTMLElement>();
 * const ctx = useGSAPContext(containerRef);
 * 
 * useVisibleTask$(() => {
 *   if (!containerRef.value) return;
 *   
 *   ctx.add(() => {
 *     // All GSAP animations here will be scoped to containerRef
 *     // and automatically cleaned up
 *     gsap.to(".box", { rotation: 360 });
 *     gsap.to(".circle", { scale: 2 });
 *   });
 * });
 * ```
 */
export const useGSAPContext = (scope: Signal<HTMLElement | undefined>) => {
  const context = useSignal<Context | null>(null);
  const animations: Array<() => void> = [];

  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => scope.value);

    if (!scope.value) return;

    // Dynamically import GSAP
    if (!gsapInstance) {
      const gsapModule = await import('gsap');
      gsapInstance = gsapModule.default || gsapModule.gsap;
    }

    // Create GSAP context
    context.value = gsapInstance.context(() => {
      // Execute all queued animations
      animations.forEach(animation => animation());
    }, scope.value);

    // Set up cleanup
    cleanup(() => {
      if (context.value) {
        context.value.revert();
        context.value = null;
      }
    });
  });

  return {
    add: (animation: () => void) => {
      if (context.value) {
        context.value.add(animation);
      } else {
        // Queue animations if context isn't ready yet
        animations.push(animation);
      }
    }
  };
};

/**
 * Hook for creating a GSAP MatchMedia context
 * Useful for responsive animations
 * 
 * @returns MatchMedia instance methods
 * 
 * @example
 * ```tsx
 * const mm = useGSAPMatchMedia();
 * 
 * useVisibleTask$(() => {
 *   mm.add({
 *     // Desktop
 *     "(min-width: 800px)": () => {
 *       gsap.to(".box", { x: 100 });
 *     },
 *     // Mobile
 *     "(max-width: 799px)": () => {
 *       gsap.to(".box", { x: 50 });
 *     }
 *   });
 * });
 * ```
 */
export const useGSAPMatchMedia = () => {
  const matchMedia = useSignal<any>(null);

  useVisibleTask$(async ({ cleanup }) => {
    // Dynamically import GSAP
    if (!gsapInstance) {
      const gsapModule = await import('gsap');
      gsapInstance = gsapModule.default || gsapModule.gsap;
    }

    // Create MatchMedia instance
    matchMedia.value = gsapInstance.matchMedia();

    // Set up cleanup
    cleanup(() => {
      if (matchMedia.value) {
        matchMedia.value.revert();
        matchMedia.value = null;
      }
    });
  });

  return {
    add: (config: any) => {
      if (matchMedia.value) {
        matchMedia.value.add(config);
      }
    }
  };
};