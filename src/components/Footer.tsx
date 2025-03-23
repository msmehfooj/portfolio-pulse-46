
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Savvythelegend' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/mehfooj-a-b6aa0b243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/Mehfooj194108' },
    { name: 'Email', icon: Mail, url: 'mailto:hello@savvylegend.com' },
  ];
  
  return (
    <footer className="py-12 px-6 border-t">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-display font-medium tracking-tighter">
              mehfooj.
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Python developer specializing in backend development
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end mb-6 md:mb-0">
            <div className="flex space-x-3 mb-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 hover:bg-primary/10 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="p-2 mb-4 rounded-full border hover:bg-secondary transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Mehfooj Khan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
