
import React from 'react';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';

const JourneyPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">My Journey</h1>
      </div>
      <Timeline />
      <Footer />
    </div>
  );
};

export default JourneyPage;
