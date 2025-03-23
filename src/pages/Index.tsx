
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import GithubStats from '@/components/GithubStats';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Add grid pattern to the home page
    document.body.classList.add('home-grid-pattern');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup function to remove the class when navigating away
    return () => {
      document.body.classList.remove('home-grid-pattern');
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <div className="min-h-screen home-page">
      {/* Enhanced grid background with improved animation */}
      <div className="grid-background fixed inset-0 z-0 opacity-10 pointer-events-none animate-grid-fade-in"></div>
      
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 to-transparent z-0 pointer-events-none opacity-60"></div>
      
      {/* Content sections */}
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <GithubStats />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
