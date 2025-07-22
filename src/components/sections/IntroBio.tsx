import { component$, useVisibleTask$, useSignal, useStyles$ } from '@builder.io/qwik';
import { inlineTranslate } from 'qwik-speak';

interface IntroBioProps {
  class?: string;
}

export const IntroBio = component$<IntroBioProps>((props) => {
  const containerRef = useSignal<HTMLDivElement>();
  const t = inlineTranslate();

  useStyles$(`
    .intro-bio {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .bio-content {
      font-size: 1.25rem;
      line-height: 1.8;
      color: var(--text-secondary);
      opacity: 0;
    }

    .bio-line {
      display: block;
      margin-bottom: 0.5rem;
      transform: translateY(20px);
      opacity: 0;
    }

    @media (max-width: 768px) {
      .intro-bio {
        padding: 2rem 1rem;
      }

      .bio-content {
        font-size: 1.1rem;
        line-height: 1.7;
      }
    }

    @media (max-width: 480px) {
      .bio-content {
        font-size: 1rem;
      }
    }
  `);

  useVisibleTask$(() => {
    if (!containerRef.value) return;

    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      
      // Animate bio lines with stagger
      gsap.fromTo(
        '.bio-line',
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        }
      );

      // Overall content fade in
      gsap.to('.bio-content', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });
    };

    loadGSAP();
  });

  return (
    <div ref={containerRef} class={`intro-bio ${props.class || ''}`}>
      <div class="bio-content">
        <span class="bio-line">{t('app.intro.bio.line1')}</span>
        <span class="bio-line">{t('app.intro.bio.line2')}</span>
        <span class="bio-line">{t('app.intro.bio.line3')}</span>
      </div>
    </div>
  );
});