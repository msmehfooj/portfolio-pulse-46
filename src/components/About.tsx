
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
              I enjoy solving problems and figuring out how things work</p>
            
            <p className="text-muted-foreground text-pretty italic">
Always curious and learning something new to improve my skills.</p>
          </div>
          
          <div 
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className={cn(
              "relative rounded-2xl overflow-hidden aspect-square transition-all duration-1000",
              imageIsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"></div>
            <div className="bg-secondary/50 absolute inset-0 rounded-2xl overflow-hidden transform transition-transform duration-700 hover:scale-[0.98]">
              <img 
                src="/lovable-uploads/7674335c-d7ae-4e56-902d-8e436e6e8b0d.png" 
                alt="Profile Image" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
