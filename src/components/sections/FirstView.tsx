import { component$, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik"
import { inlineTranslate } from "qwik-speak"
import { ScrollIndicator } from "~/components/ui/ScrollIndicator"
import { SocialLinks } from "~/components/ui/SocialLinks"
import { IntroBio } from "./IntroBio"
import { IntroCTA } from "./IntroCTA"
import { IntroSkills } from "./IntroSkills"

export const FirstView = component$(() => {
  useStyles$(`
    .first-view {
      position: relative;
      min-height: 100vh;
      background: var(--bg-primary);
      overflow: hidden;
    }

    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Advanced gradient background */
    .gradient-overlay {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(ellipse at top left, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
        radial-gradient(ellipse at center, rgba(240, 147, 251, 0.05) 0%, transparent 70%);
      opacity: 1;
    }

    /* Animated background with morphing shapes */
    .animated-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .morph-gradient {
      position: absolute;
      width: 500px;
      height: 500px;
      background: var(--primary-gradient);
      filter: blur(80px);
      opacity: 0.3;
      animation: morph 15s ease-in-out infinite, float 20s ease-in-out infinite;
    }

    .morph-gradient-1 {
      top: -10%;
      left: -10%;
      animation-delay: 0s;
    }

    .morph-gradient-2 {
      bottom: -10%;
      right: -10%;
      background: var(--secondary-gradient);
      animation-delay: 5s;
    }

    .morph-gradient-3 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--accent-gradient);
      animation-delay: 10s;
      width: 400px;
      height: 400px;
    }

    /* Particle effect background */
    .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--text-secondary);
      border-radius: 50%;
      opacity: 0;
      animation: particle-float 10s linear infinite;
    }

    @keyframes particle-float {
      0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 0.4;
      }
      90% {
        opacity: 0.4;
      }
      100% {
        transform: translateY(-100vh) scale(1);
        opacity: 0;
      }
    }

    .content-wrapper {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 0 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-greeting {
      font-size: var(--text-2xl);
      font-weight: var(--font-light);
      color: var(--text-secondary);
      margin-bottom: 1rem;
      opacity: 0;
      letter-spacing: var(--tracking-wider);
      text-transform: uppercase;
    }

    .hero-name {
      font-size: var(--text-6xl);
      font-weight: var(--font-extrabold);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1.5rem;
      letter-spacing: var(--tracking-tight);
      animation: gradient-shift 8s ease infinite;
      line-height: var(--leading-tight);
      filter: drop-shadow(0 0 30px rgba(102, 126, 234, 0.5));
    }

    .hero-title {
      font-size: var(--text-xl);
      font-weight: var(--font-medium);
      color: var(--text-tertiary);
      margin-bottom: 3rem;
      letter-spacing: var(--tracking-widest);
      text-transform: uppercase;
      position: relative;
      display: inline-block;
    }

    /* Animated underline for title */
    .hero-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--primary-gradient);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform var(--duration-slow) var(--ease-out-expo);
    }

    .hero-title.active::after {
      transform: scaleX(1);
    }

    .intro-sections {
      position: relative;
      padding-top: 3rem;
      z-index: 10;
      background: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary));
      backdrop-filter: blur(20px);
    }
    
    .intro-title {
      text-align: center;
      font-size: var(--text-3xl);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      letter-spacing: var(--tracking-tight);
    }

    /* Enhanced social links wrapper */
    .social-wrapper {
      opacity: 0;
      transform: translateY(20px);
      transition: all var(--duration-slow) var(--ease-out-expo);
    }

    /* Advanced scroll indicator */
    .scroll-indicator-wrapper {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }

    /* Glow effect on hover */
    @keyframes glow-pulse {
      0%, 100% {
        filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.6));
      }
      50% {
        filter: drop-shadow(0 0 40px rgba(102, 126, 234, 0.8));
      }
    }

    .hero-name:hover {
      animation: gradient-shift 3s ease infinite, glow-pulse 2s ease-in-out infinite;
    }

    /* Responsive styles */
    @media (min-width: 640px) {
      .hero-content {
        padding: 4rem 3rem;
      }

      .morph-gradient {
        width: 600px;
        height: 600px;
      }
    }

    @media (min-width: 768px) {
      .hero-content {
        padding: 5rem 4rem;
        border-radius: 3rem;
      }
      
      .morph-gradient {
        width: 700px;
        height: 700px;
      }
    }

    @media (min-width: 1024px) {
      .hero-content {
        padding: 6rem 5rem;
      }
      
      .morph-gradient {
        width: 800px;
        height: 800px;
      }
    }

    /* Dark mode optimizations */
    @media (prefers-color-scheme: light) {
      .hero-content {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  `)

  const containerRef = useSignal<HTMLElement>()
  const greetingRef = useSignal<HTMLElement>()
  const nameRef = useSignal<HTMLElement>()
  const titleRef = useSignal<HTMLElement>()
  const socialRef = useSignal<HTMLElement>()
  const scrollRef = useSignal<HTMLElement>()
  const heroContentRef = useSignal<HTMLElement>()
  const particlesRef = useSignal<HTMLElement>()
  const t = inlineTranslate()

  // Advanced GSAP animations
  useVisibleTask$(async () => {
    const { gsap } = await import("gsap")

    if (!containerRef.value) return

    // Create particles
    if (particlesRef.value) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 10}s`
        particle.style.animationDuration = `${10 + Math.random() * 10}s`
        particlesRef.value.appendChild(particle)
      }
    }

    // Set initial states
    gsap.set([heroContentRef.value], { opacity: 0, scale: 0.9 })
    gsap.set([greetingRef.value, nameRef.value, titleRef.value], { opacity: 0, y: 30 })
    gsap.set(socialRef.value, { opacity: 0, y: 20 })
    gsap.set(scrollRef.value, { opacity: 0 })

    // Create advanced timeline animation
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // Add hover animations after initial load
        if (titleRef.value) {
          titleRef.value.classList.add("active")
        }
      }
    })

    // Hero content glass card animation
    tl.to(heroContentRef.value, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
      // Text animations with stagger
      .to(
        greetingRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.8
        },
        "-=0.6"
      )
      .to(
        nameRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out"
        },
        "-=0.5"
      )
      .to(
        titleRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.8
        },
        "-=0.5"
      )
      .to(
        socialRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.8
        },
        "-=0.4"
      )
      .to(
        scrollRef.value,
        {
          opacity: 1,
          duration: 1
        },
        "-=0.2"
      )

    // Morph animations for background
    gsap.to(".morph-gradient", {
      x: "random(-100, 100)",
      y: "random(-100, 100)",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 5,
        from: "random"
      }
    })
  })

  return (
    <section ref={containerRef} class='first-view'>
      {/* Advanced gradient overlay */}
      <div class='gradient-overlay' />

      {/* Morphing gradient backgrounds */}
      <div class='animated-bg'>
        <div class='morph-gradient morph-gradient-1' />
        <div class='morph-gradient morph-gradient-2' />
        <div class='morph-gradient morph-gradient-3' />
      </div>

      {/* Particle effects */}
      <div ref={particlesRef} class='particles' />

      {/* Hero section with glass morphism content */}
      <div class='hero-section'>
        <div class='content-wrapper'>
          <div ref={heroContentRef} class='hero-content'>
            <p ref={greetingRef} class='hero-greeting'>
              {t("app.intro.greeting")}
            </p>

            <h1 ref={nameRef} class='hero-name'>
              {t("app.hero.name")}
            </h1>

            <p ref={titleRef} class='hero-title'>
              {t("app.hero.role")}
            </p>

            <div ref={socialRef} class='social-wrapper'>
              <SocialLinks variant='center' size='large' />
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div ref={scrollRef} class='scroll-indicator-wrapper'>
          <ScrollIndicator />
        </div>
      </div>

      {/* Introduction sections with enhanced styling */}
      <div class='intro-sections' id='about'>
        <h2 class='intro-title'>{t("app.intro.title")}</h2>
        <IntroBio />
        <IntroSkills />
        <IntroCTA />
      </div>
    </section>
  )
})
