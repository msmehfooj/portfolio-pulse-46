
import React from 'react';
import Projects from '@/components/Projects';
import GithubStats from '@/components/GithubStats';
import Footer from '@/components/Footer';

const WorkPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">My Work</h1>
      </div>
      <Projects />
      <GithubStats />
      <Footer />
    </div>
  );
};

export default WorkPage;
