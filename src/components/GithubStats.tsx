
import React from 'react';
import { Star, GitFork, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGithubRepositories } from '@/lib/github';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const GithubStats: React.FC = () => {
  const { stats, isLoading } = useGithubRepositories();
  const { ref, isVisible } = useScrollAnimation();
  
  if (isLoading) {
    return null;
  }
  
  // Sort languages by count (descending)
  const topLanguages = Object.entries(stats.languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "py-16 px-6",
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border rounded-xl p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-muted/50 blur-3xl"></div>
          
          <div className="flex items-center justify-center mb-8">
            <Github className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">GitHub Contributions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stars */}
            <div className="bg-background/50 border rounded-lg p-6 transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-medium">Total Stars</h3>
              </div>
              <p className="text-3xl font-bold">{stats.totalStars}</p>
            </div>
            
            {/* Forks */}
            <div className="bg-background/50 border rounded-lg p-6 transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center mb-4">
                <GitFork className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium">Total Forks</h3>
              </div>
              <p className="text-3xl font-bold">{stats.totalForks}</p>
            </div>
            
            {/* Repositories */}
            <div className="bg-background/50 border rounded-lg p-6 transition-all duration-300 hover:shadow-sm">
              <div className="flex items-center mb-4">
                <Github className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-medium">Repositories</h3>
              </div>
              <p className="text-3xl font-bold">{stats.totalRepos}</p>
            </div>
          </div>
          
          {/* Top languages */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Top Languages</h3>
            <div className="flex flex-wrap gap-3">
              {topLanguages.map(([language, count]) => (
                <div 
                  key={language}
                  className="bg-muted/30 border rounded-full px-4 py-2 text-sm flex items-center"
                >
                  <span className="mr-2">{language}</span>
                  <span className="bg-background text-foreground text-xs rounded-full px-2 py-0.5">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
