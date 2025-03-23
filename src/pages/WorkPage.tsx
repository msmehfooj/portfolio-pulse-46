
import React, { useEffect } from 'react';
import Projects from '@/components/Projects';
import GithubStats from '@/components/GithubStats';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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
    <div className="pt-24 min-h-screen relative">
      {/* Fixed background elements with proper z-index */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent dark:from-black/40 opacity-60 pointer-events-none"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-6 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">My Work</h1>
      </div>
      
      <div className="relative z-10">
        <ErrorBoundary fallback={<div className="container mx-auto py-12 text-center">Failed to load projects. Please try again later.</div>}>
          <Projects />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<div className="container mx-auto py-12 text-center">Failed to load GitHub stats. Please try again later.</div>}>
          <GithubStats />
        </ErrorBoundary>
        
        <Footer />
      </div>
    </div>
  );
};

export default WorkPage;
