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

// Skill data with carefully chosen emojis for each technology
const skills: Skill[] = [
  // Frontend Technologies 🎨
  { key: 'react', category: 'frontend', icon: '⚛️' },
  { key: 'svelte', category: 'frontend', icon: '🔥' },
  { key: 'typescript', category: 'frontend', icon: '💎' },
  { key: 'qwik', category: 'frontend', icon: '⚡' },
  
  // Backend Technologies ⚙️
  { key: 'python', category: 'backend', icon: '🐍' },
  { key: 'nodejs', category: 'backend', icon: '🟩' },
  { key: 'scala', category: 'backend', icon: '🔴' },
  { key: 'java', category: 'backend', icon: '☕' },
  
  // Cloud & Infrastructure ☁️
  { key: 'aws', category: 'cloud', icon: '🌩️' },
  { key: 'docker', category: 'cloud', icon: '🐳' },
  { key: 'kubernetes', category: 'cloud', icon: '☸️' },
  { key: 'terraform', category: 'cloud', icon: '🏗️' },
  
  // Development Tools 🛠️
  { key: 'git', category: 'tools', icon: '📌' },
  { key: 'cicd', category: 'tools', icon: '🔄' },
  { key: 'testing', category: 'tools', icon: '🧪' },
  { key: 'vscode', category: 'tools', icon: '📝' },
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
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 2rem;
      justify-items: center;
    }

    .skill-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 160px;
      height: 160px;
      background: var(--glass-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      border-radius: 2rem;
      box-shadow: var(--glass-shadow);
      opacity: 0;
      transform: scale(0.8) translateY(20px);
      transition: all var(--duration-normal) var(--ease-out-expo);
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

    .skill-item:hover {
      transform: translateY(-8px) scale(1.05);
      border-color: rgba(139, 92, 246, 0.4);
      box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
    }

    /* Category-specific hover effects */
    .skill-item.category-frontend:hover {
      border-color: rgba(97, 218, 251, 0.4);
      box-shadow: 0 20px 40px rgba(97, 218, 251, 0.2);
    }

    .skill-item.category-backend:hover {
      border-color: rgba(104, 160, 99, 0.4);
      box-shadow: 0 20px 40px rgba(104, 160, 99, 0.2);
    }

    .skill-item.category-cloud:hover {
      border-color: rgba(255, 153, 0, 0.4);
      box-shadow: 0 20px 40px rgba(255, 153, 0, 0.2);
    }

    .skill-item.category-tools:hover {
      border-color: rgba(240, 80, 50, 0.4);
      box-shadow: 0 20px 40px rgba(240, 80, 50, 0.2);
    }

    .skill-icon {
      font-size: 3rem;
      margin-bottom: 0.75rem;
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
      transition: all var(--duration-normal) ease;
    }

    .skill-item:hover .skill-icon {
      transform: scale(1.1);
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
    }

    .skill-name {
      font-size: var(--text-base);
      font-weight: var(--font-semibold);
      color: var(--text-primary);
      text-align: center;
      letter-spacing: var(--tracking-wide);
      transition: color var(--duration-normal) ease;
    }

    .skill-category {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: var(--text-xs);
      font-weight: var(--font-medium);
      text-transform: uppercase;
      letter-spacing: var(--tracking-widest);
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
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
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 1.5rem;
      }

      .skill-item {
        width: 130px;
        height: 130px;
      }

      .skill-icon {
        font-size: 2.5rem;
      }

      .skill-name {
        font-size: var(--text-sm);
      }

      .skill-category {
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
      }
    }

    @media (max-width: 480px) {
      .skills-grid {
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 1rem;
      }

      .skill-item {
        width: 110px;
        height: 110px;
        border-radius: 1.5rem;
      }

      .skill-icon {
        font-size: 2rem;
      }

      .skill-name {
        font-size: 0.85rem;
      }

      .skill-category {
        font-size: 0.65rem;
        top: 8px;
        right: 8px;
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

      // Glow animation for icons on hover
      skillItems.forEach((item) => {
        const icon = item.querySelector('.skill-icon');
        item.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
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
      <h2 class="skills-title">{t('app.intro.skills.title')}</h2>
      <div class="skills-grid">
        {skills.map((skill) => (
          <div key={skill.key} class={`skill-item category-${skill.category}`}>
            <span class={`skill-category category-${skill.category}`}>
              {categoryInfo[skill.category].emoji} {t(`app.intro.skills.${skill.category}`)}
            </span>
            <span class="skill-icon">{skill.icon}</span>
            <span class="skill-name">{t(`app.intro.skills.items.${skill.key}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
});