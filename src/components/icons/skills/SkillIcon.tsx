import { component$ } from '@builder.io/qwik';

interface SkillIconProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  class?: string;
}

export const SkillIcon = component$<SkillIconProps>(({ name, size = 'medium', class: className }) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const iconSize = sizeMap[size];
  
  // public 폴더의 SVG 파일을 참조
  return (
    <img 
      src={`/icons/skills/${name}.svg`}
      alt={`${name} icon`}
      width={iconSize}
      height={iconSize}
      class={className}
      loading="lazy"
    />
  );
});