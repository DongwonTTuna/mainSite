/**
 * GSAP Integration for Qwik
 * 
 * This module provides hooks for using GSAP animations in Qwik components.
 * All animations run only on the client side using Qwik's useVisibleTask$.
 * 
 * Available hooks:
 * - useGSAP: Basic GSAP animations
 * - useScrollTrigger: ScrollTrigger animations
 * - useTimeline: Timeline management
 * - useControlledTimeline: Timeline with control methods
 * - useGSAPContext: Scoped animations with automatic cleanup
 * - useGSAPMatchMedia: Responsive animations
 */

export { useGSAP } from './use-gsap';
export { useScrollTrigger, useScrollTriggerRefresh } from './use-scroll-trigger';
export { useTimeline, useControlledTimeline } from './use-timeline';
export { useGSAPContext, useGSAPMatchMedia } from './use-gsap-context';

// Re-export types for convenience
export type { GSAPInstance, GSAPTimeline, GSAPTween } from 'gsap';
export type { ScrollTrigger } from 'gsap/ScrollTrigger';