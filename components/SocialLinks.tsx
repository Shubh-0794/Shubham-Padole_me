import React from 'react';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { resumeData } from '../data/resume';

const SocialLinks: React.FC = () => {
  return (
    <ul className="ml-1 mt-8 flex items-center gap-6" aria-label="Social media">
      <li>
        <a 
            className="flex items-center gap-2 text-sm text-arwes-text/60 hover:text-arwes-primary transition-colors group" 
            href={resumeData.social.email} 
            target="_blank" 
            rel="noreferrer"
        >
          <div className="p-2 border border-arwes-primary/30 group-hover:border-arwes-primary group-hover:bg-arwes-primary/10 transition-all clip-arwes">
             <Mail className="h-5 w-5" />
          </div>
          <span className="hidden lg:inline font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">MAIL</span>
        </a>
      </li>
      <li>
        <a 
            className="flex items-center gap-2 text-sm text-arwes-text/60 hover:text-arwes-primary transition-colors group" 
            href={resumeData.social.linkedin} 
            target="_blank" 
            rel="noreferrer"
        >
          <div className="p-2 border border-arwes-primary/30 group-hover:border-arwes-primary group-hover:bg-arwes-primary/10 transition-all clip-arwes">
             <Linkedin className="h-5 w-5" />
          </div>
          <span className="hidden lg:inline font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">LINKEDIN</span>
        </a>
      </li>
      <li>
        <a 
            className="flex items-center gap-2 text-sm text-arwes-text/60 hover:text-arwes-primary transition-colors group" 
            href={resumeData.social.github} 
            target="_blank" 
            rel="noreferrer"
        >
          <div className="p-2 border border-arwes-primary/30 group-hover:border-arwes-primary group-hover:bg-arwes-primary/10 transition-all clip-arwes">
            <Github className="h-5 w-5" />
          </div>
          <span className="hidden lg:inline font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">GITHUB</span>
        </a>
      </li>
      <li>
        <a 
            className="flex items-center gap-2 text-sm text-arwes-text/60 hover:text-arwes-primary transition-colors group" 
            href={resumeData.social.twitter} 
            target="_blank" 
            rel="noreferrer"
        >
          <div className="p-2 border border-arwes-primary/30 group-hover:border-arwes-primary group-hover:bg-arwes-primary/10 transition-all clip-arwes">
            <Twitter className="h-5 w-5" />
          </div>
          <span className="hidden lg:inline font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">TWITTER</span>
        </a>
      </li>
    </ul>
  );
};

export default SocialLinks;