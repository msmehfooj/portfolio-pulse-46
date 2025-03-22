
import { useState, useEffect } from 'react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  language: string;
  created_at: string;
  updated_at: string;
}

interface GithubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: Record<string, number>;
}

// Username to fetch repositories from
const GITHUB_USERNAME = 'mehfoojkkhan';

export function useGithubRepositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GithubStats>({
    totalStars: 0,
    totalForks: 0,
    totalRepos: 0,
    languages: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data: Repository[] = await response.json();
        setRepositories(data);
        
        // Calculate stats
        const totalStars = data.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = data.reduce((acc, repo) => acc + repo.forks_count, 0);
        
        // Aggregate languages
        const languages: Record<string, number> = {};
        data.forEach(repo => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });
        
        setStats({
          totalStars,
          totalForks,
          totalRepos: data.length,
          languages,
        });
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching GitHub repositories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  return { repositories, stats, isLoading, error };
}
