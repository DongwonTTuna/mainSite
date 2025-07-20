import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { inlineTranslate } from 'qwik-speak';
import { useGSAP } from '~/lib/gsap';

export const FirstView = component$(() => {
  const t = inlineTranslate();
  const containerRef = useSignal<HTMLElement>();
  const titleRef = useSignal<HTMLElement>();
  const subtitleRef = useSignal<HTMLElement>();
  const ctaRef = useSignal<HTMLElement>();

  useGSAP((gsap) => {
    if (!containerRef.value) return;

    // Set initial states
    const elements = [titleRef.value, subtitleRef.value, ctaRef.value].filter(Boolean);
    gsap.set(elements, { opacity: 0, y: 30 });

    // Create stagger animation
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5
    });

    // Parallax effect on scroll
    gsap.to(containerRef.value, {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, [containerRef.value, titleRef.value, subtitleRef.value, ctaRef.value]);

  // Typing animation for role
  useVisibleTask$(() => {
    const role = t('app.hero.role');
    const roleElement = document.querySelector('.hero-role');
    if (!roleElement) return;

    let index = 0;
    const typeWriter = () => {
      if (index < role.length) {
        roleElement.textContent = role.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1500);
  });

  return (
    <section ref={containerRef} class="first-view">
      <div class="container">
        <div class="hero-content">
          <h1 ref={titleRef} class="hero-title">
            {t('app.hero.name')}
          </h1>
          
          <div ref={subtitleRef} class="hero-subtitle">
            <span class="hero-role"></span>
            <span class="cursor">|</span>
          </div>

          <p ref={subtitleRef} class="hero-description">
            {t('app.hero.subtitle')}
          </p>

          <div ref={ctaRef} class="hero-actions">
            <a href="#projects" class="btn btn-primary">
              {t('app.hero.cta')}
            </a>
            <a href="#contact" class="btn btn-secondary">
              {t('app.contact.title')}
            </a>
          </div>
        </div>

        {/* Background decoration */}
        <div class="hero-decoration">
          <div class="decoration-circle decoration-circle-1"></div>
          <div class="decoration-circle decoration-circle-2"></div>
          <div class="decoration-circle decoration-circle-3"></div>
        </div>
      </div>

      <style>{`
        .first-view {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #4a5568;
          display: inline-flex;
          align-items: center;
        }

        .hero-role {
          min-height: 1.2em;
        }

        .cursor {
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .hero-description {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #718096;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-block;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px 0 rgba(118, 75, 162, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 20px 0 rgba(118, 75, 162, 0.5);
        }

        .btn-secondary {
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }

        /* Background decoration */
        .hero-decoration {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(50px);
        }

        .decoration-circle-1 {
          width: 300px;
          height: 300px;
          top: -150px;
          right: -150px;
          animation: float 20s infinite ease-in-out;
        }

        .decoration-circle-2 {
          width: 400px;
          height: 400px;
          bottom: -200px;
          left: -200px;
          animation: float 25s infinite ease-in-out reverse;
        }

        .decoration-circle-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: float 15s infinite ease-in-out;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 200px;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
});