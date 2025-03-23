
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
    
    // Cleanup function to remove the class when navigating away
    return () => {
      document.body.classList.remove('home-grid-pattern');
    };
  }, []);
  
  return (
    <div className="min-h-screen home-page">
      <div className="grid-background fixed inset-0 z-0 opacity-10 pointer-events-none animate-grid-fade-in"></div>
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
