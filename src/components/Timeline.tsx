import React from 'react';
import { cn } from '@/lib/utils';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useIsMobile } from '@/hooks/use-mobile';
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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Timeline: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <motion.span 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1"
          >
            Journey
          </motion.span>
          <motion.h2 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tighter"
          >
            Professional Timeline
          </motion.h2>
        </div>
        
        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute h-full w-0.5 bg-border left-1/2 transform -translate-x-1/2 md:block hidden"></div>
          
          <div className="space-y-8 md:space-y-12 relative">
            {timelineItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={cn(
                  "relative transition-all flex",
                  isMobile 
                    ? "pl-[45px] flex-col" 
                    : index % 2 === 0 
                      ? "md:flex-row-reverse md:pr-12" 
                      : "md:flex-row md:pl-12"
                )}
              >
                {/* Timeline dot indicator */}
                <div className={cn(
                  "absolute w-4 h-4 rounded-full bg-background border-2 border-primary z-10",
                  isMobile 
                    ? "left-[18px] top-1" 
                    : "left-1/2 transform -translate-x-1/2"
                )}></div>
                
                <div className="bg-card rounded-lg p-5 md:p-6 shadow-sm border transition-all duration-300 hover:shadow-md relative">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <span className="text-sm text-muted-foreground block mb-3 md:mb-4">{item.date}</span>
                  <p className="text-pretty text-sm md:text-base">{item.description}</p>
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
