
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  // Refs for the elements we want to animate
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple animation timing function
    const animate = (element: HTMLElement, delay: number = 0) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay);
    };
    
    // Run animations with staggered timing
    if (headlineRef.current) {
      animate(headlineRef.current, 300);
    }
    if (subtextRef.current) {
      animate(subtextRef.current, 500);
    }
    if (buttonsRef.current) {
      animate(buttonsRef.current, 700);
    }
    if (backgroundRef.current) {
      animate(backgroundRef.current, 200);
    }
  }, []);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-1000"
        style={{ transform: 'scale(1.05)', opacity: 0, transition: 'transform 1.5s ease-out, opacity 1.5s ease-out' }}
      >
        <div className="absolute top-[-200px] left-[-300px] w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-[-200px] right-[-300px] w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container max-w-4xl mx-auto px-6 z-10">
        <div className="text-center">
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out text-balance"
          >
            Building Tomorrow's AI Solutions
          </h1>
          
          <p 
            ref={subtextRef}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 transform translate-y-8 transition-all duration-1000 ease-out text-pretty"
          >
            I'm Mehfooj, a Python developer exploring AI, DevOps, and Cloud, building automation and backend systems.
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-wrap justify-center gap-4 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
          >
            <Button 
              asChild
              className="group rounded-full px-6 animated-button"
            >
              <Link to="/about">
                About Me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="group rounded-full px-6 animated-button"
              asChild
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse-subtle">
        <div className="w-[1px] h-8 bg-muted-foreground/30"></div>
        <span className="text-xs text-muted-foreground mt-2">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
