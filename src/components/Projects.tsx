
import React, { useState } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGithubRepositories } from '@/lib/github';
import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/useScrollAnimation';

// Sample projects to display when GitHub API fails
const fallbackProjects = [
  {
    id: 1,
    name: "Python API Service",
    description: "A RESTful API service built with Flask providing data analytics endpoints.",
    html_url: "https://github.com/yourusername/python-api-service",
    homepage: "https://api-service-demo.com",
    stargazers_count: 12,
    forks_count: 5,
    topics: ["python", "flask", "api", "rest"],
    language: "Python",
    image: "/lovable-uploads/07b2232a-a2fb-4cb3-a1f9-20c084bb9203.png"
  },
  {
    id: 2,
    name: "SQL Data Analyzer",
    description: "A tool for analyzing SQL data and generating insights through visualizations.",
    html_url: "https://github.com/yourusername/sql-data-analyzer",
    homepage: "",
    stargazers_count: 8,
    forks_count: 2,
    topics: ["python", "sql", "data-analysis", "visualization"],
    language: "Python",
    image: "/lovable-uploads/b6acd2b6-e9ee-40b0-8aa4-f83a68a46935.png"
  },
  {
    id: 3,
    name: "ML Model Trainer",
    description: "A simple machine learning model training pipeline with easy configuration.",
    html_url: "https://github.com/yourusername/ml-model-trainer",
    homepage: "https://ml-trainer-demo.com",
    stargazers_count: 15,
    forks_count: 3,
    topics: ["python", "machine-learning", "ml", "training"],
    language: "Python",
    image: "/lovable-uploads/d89ab004-689a-4261-b010-f145204415d3.png"
  },
  {
    id: 4,
    name: "Cloud Deployment Tool",
    description: "Automate deployment of Python applications to cloud environments.",
    html_url: "https://github.com/yourusername/cloud-deployment-tool",
    homepage: "",
    stargazers_count: 7,
    forks_count: 1,
    topics: ["python", "cloud", "deployment", "automation"],
    language: "Python",
    image: "/lovable-uploads/07b2232a-a2fb-4cb3-a1f9-20c084bb9203.png"
  },
  {
    id: 5,
    name: "Web Scraper Framework",
    description: "A robust framework for building web scrapers with built-in rate limiting and proxy support.",
    html_url: "https://github.com/yourusername/web-scraper-framework",
    homepage: "",
    stargazers_count: 11,
    forks_count: 4,
    topics: ["python", "web-scraping", "automation", "data-collection"],
    language: "Python",
    image: "/lovable-uploads/b6acd2b6-e9ee-40b0-8aa4-f83a68a46935.png"
  },
  {
    id: 6,
    name: "Authentication Service",
    description: "A reusable authentication service with support for multiple authentication methods.",
    html_url: "https://github.com/yourusername/authentication-service",
    homepage: "https://auth-service-demo.com",
    stargazers_count: 9,
    forks_count: 2,
    topics: ["python", "authentication", "security", "api"],
    language: "Python",
    image: "/lovable-uploads/d89ab004-689a-4261-b010-f145204415d3.png"
  }
];

const Projects: React.FC = () => {
  const { repositories, isLoading, error } = useGithubRepositories();
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { ref, isVisible } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('All Projects');
  
  // Use fallback projects if the GitHub API fails
  const allProjects = repositories.length > 0 ? repositories : fallbackProjects;
  
  const filters = [
    'All Projects',
    'Featured',
    'Backend',
    'Data',
    'Machine Learning'
  ];
  
  // Filter projects based on selected filter
  const filteredProjects = allProjects
    .filter(repo => {
      if (activeFilter === 'All Projects') return true;
      if (activeFilter === 'Featured') return repo.stargazers_count > 0;
      if (activeFilter === 'Backend') return repo.topics?.includes('api') || repo.topics?.includes('backend') || repo.topics?.includes('flask');
      if (activeFilter === 'Data') return repo.topics?.includes('data') || repo.topics?.includes('sql') || repo.topics?.includes('analysis');
      if (activeFilter === 'Machine Learning') return repo.topics?.includes('ml') || repo.topics?.includes('machine-learning');
      return true;
    })
    .slice(0, visibleProjects);
  
  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };
  
  // Define project images for demonstration
  const projectImages = [
    '/lovable-uploads/07b2232a-a2fb-4cb3-a1f9-20c084bb9203.png',
    '/lovable-uploads/b6acd2b6-e9ee-40b0-8aa4-f83a68a46935.png',
    '/lovable-uploads/d89ab004-689a-4261-b010-f145204415d3.png',
  ];
  
  // Function to get an image based on repo index or from repo object
  const getImageForRepo = (repo: any, index: number) => {
    return repo.image || projectImages[index % projectImages.length];
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
      ref={ref as React.RefObject<HTMLDivElement>}
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
            Here's a collection of my recent projects that showcase my skills in Python development, backend systems,
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
                      src={getImageForRepo(repo, index)} 
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
                      {repo.description || "An innovative solution built with modern technologies."}
                    </p>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics && repo.topics.length > 0 ? (
                        repo.topics.slice(0, 3).map(topic => (
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
              <p className="text-lg text-muted-foreground">No projects found</p>
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
