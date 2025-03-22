import React, { useState } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGithubRepositories } from '@/lib/github';
import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/useScrollAnimation';

// Your actual projects to display when GitHub API fails or as fallback
const myProjects = [
  {
    id: 1,
    name: "AI Text Summarizer App",
    description: "NLP-powered AI summarization tool that condenses long articles and documents into concise summaries.",
    html_url: "https://github.com/yourusername/ai-text-summarizer",
    homepage: "https://ai-summarizer-demo.com",
    stargazers_count: 12,
    forks_count: 5,
    topics: ["ai", "nlp", "python", "flask"],
    language: "Python",
    image: "/lovable-uploads/07b2232a-a2fb-4cb3-a1f9-20c084bb9203.png"
  },
  {
    id: 2,
    name: "MonkeyType Bot",
    description: "Selenium-based bot automation that demonstrates web automation capabilities for typing tests.",
    html_url: "https://github.com/yourusername/monkeytype-bot",
    homepage: "",
    stargazers_count: 8,
    forks_count: 2,
    topics: ["selenium", "python", "automation"],
    language: "Python",
    image: "/lovable-uploads/b6acd2b6-e9ee-40b0-8aa4-f83a68a46935.png"
  },
  {
    id: 3,
    name: "FCC Advanced Data Analysis",
    description: "Python-based data analysis project using scientific libraries to extract meaningful insights from datasets.",
    html_url: "https://github.com/yourusername/fcc-data-analysis",
    homepage: "https://fcc-data-analysis-demo.com",
    stargazers_count: 15,
    forks_count: 3,
    topics: ["python", "data-analysis", "pandas", "matplotlib"],
    language: "Python",
    image: "/lovable-uploads/d89ab004-689a-4261-b010-f145204415d3.png"
  },
  {
    id: 4,
    name: "Weather Forecast App",
    description: "Web app integrating OpenWeatherMap API to provide real-time weather information and forecasts.",
    html_url: "https://github.com/yourusername/weather-forecast-app",
    homepage: "https://weather-app-demo.com",
    stargazers_count: 7,
    forks_count: 1,
    topics: ["javascript", "api", "web-development"],
    language: "JavaScript",
    image: "/lovable-uploads/07b2232a-a2fb-4cb3-a1f9-20c084bb9203.png"
  },
  {
    id: 5,
    name: "Jovian Job App",
    description: "Job finder application built with Flask & Jinja templates to help users discover and apply for opportunities.",
    html_url: "https://github.com/yourusername/jovian-job-app",
    homepage: "",
    stargazers_count: 11,
    forks_count: 4,
    topics: ["flask", "python", "jinja", "web"],
    language: "Python",
    image: "/lovable-uploads/b6acd2b6-e9ee-40b0-8aa4-f83a68a46935.png"
  },
  {
    id: 6,
    name: "AI Agent",
    description: "Ongoing development of a personal AI assistant capable of handling various tasks through natural language processing.",
    html_url: "https://github.com/yourusername/ai-agent",
    homepage: "https://ai-agent-demo.com",
    stargazers_count: 9,
    forks_count: 2,
    topics: ["ai", "llm", "python", "nlp"],
    language: "Python",
    image: "/lovable-uploads/d89ab004-689a-4261-b010-f145204415d3.png"
  }
];

const Projects = () => {
  const { repositories, isLoading, error } = useGithubRepositories();
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { ref, isVisible } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('All Projects');
  
  // Always use your actual projects instead of GitHub API data
  const allProjects = myProjects;
  
  const filters = [
    'All Projects',
    'AI',
    'Web Development',
    'Data Analysis',
    'Automation'
  ];
  
  // Filter projects based on selected filter
  const filteredProjects = allProjects
    .filter(repo => {
      if (activeFilter === 'All Projects') return true;
      if (activeFilter === 'AI') return repo.topics?.includes('ai') || repo.topics?.includes('nlp');
      if (activeFilter === 'Web Development') return repo.topics?.includes('web') || repo.topics?.includes('web-development') || repo.topics?.includes('flask');
      if (activeFilter === 'Data Analysis') return repo.topics?.includes('data-analysis') || repo.topics?.includes('pandas') || repo.topics?.includes('matplotlib');
      if (activeFilter === 'Automation') return repo.topics?.includes('automation') || repo.topics?.includes('selenium');
      return true;
    })
    .slice(0, visibleProjects);
  
  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };
  
  // Project images are already included in the project objects
  const getImageForRepo = (repo) => {
    return repo.image;
  };
  
  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="h-60 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-32 bg-muted rounded mb-4"></div>
              <div className="h-4 w-48 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      ref={ref}
      className={cn(
        "section-padding",
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">My Latest Work</h2>
          <p className="text-muted-foreground max-w-2xl">
            Here's a collection of my projects that showcase my skills in AI, Python development, web systems,
            and data analysis. Each project represents a unique solution to real-world problems.
          </p>
          
          {/* Project filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                className={cn(
                  "rounded-full text-sm",
                  activeFilter === filter 
                    ? "bg-foreground text-background" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((repo, index) => {
              // Create staggered animation delays
              const animationDelay = isVisible ? `${(index % 20) * 100}ms` : '0ms';
              
              return (
                <div
                  key={repo.id}
                  className="bg-card border rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-md flex flex-col h-full"
                  style={{ 
                    animationDelay,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease-out ${animationDelay}, transform 0.5s ease-out ${animationDelay}` 
                  }}
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={getImageForRepo(repo)} 
                      alt={repo.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex space-x-2">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
                          aria-label={`View ${repo.name} source code on GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                        
                        {repo.homepage && (
                          <a 
                            href={repo.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
                            aria-label={`Visit ${repo.name} live demo`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {repo.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                      {repo.description}
                    </p>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics && repo.topics.length > 0 ? (
                        repo.topics.slice(0, 4).map(topic => (
                          <span 
                            key={topic} 
                            className="text-xs px-2 py-1 rounded-full border text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))
                      ) : (
                        repo.language && (
                          <span className="text-xs px-2 py-1 rounded-full border text-muted-foreground">
                            {repo.language}
                          </span>
                        )
                      )}
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="h-4 w-4 mr-1" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground/70 font-mono">
                        {repo.language}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No projects found matching the selected filter</p>
            </div>
          )}
        </div>
        
        {allProjects.length > visibleProjects && (
          <div className="mt-12 text-center">
            <Button 
              onClick={loadMore}
              variant="outline"
              className="animated-button"
            >
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
