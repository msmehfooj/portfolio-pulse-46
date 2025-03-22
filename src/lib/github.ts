
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

// Mock data to use when GitHub API fails
const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "Python API Service",
    description: "A RESTful API service built with Flask providing data analytics endpoints.",
    html_url: "https://github.com/mehfoojkkhan/python-api-service",
    homepage: "https://api-service-demo.com",
    stargazers_count: 12,
    forks_count: 5,
    topics: ["python", "flask", "api", "rest"],
    language: "Python",
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-06-20T14:45:00Z"
  },
  {
    id: 2,
    name: "SQL Data Analyzer",
    description: "A tool for analyzing SQL data and generating insights through visualizations.",
    html_url: "https://github.com/mehfoojkkhan/sql-data-analyzer",
    homepage: "",
    stargazers_count: 8,
    forks_count: 2,
    topics: ["python", "sql", "data-analysis", "visualization"],
    language: "Python",
    created_at: "2023-02-10T15:20:00Z",
    updated_at: "2023-07-05T09:15:00Z"
  },
  {
    id: 3,
    name: "ML Model Trainer",
    description: "A simple machine learning model training pipeline with easy configuration.",
    html_url: "https://github.com/mehfoojkkhan/ml-model-trainer",
    homepage: "https://ml-trainer-demo.com",
    stargazers_count: 15,
    forks_count: 3,
    topics: ["python", "machine-learning", "ml", "training"],
    language: "Python",
    created_at: "2023-03-20T12:00:00Z",
    updated_at: "2023-08-15T16:30:00Z"
  },
  {
    id: 4,
    name: "Cloud Deployment Tool",
    description: "Automate deployment of Python applications to cloud environments.",
    html_url: "https://github.com/mehfoojkkhan/cloud-deployment-tool",
    homepage: "",
    stargazers_count: 7,
    forks_count: 1,
    topics: ["python", "cloud", "deployment", "automation"],
    language: "Python",
    created_at: "2023-04-05T08:45:00Z",
    updated_at: "2023-09-10T11:20:00Z"
  },
  {
    id: 5,
    name: "Web Scraper Framework",
    description: "A robust framework for building web scrapers with built-in rate limiting and proxy support.",
    html_url: "https://github.com/mehfoojkkhan/web-scraper-framework",
    homepage: "",
    stargazers_count: 11,
    forks_count: 4,
    topics: ["python", "web-scraping", "automation", "data-collection"],
    language: "Python",
    created_at: "2023-05-12T14:10:00Z",
    updated_at: "2023-10-20T13:40:00Z"
  },
  {
    id: 6,
    name: "Authentication Service",
    description: "A reusable authentication service with support for multiple authentication methods.",
    html_url: "https://github.com/mehfoojkkhan/authentication-service",
    homepage: "https://auth-service-demo.com",
    stargazers_count: 9,
    forks_count: 2,
    topics: ["python", "authentication", "security", "api"],
    language: "Python",
    created_at: "2023-06-18T09:30:00Z",
    updated_at: "2023-11-25T15:15:00Z"
  }
];

// Mock GitHub stats
const mockStats: GithubStats = {
  totalStars: 62,
  totalForks: 17,
  totalRepos: 6,
  languages: {
    "Python": 6
  }
};

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
        console.error('Error fetching GitHub repositories:', err);
        
        // Fall back to mock data
        setRepositories(mockRepositories);
        setStats(mockStats);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  return { repositories, stats, isLoading, error };
}
