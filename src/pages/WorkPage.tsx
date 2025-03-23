
import React, { useEffect } from 'react';
import Projects from '@/components/Projects';
import GithubStats from '@/components/GithubStats';
import Footer from '@/components/Footer';

const WorkPage: React.FC = () => {
  useEffect(() => {
    // Add smooth scroll behavior and grid pattern
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <div className="pt-24 min-h-screen">
      {/* Add the grid background with proper z-index to avoid conflicts */}
      <div className="grid-background fixed inset-0 z-0 opacity-10 pointer-events-none animate-grid-fade-in"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 to-transparent z-0 pointer-events-none opacity-60"></div>
      
      <div className="container mx-auto max-w-6xl px-6 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">My Work</h1>
      </div>
      
      {/* Add key prop to help React with reconciliation */}
      <div className="relative z-10">
        <Projects key="work-page-projects" />
        <GithubStats key="work-page-github" />
        <Footer key="work-page-footer" />
      </div>
    </div>
  );
};

export default WorkPage;
