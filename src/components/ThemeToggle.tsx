
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to dark theme initially
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Apply the theme class to the document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full transition-all duration-300 overflow-hidden"
    >
      <Sun className={cn(
        "h-4 w-4 absolute transition-all duration-500",
        theme === 'dark' ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
      )} />
      <Moon className={cn(
        "h-4 w-4 absolute transition-all duration-500",
        theme === 'dark' ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
