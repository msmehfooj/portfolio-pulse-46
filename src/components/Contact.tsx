
import React, { useState } from 'react';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { toast } from "sonner";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { ref, isVisible } = useScrollAnimation();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };
  
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Savvythelegend' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/mehfooj-a-b6aa0b243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/Mehfooj194108' },
    { name: 'Email', icon: Mail, url: 'mailto:hello@savvylegend.com' },
  ];
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      id="contact"
      className={cn(
        "section-padding",
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      )}
      style={{ transition: "opacity 0.8s ease-out, transform 0.8s ease-out" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground inline-block mb-2 tag neo-effect px-3 py-1">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Let's Connect</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out to me.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact form */}
          <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 focus:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="transition-all duration-300 focus:ring-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="resize-none transition-all duration-300 focus:ring-primary/20"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full group animated-button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </div>
          
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to connect with me on social media or send me an email.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-full border bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                
                <div className="mt-6">
                  <p className="font-medium">Email</p>
                  <a 
                    href="mailto:hello@mehfoojkhan.com"
                    className="text-muted-foreground hover:text-foreground hover-link-effect inline-block"
                  >
                    hello@mehfoojkhan.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Open to Opportunities</h3>
              <p className="text-muted-foreground">
                I'm currently available for freelance work, collaboration, or full-time remote positions in Python development and backend systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
