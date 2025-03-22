
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
    date: '2022 - Present',
    description: 'Participated in Y Combinator\'s Startup School program, learning about entrepreneurship and startup development.'
  },
  {
    id: 2,
    title: 'Postman Student Expert',
    date: '2021 - Present',
    description: 'Expertise in API design, testing, and automation using Postman.'
  },
  {
    id: 3,
    title: 'Google Cloud Arcade Facilitator',
    date: '2020 - 2021',
    description: 'Led workshops and training sessions on Google Cloud Platform technologies.'
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
