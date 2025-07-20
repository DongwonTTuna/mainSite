import { component$, useSignal, useVisibleTask$, useStyles$ } from '@builder.io/qwik';
import { personalInfo } from '~/data/personal-info';
import { SocialLinks } from '~/components/ui/SocialLinks';
import { ScrollIndicator } from '~/components/ui/ScrollIndicator';

export const FirstView = component$(() => {
  useStyles$(`
    .first-view {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-gray-900);
      overflow: hidden;
    }

    .gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom right, var(--color-gray-900), var(--color-gray-800), #000000);
      opacity: 0.9;
    }

    .animated-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .bg-circle-1 {
      position: absolute;
      top: 25%;
      left: 25%;
      width: 16rem;
      height: 16rem;
      background-color: #3b82f6;
      border-radius: 50%;
      mix-blend-mode: screen;
      filter: blur(96px);
      opacity: 0.1;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .bg-circle-2 {
      position: absolute;
      bottom: 25%;
      right: 25%;
      width: 24rem;
      height: 24rem;
      background-color: #8b5cf6;
      border-radius: 50%;
      mix-blend-mode: screen;
      filter: blur(96px);
      opacity: 0.1;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      animation-delay: 2s;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.1;
      }
      50% {
        opacity: 0.05;
      }
    }

    .content-wrapper {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 0 1rem;
    }

    .hero-name {
      font-size: 3rem;
      font-weight: bold;
      color: white;
      margin-bottom: 1.5rem;
      letter-spacing: -0.025em;
    }

    .hero-title {
      font-size: 1.25rem;
      color: #d1d5db;
      margin-bottom: 3rem;
      letter-spacing: 0.05em;
    }

    /* Responsive styles */
    @media (min-width: 640px) {
      .content-wrapper {
        padding: 0 1.5rem;
      }

      .hero-name {
        font-size: 3.75rem;
      }

      .hero-title {
        font-size: 1.5rem;
      }
    }

    @media (min-width: 768px) {
      .hero-name {
        font-size: 4.5rem;
      }

      .hero-title {
        font-size: 1.875rem;
      }
    }

    @media (min-width: 1024px) {
      .content-wrapper {
        padding: 0 2rem;
      }

      .hero-name {
        font-size: 5rem;
      }
    }
  `);

  const containerRef = useSignal<HTMLElement>();
  const nameRef = useSignal<HTMLElement>();
  const titleRef = useSignal<HTMLElement>();
  const socialRef = useSignal<HTMLElement>();
  const scrollRef = useSignal<HTMLElement>();

  // GSAP animations
  useVisibleTask$(async () => {
    const { gsap } = await import('gsap');
    
    if (!containerRef.value) return;

    // Set initial states
    const elements = [
      nameRef.value, 
      titleRef.value, 
      socialRef.value,
      scrollRef.value
    ].filter(Boolean);
    
    gsap.set(elements, { opacity: 0, y: 30 });

    // Create timeline animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(nameRef.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
    })
    .to(titleRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.5')
    .to(socialRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.4')
    .to(scrollRef.value, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.2');
  });

  return (
    <section ref={containerRef} class="first-view">
      {/* Background gradient overlay */}
      <div class="gradient-overlay" />
      
      {/* Animated background elements */}
      <div class="animated-bg">
        <div class="bg-circle-1" />
        <div class="bg-circle-2" />
      </div>

      {/* Main content */}
      <div class="content-wrapper">
        <h1 ref={nameRef} class="hero-name">
          {personalInfo.name}
        </h1>
        
        <p ref={titleRef} class="hero-title">
          {personalInfo.title}
        </p>

        <div ref={socialRef}>
          <SocialLinks variant="center" size="large" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef}>
        <ScrollIndicator />
      </div>
    </section>
  );
});