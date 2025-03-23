
import React, { useEffect } from 'react';
import Projects from '@/components/Projects';
import GithubStats from '@/components/GithubStats';
import Footer from '@/components/Footer';

const WorkPage: React.FC = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <div className="pt-24 min-h-screen">
      {/* Simple static grid background */}
      <div className="grid-background fixed inset-0 z-0 opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/20 to-transparent dark:from-black/40 z-0 pointer-events-none opacity-60"></div>
      
      <div className="container mx-auto max-w-6xl px-6 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">My Work</h1>
      </div>
      
      <div className="relative z-10">
        <Projects key="work-page-projects" />
        <GithubStats key="work-page-github" />
        <Footer key="work-page-footer" />
      </div>
    </div>
  );
};

export default WorkPage;
