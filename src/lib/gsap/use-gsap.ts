import { useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { GSAPInstance } from 'gsap';

// Cache for GSAP instance
let gsapInstance: GSAPInstance | null = null;

/**
 * Hook for loading GSAP in Qwik components
 * Returns a signal containing the GSAP instance once loaded
 * 
 * @example
 * ```tsx
 * const boxRef = useSignal<HTMLElement>();
 * const gsap = useGSAP();
 * 
 * useVisibleTask$(() => {
 *   if (!boxRef.value || !gsap.value) return;
 *   
 *   gsap.value.to(boxRef.value, {
 *     rotation: 360,
 *     duration: 2,
 *     ease: "power2.inOut"
 *   });
 * });
 * ```
 */
export const useGSAP = () => {
  const gsapSignal = useSignal<GSAPInstance | null>(null);

  useVisibleTask$(async () => {
    // Dynamically import GSAP only on the client
    if (!gsapInstance) {
      const gsapModule = await import('gsap');
      gsapInstance = gsapModule.default || gsapModule.gsap;
    }
    
    gsapSignal.value = gsapInstance;
  });

  return gsapSignal;
};