
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

const categoryColors: Record<string, string> = {
  'Programming': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  'Data & Databases': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  'Machine Learning': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  'Backend Development': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  'Problem-Solving': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  'Cloud & DevOps': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
};

const levelIndicator: Record<string, { icon: string, color: string }> = {
  'beginner': { icon: '●○○', color: 'text-muted-foreground/70' },
  'intermediate': { icon: '●●○', color: 'text-primary/80' },
  'advanced': { icon: '●●●', color: 'text-primary' },
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
          <span className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Skills & Tech Stack</h2>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all border",
              !activeCategory 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                activeCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
                className="bg-card border rounded-lg p-4 transition-all duration-300 hover:shadow-sm relative overflow-hidden group"
                style={{ 
                  animationDelay,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${animationDelay}, transform 0.5s ease-out ${animationDelay}` 
                }}
              >
                {/* Skill category badge */}
                <span className={cn(
                  "inline-block text-xs px-2 py-1 rounded-full border",
                  categoryColors[skill.category]
                )}>
                  {skill.category}
                </span>
                
                {/* Skill name */}
                <h3 className="text-lg font-medium mt-2 mb-1">{skill.name}</h3>
                
                {/* Skill level indicator */}
                <div className={cn(
                  "text-xs font-mono",
                  levelIndicator[skill.level].color
                )}>
                  {levelIndicator[skill.level].icon}
                </div>
                
                {/* Subtle background accent */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-muted/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
