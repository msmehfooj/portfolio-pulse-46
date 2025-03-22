
import React from 'react';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Contact</h1>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
