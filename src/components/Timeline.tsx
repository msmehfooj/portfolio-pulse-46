import React from 'react';
import { cn } from '@/lib/utils';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: 'Y Combinator Startup School Fellow',
    date: '2024',
    description: "Participated in Y Combinator's Startup School program, gaining insights into entrepreneurship and AI-driven startup ideas."
  },
  {
    id: 2,
    title: 'Postman Student Expert',
    date: '2024 - Present',
    description: "Certified Postman Student Expert specializing in API design, testing, and automation for AI-powered applications."
  },
  {
    id: 3,
    title: 'Google Cloud Arcade Facilitator',
    date: '2023 - 2024',
    description: "Led Google Cloud Arcade workshops on Cloud Computing, AI, and DevOps. Explored deploying AI models on Google Cloud."
  },
  {
    id: 4,
    title: 'Data Analytics & Machine Learning',
    date: '2024 - Present',
    description: "Built analytics projects with Python, gaining hands-on experience in machine learning and AI-driven data visualization."
  },
  {
    id: 5,
    title: 'Open Source Contributor',
    date: '2024',
    description: "Contributed to open-source projects, maintaining 67+ repositories covering Flask APIs, Python automation, and AI tools."
  }
];

const Timeline: React.FC = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1"
          >Journey</motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold tracking-tighter"
          >Professional Timeline</motion.h2>
        </div>
        
        <div className="relative">
          <div className="absolute h-full w-0.5 bg-border left-0 md:left-1/2 transform md:-translate-x-1/2 top-0"></div>
          
          <div className="space-y-12 relative">
            {timelineItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={cn(
                  "relative md:grid md:grid-cols-2 items-center transition-all",
                  index % 2 === 0 ? "md:text-right" : "md:col-start-2"
                )}
              >
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10"></div>
                
                <div className="pb-8 md:pb-0 md:px-12">
                  <div className="bg-card rounded-lg p-6 shadow-sm border transition-all duration-300 hover:shadow-md relative ml-6 md:ml-0">
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <span className="text-sm text-muted-foreground block mb-4">{item.date}</span>
                    <p className="text-pretty">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
