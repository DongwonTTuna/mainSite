// Skill category definitions with emojis
export const skillCategories = {
  frontend: {
    emoji: '🎨',
    label: 'Frontend',
    color: '#61DAFB',
  },
  backend: {
    emoji: '⚙️',
    label: 'Backend',
    color: '#68A063',
  },
  cloud: {
    emoji: '☁️',
    label: 'Cloud & DevOps',
    color: '#FF9900',
  },
  tools: {
    emoji: '🛠️',
    label: 'Tools & Testing',
    color: '#F05032',
  },
} as const;

export type SkillCategoryKey = keyof typeof skillCategories;