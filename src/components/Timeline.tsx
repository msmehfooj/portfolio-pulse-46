
import React from 'react';
import { cn } from '@/lib/utils';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Y Combinator Startup School Fellow',
    date: '2024',
    description: 'Participated in Y Combinator\'s Startup School program, gaining insights into entrepreneurship, lean startup methodologies, and scaling strategies. Explored AI-driven startup ideas and networked with industry experts.'
  },
  {
    id: 2,
    title: 'Postman Student Expert',
    date: '2024 - Present',
    description: 'Certified Postman Student Expert, specializing in API design, testing, and automation. Worked on real-world API integration projects, focusing on efficiency and security. Developed and tested APIs for AI-powered applications.'
  },
  {
    id: 3,
    title: 'Google Cloud Arcade Facilitator',
    date: '2023 - 2024',
    description: 'Led Google Cloud Arcade workshops on Cloud Computing, AI, and DevOps. Conducted hands-on training on Google Cloud services, APIs, and containerized applications. Explored deploying LLMs and AI models on Google Cloud.'
  },
  {
    id: 4,
    title: 'Data Analytics & Machine Learning',
    date: '2024 - Present',
    description: 'Built data analytics projects using pandas, NumPy, and Matplotlib. Gained experience in machine learning basics, model training, and AI applications. Developed an AI-powered data visualization tool for pattern analysis.'
  },
  {
    id: 5,
    title: 'Open Source Contributor',
    date: '2024',
    description: 'Contributed to open-source AI, web development, and automation projects. Maintained 67+ repositories on GitHub, covering Flask APIs, Python automation, and AI tools. Actively participated in collaborative software development with the global tech community.'
  }
];

const Timeline: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionIsVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "section-padding bg-muted/30",
        sectionIsVisible ? "opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1">Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Professional Timeline</h2>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-full w-0.5 bg-border left-0 md:left-1/2 transform md:-translate-x-1/2 top-0"></div>
          
          {/* Timeline items */}
          <div className="space-y-12 relative">
            {timelineItems.map((item, index) => {
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
              
              return (
                <div 
                  key={item.id}
                  ref={ref as React.RefObject<HTMLDivElement>}
                  className={cn(
                    "relative md:grid md:grid-cols-2 items-center transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10"></div>
                  
                  {/* Content placement based on even/odd */}
                  <div className={cn(
                    "pb-8 md:pb-0 md:px-12",
                    index % 2 === 0 ? "md:text-right" : "md:col-start-2"
                  )}>
                    <div className="bg-card rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-md relative ml-6 md:ml-0">
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <span className="text-sm text-muted-foreground block mb-4">{item.date}</span>
                      <p className="text-pretty">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Empty column for layout in larger screens */}
                  {index % 2 === 0 && <div className="hidden md:block"></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
