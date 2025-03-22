import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGithubRepositories } from '@/lib/github';
import { Button } from '@/components/ui/button';

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
  // Add more projects here
];

const Projects = () => {
  const { repositories, isLoading, error } = useGithubRepositories();
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [forceVisible, setForceVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const allProjects = myProjects;
  
  const filters = ['All Projects', 'AI', 'Web Development', 'Data Analysis', 'Automation'];
  
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
  
  return (
    <section className="section-padding">
      <h2 className="text-center text-3xl font-bold">My Projects</h2>
      <div className="flex justify-center gap-4 my-4">
        {filters.map(filter => (
          <Button key={filter} onClick={() => setActiveFilter(filter)} className={cn(activeFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200')}>
            {filter}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(repo => (
          <div key={repo.id} className="p-4 border rounded-lg shadow">
            <img src={repo.image} alt={repo.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-2">{repo.name}</h3>
            <p className="text-gray-600">{repo.description}</p>
            <div className="flex items-center justify-between mt-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center">
                <Github size={16} className="mr-1" /> Repo
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-green-500 flex items-center">
                  <ExternalLink size={16} className="mr-1" /> Live
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Star size={16} /> {repo.stargazers_count}
              <GitFork size={16} /> {repo.forks_count}
            </div>
          </div>
        ))}
      </div>
      {filteredProjects.length < allProjects.length && (
        <div className="text-center mt-6">
          <Button onClick={loadMore} className="bg-blue-500 text-white px-4 py-2 rounded-md">Load More</Button>
        </div>
      )}
    </section>
  );
};

export default Projects;
