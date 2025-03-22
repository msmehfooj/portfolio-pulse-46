
import React from 'react';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">About Me</h1>
      </div>
      <About />
      <Skills />
      <Footer />
    </div>
  );
};

export default AboutPage;
