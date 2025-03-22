
import React from 'react';
import { cn } from '@/lib/utils';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const About: React.FC = () => {
  const { ref: sectionRef, isVisible: sectionIsVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageIsVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "section-padding",
        sectionIsVisible ? "opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1">About</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">The Journey So Far</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-pretty">
              I am a Python developer currently learning Machine Learning, AI, Cloud, and DevOps. My focus is on backend development, automation, and API integrations.
            </p>
            
            <p className="text-muted-foreground text-pretty">
              With a background in software development and a passion for AI, I'm constantly exploring new technologies and methodologies to create efficient, scalable solutions that solve real-world problems.
            </p>
            
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">Highlights</h3>
              <ul className="space-y-3">
                {[
                  "Y Combinator Startup School Fellow",
                  "Postman Student Expert (API Design, Testing, Automation)",
                  "Google Cloud Arcade Facilitator"
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-3"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div 
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/5] transition-all duration-1000",
              imageIsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"></div>
            <div className="bg-secondary/50 absolute inset-0 rounded-2xl overflow-hidden transform transition-transform duration-700 hover:scale-[0.98]">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Profile Image
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
