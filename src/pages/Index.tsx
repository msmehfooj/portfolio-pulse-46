
import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import GithubStats from '@/components/GithubStats';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen home-page">
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
