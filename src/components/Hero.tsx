import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  // Refs for the elements we want to animate
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
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
    if (textRef.current) {
      animate(textRef.current, 500);
    }
    if (buttonsRef.current) {
      animate(buttonsRef.current, 700);
    }
    if (backgroundRef.current) {
      animate(backgroundRef.current, 200);
    }
    
    // Detect color scheme
    const detectColorScheme = () => {
      const htmlElement = document.documentElement;
      const isDark = 
        htmlElement.classList.contains('dark') || 
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setIsDarkMode(isDark);
    };
    
    detectColorScheme();
    
    // Listen for changes in the color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => detectColorScheme();
    mediaQuery.addEventListener('change', handleChange);
    
    // Also check for changes to the HTML element
    const observer = new MutationObserver(detectColorScheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);
  
  // Animation for resume download
  const handleResumeClick = () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      
      // Reset the state after a short delay
      setTimeout(() => {
        setDownloadComplete(false);
        // Actually trigger the download
        window.open('https://drive.google.com/file/d/1RtD3L-hctEz2Wzz1_FZIFUzoaRiMM8q3/view?usp=drivesdk', '_blank');
      }, 1200);
    }, 1500);
  };
  
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-1000"
        style={{ transform: 'scale(1.05)', opacity: 0, transition: 'transform 1.5s ease-out, opacity 1.5s ease-out' }}
      >
        <div className="absolute top-[-200px] left-[-300px] w-[600px] h-[600px] bg-gradient-to-br from-white/5 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-[-200px] right-[-300px] w-[600px] h-[600px] bg-gradient-to-tr from-white/5 to-transparent rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-6 z-10 pt-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-3xl">
            <h1 
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out text-balance"
            >
              Building Solutions, <br /> One Line at a Time
            </h1>
            
            <p 
              ref={textRef}
              className="text-lg md:text-xl mb-6 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out text-pretty font-mono"
            >
              "Just a guy who speaks fluent Python (and sometimes English)"
            </p>
            
            <p 
              className="text-base md:text-lg text-muted-foreground mb-8 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out text-pretty italic"
              style={{ animationDelay: '600ms' }}
            >
              I enjoy solving problems and figuring out how things work. Always curious and learning something new to improve my skills.
            </p>
            
            <div 
              ref={buttonsRef}
              className="flex flex-wrap justify-center gap-4 opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
            >
              <Button 
                asChild
                className={cn(
                  "group rounded-full px-6 animated-button backdrop-blur-sm border transition-all duration-300",
                  isDarkMode 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    : "bg-black/10 border-black/20 text-black hover:bg-black/20"
                )}
              >
                <Link to="/about">
                  <span className="flex items-center">
                    About Me
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                className={cn(
                  "group rounded-full px-6 animated-button backdrop-blur-sm border transition-all duration-300",
                  isDarkMode 
                    ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    : "bg-black/5 border-black/10 text-black hover:bg-black/10"
                )}
                onClick={handleResumeClick}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <span className="flex items-center">
                    <svg className={cn(
                      "animate-spin -ml-1 mr-2 h-4 w-4",
                      isDarkMode ? "text-white" : "text-black"
                    )} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Downloading...
                  </span>
                ) : downloadComplete ? (
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Downloaded!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    Resume
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Moved further down */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse-subtle mt-16">
        <ArrowRight className={cn(
          "h-5 w-5 transform rotate-90", 
          isDarkMode ? "text-muted-foreground/50" : "text-gray-500/70"
        )} />
        <span className={cn(
          "text-xs mt-2 font-mono",
          isDarkMode ? "text-muted-foreground/50" : "text-gray-500/70"
        )}>
          Scroll
        </span>
      </div>
    </section>
  );
};

export default Hero;
