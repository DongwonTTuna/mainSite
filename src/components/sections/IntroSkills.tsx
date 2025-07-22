import { component$, useVisibleTask$, useSignal, useStyles$ } from '@builder.io/qwik';
import { inlineTranslate } from 'qwik-speak';
import { SkillIcon } from '~/components/icons/skills/SkillIcon';

interface IntroSkillsProps {
  class?: string;
}

type SkillCategory = 'frontend' | 'backend' | 'cloud' | 'tools';

interface Skill {
  key: string;
  category: SkillCategory;
}

// Skill data with SVG icons for each technology
const skills: Skill[] = [
  // Frontend Technologies
  { key: 'react', category: 'frontend' },
  { key: 'svelte', category: 'frontend' },
  { key: 'qwik', category: 'frontend' },
  { key: 'typescript', category: 'frontend' },

  // Backend Technologies
  { key: 'python', category: 'backend' },
  { key: 'nodejs', category: 'backend' },
  { key: 'nestjs', category: 'backend' },
  { key: 'scala', category: 'backend' },
  
  // Cloud & Infrastructure
  { key: 'aws', category: 'cloud' },
  { key: 'docker', category: 'cloud' },
  { key: 'kubernetes', category: 'cloud' },

  // Development Tools
  { key: 'claudecode', category: 'tools' },
];

// Category information with emojis
const categoryInfo = {
  frontend: { emoji: '🎨', label: 'Frontend' },
  backend: { emoji: '⚙️', label: 'Backend' },
  cloud: { emoji: '☁️', label: 'Cloud & DevOps' },
  tools: { emoji: '🛠️', label: 'Tools & Testing' },
};

export const IntroSkills = component$<IntroSkillsProps>((props) => {
  const containerRef = useSignal<HTMLDivElement>();
  const t = inlineTranslate();

  useStyles$(`
    .intro-skills {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }

    /* Animated background gradient */
    .skills-bg-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(ellipse at center top, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at center bottom, rgba(97, 218, 251, 0.1) 0%, transparent 50%);
      pointer-events: none;
      opacity: 0.5;
    }

    .skills-title {
      text-align: center;
      font-size: var(--text-4xl);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      margin-bottom: 3rem;
      opacity: 0;
      transform: translateY(20px);
      background: var(--primary-gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: var(--tracking-tight);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem;
      justify-items: center;
      max-width: 1000px;
      margin: 0 auto;
    }

    .skill-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
      width: 220px;
      height: 220px;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 2px solid var(--glass-border);
      border-radius: 2.5rem;
      box-shadow: var(--glass-shadow);
      opacity: 0;
      transform: scale(0.8) translateY(30px);
      transition: all var(--duration-slow) var(--ease-out-expo);
      cursor: pointer;
      overflow: hidden;
    }

    .skill-item::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, var(--accent-purple) 0%, transparent 70%);
      opacity: 0;
      transition: opacity var(--duration-normal) ease;
      pointer-events: none;
    }

    .skill-item:hover::before {
      opacity: 0.15;
    }

    /* Glow background for enhanced effect */
    .skill-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      border-radius: 50%;
      opacity: 0;
      transition: all var(--duration-slow) ease;
      pointer-events: none;
      z-index: 1;
    }

    .category-frontend .skill-glow {
      background: radial-gradient(circle, rgba(97, 218, 251, 0.6) 0%, transparent 70%);
    }
    
    .category-backend .skill-glow {
      background: radial-gradient(circle, rgba(104, 160, 99, 0.6) 0%, transparent 70%);
    }
    
    .category-cloud .skill-glow {
      background: radial-gradient(circle, rgba(255, 153, 0, 0.6) 0%, transparent 70%);
    }
    
    .category-tools .skill-glow {
      background: radial-gradient(circle, rgba(240, 80, 50, 0.6) 0%, transparent 70%);
    }

    .skill-item:hover {
      transform: translateY(-10px) scale(1.08);
      border-color: rgba(139, 92, 246, 0.5);
      box-shadow: 0 30px 60px rgba(139, 92, 246, 0.3),
                  inset 0 0 30px rgba(139, 92, 246, 0.1);
      background: rgba(255, 255, 255, 0.08);
    }

    /* Category-specific hover effects with enhanced glow */
    .skill-item.category-frontend:hover {
      border-color: rgba(97, 218, 251, 0.6);
      box-shadow: 0 30px 60px rgba(97, 218, 251, 0.3),
                  inset 0 0 30px rgba(97, 218, 251, 0.1),
                  0 0 100px rgba(97, 218, 251, 0.2);
    }

    .skill-item.category-backend:hover {
      border-color: rgba(104, 160, 99, 0.6);
      box-shadow: 0 30px 60px rgba(104, 160, 99, 0.3),
                  inset 0 0 30px rgba(104, 160, 99, 0.1),
                  0 0 100px rgba(104, 160, 99, 0.2);
    }

    .skill-item.category-cloud:hover {
      border-color: rgba(255, 153, 0, 0.6);
      box-shadow: 0 30px 60px rgba(255, 153, 0, 0.3),
                  inset 0 0 30px rgba(255, 153, 0, 0.1),
                  0 0 100px rgba(255, 153, 0, 0.2);
    }

    .skill-item.category-tools:hover {
      border-color: rgba(240, 80, 50, 0.6);
      box-shadow: 0 30px 60px rgba(240, 80, 50, 0.3),
                  inset 0 0 30px rgba(240, 80, 50, 0.1),
                  0 0 100px rgba(240, 80, 50, 0.2);
    }

    .skill-icon {
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
      transition: all var(--duration-slow) var(--ease-out-expo);
      position: relative;
      z-index: 2;
    }

    .skill-item:hover .skill-icon {
      transform: scale(1.15) rotate(5deg);
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.4));
    }

    /* SVG icon colors - removed to let each icon use its own brand colors */

    .skill-name {
      font-size: var(--text-lg);
      font-weight: var(--font-bold);
      color: var(--text-primary);
      text-align: center;
      letter-spacing: var(--tracking-wide);
      transition: all var(--duration-normal) ease;
      text-transform: capitalize;
      margin-bottom: 1rem;
    }

    .skill-item:hover .skill-name {
      transform: translateY(-2px);
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }

    .skill-category {
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: var(--text-xs);
      font-weight: var(--font-bold);
      text-transform: uppercase;
      letter-spacing: var(--tracking-widest);
      padding: 0.4rem 0.8rem;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all var(--duration-normal) ease;
    }

    .skill-item:hover .skill-category {
      background: rgba(255, 255, 255, 0.15);
    }

    /* Category colors with better visibility */
    .category-frontend { 
      color: #61DAFB;
    }
    
    .category-backend { 
      color: #68A063;
    }
    
    .category-cloud { 
      color: #FF9900;
    }
    
    .category-tools { 
      color: #F05032;
    }

    /* Category emoji labels */
    .category-label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--text-sm);
      font-weight: var(--font-medium);
      color: var(--text-secondary);
      padding: 0.5rem 1rem;
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      border-radius: 2rem;
      margin-bottom: 1.5rem;
      transition: all var(--duration-normal) ease;
    }

    .category-label:hover {
      transform: translateY(-2px);
      border-color: rgba(139, 92, 246, 0.3);
      color: var(--text-primary);
    }

    .category-emoji {
      font-size: 1.25rem;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .intro-skills {
        padding: 3rem 1rem;
      }

      .skills-title {
        font-size: var(--text-3xl);
        margin-bottom: 2rem;
      }

      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 2rem;
      }

      .skill-item {
        width: 160px;
        height: 160px;
      }

      .skill-name {
        font-size: var(--text-base);
      }

      .skill-category {
        font-size: 0.7rem;
        padding: 0.3rem 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1.5rem;
      }

      .skill-item {
        width: 140px;
        height: 140px;
        border-radius: 2rem;
      }

      .skill-name {
        font-size: var(--text-sm);
      }

      .skill-category {
        font-size: 0.65rem;
        top: 12px;
        right: 12px;
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

      // Floating animation for skill items with varied timing
      const skillItems = document.querySelectorAll('.skill-item');
      skillItems.forEach((item, index) => {
        gsap.to(item, {
          y: '+=15',
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });

      // Enhanced hover animations
      skillItems.forEach((item) => {
        const icon = item.querySelector('.skill-icon');
        const glowBg = item.querySelector('.skill-glow');
        
        item.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.4,
            ease: 'back.out(2)',
          });
          
          if (glowBg) {
            gsap.to(glowBg, {
              opacity: 1,
              scale: 1.5,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
          
          if (glowBg) {
            gsap.to(glowBg, {
              opacity: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
        });
      });
    };

    loadGSAP();
  });

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <div ref={containerRef} class={`intro-skills ${props.class || ''}`}>
      <div class="skills-bg-gradient" />
      <h2 class="skills-title">{t('app.intro.skills.title')}</h2>
      <div class="skills-grid">
        {skills.map((skill) => (
          <div key={skill.key} class={`skill-item category-${skill.category}`}>
            <div class="skill-glow" />
            <span class={`skill-category category-${skill.category}`}>
              {categoryInfo[skill.category].emoji} {t(`app.intro.skills.${skill.category}`)}
            </span>
            <div class="skill-icon">
              <SkillIcon name={skill.key} size="large" />
            </div>
            <span class="skill-name">{t(`app.intro.skills.items.${skill.key}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
});