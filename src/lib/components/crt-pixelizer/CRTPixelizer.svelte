<script lang="ts">
  import type { CRTPixelizerProps } from './types'
  import { onMount } from 'svelte'

  let {
    pixelSize = 4,
    gridOpacity = 0.15,
    scanlineIntensity = 0.3,
    colorBleedAmount = 1,
    enableCurvature = true,
    enableAnimation = true,
    flickerIntensity = 0.02,
    scanlineSpeed = 8
  }: CRTPixelizerProps = $props()

  let prefersReducedMotion = $state(false)
  
  const shouldAnimate = $derived(enableAnimation && !prefersReducedMotion)

  onMount(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion = mediaQuery.matches
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  })
</script>

<div 
  class="crt-container"
  class:animate={shouldAnimate}
  class:curved={enableCurvature}
  style:--pixel-size="{pixelSize}px"
  style:--grid-opacity={gridOpacity}
  style:--scanline-intensity={scanlineIntensity}
  style:--color-bleed="{colorBleedAmount}px"
  style:--flicker-intensity={flickerIntensity}
  style:--scanline-speed="{scanlineSpeed}s"
>
  <!-- Main content -->
  <div class="crt-content">
    <slot />
  </div>
  
  <!-- CRT effect layers -->
  <div class="crt-effects">
    <!-- Pixel grid -->
    <div class="crt-pixel-grid" aria-hidden="true"></div>
    
    <!-- RGB phosphor dots -->
    <div class="crt-phosphor-dots" aria-hidden="true"></div>
    
    <!-- Scanlines -->
    {#if shouldAnimate}
      <div class="crt-scanlines" aria-hidden="true"></div>
    {/if}
    
    <!-- Screen curvature -->
    {#if enableCurvature}
      <div class="crt-curvature" aria-hidden="true"></div>
    {/if}
  </div>
</div>

<style>
  .crt-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #0a0a0a;
  }

  .crt-content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    /* Pixelation effect */
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    /* Enhance contrast and colors */
    filter: 
      contrast(1.1)
      brightness(1.05)
      saturate(1.2);
  }

  /* CRT effect layers container */
  .crt-effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  }

  /* Pixel grid pattern */
  .crt-pixel-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      /* Horizontal lines */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent calc(var(--pixel-size) - 1px),
        rgba(0, 0, 0, var(--grid-opacity)) calc(var(--pixel-size) - 1px),
        rgba(0, 0, 0, var(--grid-opacity)) var(--pixel-size)
      ),
      /* Vertical lines */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent calc(var(--pixel-size) - 1px),
        rgba(0, 0, 0, var(--grid-opacity)) calc(var(--pixel-size) - 1px),
        rgba(0, 0, 0, var(--grid-opacity)) var(--pixel-size)
      );
  }

  /* RGB phosphor dot pattern */
  .crt-phosphor-dots {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-image: 
      /* Red dots */
      radial-gradient(
        circle at 0px 0px,
        rgba(255, 0, 0, 0.8) 0,
        transparent 1px
      ),
      /* Green dots */
      radial-gradient(
        circle at 1px 0px,
        rgba(0, 255, 0, 0.8) 0,
        transparent 1px
      ),
      /* Blue dots */
      radial-gradient(
        circle at 2px 0px,
        rgba(0, 0, 255, 0.8) 0,
        transparent 1px
      );
    background-size: 3px 3px;
    background-position: 0 0, 0 0, 0 0;
    mix-blend-mode: screen;
  }

  /* Scanlines */
  .crt-scanlines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 2px,
      rgba(0, 0, 0, calc(var(--scanline-intensity) * 0.5)) 2px,
      rgba(0, 0, 0, calc(var(--scanline-intensity) * 0.5)) 3px
    );
    will-change: transform;
  }

  .animate .crt-scanlines {
    animation: scanline-move var(--scanline-speed) linear infinite;
  }

  @keyframes scanline-move {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }

  /* Screen curvature and vignette */
  .crt-curvature {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 
      inset 0 0 50px rgba(0, 0, 0, 0.3),
      inset 0 0 20px rgba(0, 0, 0, 0.2);
    background: radial-gradient(
      ellipse at center,
      transparent 0%,
      transparent 70%,
      rgba(0, 0, 0, 0.05) 80%,
      rgba(0, 0, 0, 0.1) 90%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }

  /* Warm CRT glow */
  .crt-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 237, 213, 0.05) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 3;
  }

  /* Subtle flicker effect */
  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.98; }
  }

  .animate .crt-container {
    animation: flicker 10s ease-in-out infinite;
  }

  /* Color bleed effect */
  .crt-content :global(*) {
    text-shadow: 
      calc(var(--color-bleed) * -0.5) 0 1px rgba(255, 0, 0, 0.5),
      0 0 1px rgba(0, 255, 0, 0.5),
      calc(var(--color-bleed) * 0.5) 0 1px rgba(0, 0, 255, 0.5);
  }

  /* Performance optimizations */
  .crt-container,
  .crt-effects {
    contain: layout style paint;
  }

  .crt-scanlines {
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    .crt-phosphor-dots {
      opacity: 0.2;
    }

    .crt-pixel-grid {
      opacity: calc(var(--grid-opacity) * 0.5);
    }

    .animate .crt-scanlines {
      animation: none;
    }
  }

  /* Accessibility */
  @media (prefers-contrast: high) {
    .crt-effects {
      display: none;
    }
  }
</style>