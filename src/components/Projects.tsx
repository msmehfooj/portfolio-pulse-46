
import React, { useState } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGithubRepositories } from '@/lib/github';
import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Projects: React.FC = () => {
  const { repositories, isLoading, error } = useGithubRepositories();
  const [visibleProjects, setVisibleProjects] = useState(6);
  const { ref, isVisible } = useScrollAnimation();
  
  // Filter for featured projects (either based on stars or manually selected)
  const featuredProjects = repositories
    .filter(repo => repo.stargazers_count > 0 || repo.description?.includes('featured'))
    .slice(0, visibleProjects);
  
  const loadMore = () => {
    setVisibleProjects(prev => prev + 6);
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
  
  if (error) {
    return (
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground">
            Unable to load projects. Please check back later.
          </p>
        </div>
      </section>
    );
  }
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "section-padding bg-muted/30",
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Featured Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((repo, index) => {
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
                  {/* Project header */}
                  <div className="p-6 pb-4 border-b">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {repo.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {repo.description || "No description available"}
                    </p>
                  </div>
                  
                  {/* Tech tags */}
                  <div className="p-6 pt-4">
                    {repo.topics && repo.topics.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.slice(0, 3).map(topic => (
                          <span 
                            key={topic} 
                            className="text-xs px-2 py-1 rounded-full border text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                        {repo.topics.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full border text-muted-foreground">
                            +{repo.topics.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.language && (
                          <span className="text-xs px-2 py-1 rounded-full border text-muted-foreground">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Stats and links */}
                    <div className="flex items-center justify-between mt-auto">
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
                      
                      <div className="flex space-x-2">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full text-foreground/80 hover:text-foreground transition-colors"
                          aria-label={`View ${repo.name} source code on GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                        
                        {repo.homepage && (
                          <a 
                            href={repo.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-full text-foreground/80 hover:text-foreground transition-colors"
                            aria-label={`Visit ${repo.name} live demo`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
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
        
        {repositories.length > visibleProjects && (
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
