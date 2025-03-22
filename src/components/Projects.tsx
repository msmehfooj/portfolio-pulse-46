import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
    image: "/assets/projects/ai-text-summarizer.png"
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
    image: "/assets/projects/monkeytype-bot.png"
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
    image: "/assets/projects/fcc-data-analysis.png"
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
    image: "/assets/projects/weather-forecast-app.png"
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
    image: "/assets/projects/jovian-job-app.png"
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
    image: "/assets/projects/ai-agent.png"
  }
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  
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
    <section className="section-padding">
      <h2 className="text-center text-3xl font-bold">My Projects</h2>
      <div className="flex justify-center gap-4 my-4">
        {filters.map(filter => (
          <Button key={filter} onClick={() => setActiveFilter(filter)} className={cn(activeFilter === filter ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900')}>
            {filter}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(repo => (
          <div key={repo.id} className="p-4 border rounded-lg shadow bg-white dark:bg-gray-900">
            <img src={repo.image} alt={repo.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-2 text-gray-800 dark:text-white">{repo.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{repo.description}</p>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
