
import React, { useState } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const myProjects = [
  {
    id: 1,
    name: "AI Text Summarizer App",
    description: "NLP-powered AI summarization tool that condenses long articles and documents into concise summaries.",
    html_url: "https://github.com/Savvythelegend/ai-text-summarizer",
    homepage: "https://ai-summarizer-demo.com",
    stargazers_count: 12,
    forks_count: 5,
    topics: ["AI", "NLP", "Python", "Flask"],
    language: "Python",
    image: "/lovable-uploads/7674335c-d7ae-4e56-902d-8e436e6e8b0d.png"
  },
  {
    id: 2,
    name: "MonkeyType Bot",
    description: "Selenium-based bot automation that demonstrates web automation capabilities for typing tests.",
    html_url: "https://github.com/Savvythelegend/monkeytype-bot",
    homepage: "",
    stargazers_count: 8,
    forks_count: 2,
    topics: ["Selenium", "Python", "Automation"],
    language: "Python",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    name: "FCC Advanced Data Analysis",
    description: "Python-based data analysis project using scientific libraries to extract meaningful insights from datasets.",
    html_url: "https://github.com/Savvythelegend/fcc-data-analysis",
    homepage: "https://fcc-data-analysis-demo.com",
    stargazers_count: 15,
    forks_count: 3,
    topics: ["Python", "Data Analysis", "Pandas", "Matplotlib"],
    language: "Python",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    name: "Weather Forecast App",
    description: "Web app integrating OpenWeatherMap API to provide real-time weather information and forecasts.",
    html_url: "https://github.com/Savvythelegend/weather-forecast-app",
    homepage: "https://weather-app-demo.com",
    stargazers_count: 7,
    forks_count: 1,
    topics: ["JavaScript", "API", "Web Development"],
    language: "JavaScript",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    name: "Jovian Job App",
    description: "Job finder application built with Flask & Jinja templates to help users discover and apply for opportunities.",
    html_url: "https://github.com/Savvythelegend/jovian-job-app",
    homepage: "",
    stargazers_count: 11,
    forks_count: 4,
    topics: ["Flask", "Python", "Jinja", "Web"],
    language: "Python",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 6,
    name: "AI Agent",
    description: "Ongoing development of an AI tools directory featuring various AI tools and technologies.",
    html_url: "https://github.com/Savvythelegend/ai-agent",
    homepage: "https://ai-agent-demo.com",
    stargazers_count: 9,
    forks_count: 2,
    topics: ["AI", "LLM", "Python", "NLP"],
    language: "Python",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000"
  }
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const { ref, isVisible } = useScrollAnimation();
  
  const filters = ['All Projects', 'AI', 'Web Development', 'Data Analysis', 'Automation'];
  
  const filteredProjects = myProjects.filter(repo => {
    if (activeFilter === 'All Projects') return true;
    if (activeFilter === 'AI') return repo.topics.includes('AI') || repo.topics.includes('NLP');
    if (activeFilter === 'Web Development') return repo.topics.includes('Web') || repo.topics.includes('Flask');
    if (activeFilter === 'Data Analysis') return repo.topics.includes('Data Analysis') || repo.topics.includes('Pandas');
    if (activeFilter === 'Automation') return repo.topics.includes('Automation') || repo.topics.includes('Selenium');
    return true;
  }).slice(0, visibleProjects);
  
  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className={cn(
      "section-padding transition-all duration-1000",
      isVisible ? "opacity-100" : "opacity-0 translate-y-10"
    )}>
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">My Projects</h2>
        </div>
        
        <div className="flex justify-center flex-wrap gap-3 my-6">
          {filters.map(filter => (
            <Button 
              key={filter} 
              onClick={() => setActiveFilter(filter)} 
              variant={activeFilter === filter ? "default" : "outline"} 
              className={cn(
                "rounded-full text-sm font-medium transition-all",
                activeFilter === filter ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map(repo => {
            const { ref: cardRef, isVisible: cardIsVisible } = useScrollAnimation();
            
            return (
              <div 
                key={repo.id} 
                ref={cardRef as React.RefObject<HTMLDivElement>}
                className={cn(
                  "bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm transition-all duration-500 hover:shadow-lg hover:border-primary/30 h-full flex flex-col transform hover:-translate-y-1",
                  cardIsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted group">
                  <img 
                    src={repo.image} 
                    alt={repo.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{repo.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{repo.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 3).map(topic => (
                        <Badge key={topic} variant="secondary" className="text-xs py-1 px-2 font-normal bg-secondary/70 hover:bg-secondary/90">
                          {topic}
                        </Badge>
                      ))}
                      {repo.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs py-1 px-2 font-normal">
                          +{repo.topics.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Star size={14} className="mr-1 text-yellow-500" /> 
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <GitFork size={14} className="mr-1 text-primary/70" /> 
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-secondary/50"
                          aria-label={`View ${repo.name} repository on GitHub`}
                        >
                          <Github size={18} />
                        </a>
                        
                        {repo.homepage && (
                          <a 
                            href={repo.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-secondary/50"
                            aria-label={`View live demo for ${repo.name}`}
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
