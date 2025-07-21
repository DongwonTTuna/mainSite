export interface TimelineEvent {
  id: string;
  year: number;
  month: number;
  title: string;
  category: 'education' | 'work' | 'project' | 'certification';
  description: string;
  techStack?: string[];
  links?: {
    github?: string;
    live?: string;
  };
  position?: 'top' | 'bottom';
  highlight?: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin?: string;
}