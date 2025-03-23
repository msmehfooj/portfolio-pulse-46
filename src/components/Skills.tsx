
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface Skill {
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const skills: Skill[] = [
  // Programming category
  { name: 'Python', category: 'Programming', level: 'advanced' },
  { name: 'Flask', category: 'Programming', level: 'intermediate' },
  { name: 'API Development', category: 'Programming', level: 'intermediate' },
  
  // Data & Databases category
  { name: 'SQL', category: 'Data & Databases', level: 'intermediate' },
  { name: 'MySQL', category: 'Data & Databases', level: 'intermediate' },
  { name: 'PostgreSQL', category: 'Data & Databases', level: 'beginner' },
  { name: 'Data Analysis', category: 'Data & Databases', level: 'intermediate' },
  
  // Machine Learning category
  { name: 'ML Concepts', category: 'Machine Learning', level: 'intermediate' },
  { name: 'Model Training', category: 'Machine Learning', level: 'beginner' },
  
  // Backend Development category
  { name: 'REST APIs', category: 'Backend Development', level: 'advanced' },
  { name: 'Authentication', category: 'Backend Development', level: 'intermediate' },
  { name: 'Web Scraping', category: 'Backend Development', level: 'intermediate' },
  
  // Problem-Solving category
  { name: 'Algorithmic Thinking', category: 'Problem-Solving', level: 'advanced' },
  { name: 'Debugging', category: 'Problem-Solving', level: 'advanced' },
  
  // Cloud & DevOps category
  { name: 'Google Cloud', category: 'Cloud & DevOps', level: 'intermediate' },
  { name: 'AWS', category: 'Cloud & DevOps', level: 'beginner' },
  { name: 'Deployment', category: 'Cloud & DevOps', level: 'intermediate' },
];

// Using only black, white and gray colors
const categoryColors: Record<string, string> = {
  'Programming': 'bg-white/5 text-white border-white/20',
  'Data & Databases': 'bg-white/10 text-white border-white/20',
  'Machine Learning': 'bg-white/5 text-white border-white/20',
  'Backend Development': 'bg-white/10 text-white border-white/20',
  'Problem-Solving': 'bg-white/5 text-white border-white/20',
  'Cloud & DevOps': 'bg-white/10 text-white border-white/20',
};

const levelIndicator: Record<string, { icon: string, color: string }> = {
  'beginner': { icon: '●○○', color: 'text-gray-400' },
  'intermediate': { icon: '●●○', color: 'text-gray-200' },
  'advanced': { icon: '●●●', color: 'text-white' },
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();
  
  const filteredSkills = activeCategory 
    ? skills.filter(skill => skill.category === activeCategory) 
    : skills;
  
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "section-padding",
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag glass-effect px-3 py-1">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Skills & Tech Stack</h2>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all border backdrop-blur-sm",
              !activeCategory 
                ? "bg-white/10 text-white border-white/20" 
                : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
            )}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border backdrop-blur-sm",
                activeCategory === category 
                  ? "bg-white/10 text-white border-white/20" 
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            // Create staggered animation delays
            const animationDelay = isVisible ? `${(index % 20) * 50}ms` : '0ms';
            
            return (
              <div
                key={`${skill.category}-${skill.name}`}
                className="glass-effect border rounded-lg p-4 transition-all duration-500 hover:shadow-lg relative overflow-hidden group transform hover:scale-105"
                style={{ 
                  animationDelay,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease-out ${animationDelay}` 
                }}
              >
                {/* Skill category badge */}
                <span className={cn(
                  "inline-block text-xs px-2 py-1 rounded-full border backdrop-blur-sm",
                  categoryColors[skill.category]
                )}>
                  {skill.category}
                </span>
                
                {/* Skill name */}
                <h3 className="text-lg font-mono mt-2 mb-1">{skill.name}</h3>
                
                {/* Skill level indicator */}
                <div className={cn(
                  "text-xs font-mono",
                  levelIndicator[skill.level].color
                )}>
                  {levelIndicator[skill.level].icon}
                </div>
                
                {/* Animated background accent */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
