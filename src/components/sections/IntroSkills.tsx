import { component$, useVisibleTask$, useSignal, useStyles$ } from '@builder.io/qwik';
import { inlineTranslate } from 'qwik-speak';

interface IntroSkillsProps {
  class?: string;
}

type SkillCategory = 'frontend' | 'backend' | 'cloud' | 'tools';

interface Skill {
  key: string;
  category: SkillCategory;
  icon?: string;
}

const skills: Skill[] = [
  { key: 'react', category: 'frontend', icon: '⚛️' },
  { key: 'svelte', category: 'frontend', icon: '🔥' },
  { key: 'typescript', category: 'frontend', icon: '📘' },
  { key: 'python', category: 'backend', icon: '🐍' },
  { key: 'nodejs', category: 'backend', icon: '💚' },
  { key: 'scala', category: 'backend', icon: '🔴' },
  { key: 'aws', category: 'cloud', icon: '☁️' },
  { key: 'docker', category: 'cloud', icon: '🐳' },
  { key: 'kubernetes', category: 'cloud', icon: '☸️' },
  { key: 'git', category: 'tools', icon: '📚' },
  { key: 'cicd', category: 'tools', icon: '🔄' },
  { key: 'testing', category: 'tools', icon: '✅' },
];

export const IntroSkills = component$<IntroSkillsProps>((props) => {
  const containerRef = useSignal<HTMLDivElement>();
  const t = inlineTranslate();

  useStyles$(`
    .intro-skills {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
    }

    .skills-title {
      text-align: center;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 3rem;
      opacity: 0;
      transform: translateY(20px);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1.5rem;
      justify-items: center;
    }

    .skill-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      opacity: 0;
      transform: scale(0.8) translateY(20px);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .skill-item:hover {
      transform: translateY(-5px);
      border-color: rgba(255,255,255,0.3);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .skill-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .skill-name {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
      text-align: center;
    }

    .skill-category {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 0.75rem;
      color: var(--text-secondary);
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .category-frontend { color: #61DAFB; }
    .category-backend { color: #68A063; }
    .category-cloud { color: #FF9900; }
    .category-tools { color: #F05032; }

    @media (max-width: 768px) {
      .skills-title {
        font-size: 1.75rem;
        margin-bottom: 2rem;
      }

      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
      }

      .skill-item {
        width: 120px;
        height: 120px;
      }

      .skill-icon {
        font-size: 2rem;
      }

      .skill-name {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      }

      .skill-item {
        width: 100px;
        height: 100px;
      }

      .skill-icon {
        font-size: 1.75rem;
      }

      .skill-name {
        font-size: 0.85rem;
      }

      .skill-category {
        font-size: 0.65rem;
      }
    }
  `);

  useVisibleTask$(() => {
    if (!containerRef.value) return;

    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      
      // Animate title
      gsap.to('.skills-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Animate skill items with stagger
      gsap.to('.skill-item', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: {
          amount: 1,
          grid: 'auto',
          from: 'center',
        },
        ease: 'power2.out',
        delay: 0.3,
      });

      // Floating animation for skill items
      const skillItems = document.querySelectorAll('.skill-item');
      skillItems.forEach((item, index) => {
        gsap.to(item, {
          y: '+=10',
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.1,
        });
      });
    };

    loadGSAP();
  });

  return (
    <div ref={containerRef} class={`intro-skills ${props.class || ''}`}>
      <h2 class="skills-title">{t('app.intro.skills.title')}</h2>
      <div class="skills-grid">
        {skills.map((skill) => (
          <div key={skill.key} class={`skill-item category-${skill.category}`}>
            <span class={`skill-category category-${skill.category}`}>
              {t(`app.intro.skills.${skill.category}`)}
            </span>
            <span class="skill-icon">{skill.icon}</span>
            <span class="skill-name">{t(`app.intro.skills.items.${skill.key}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
});