import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, SquareTerminal } from 'lucide-react';
import ArwesFrame from './ArwesFrame';

interface ProjectProps {
  title: string;
  type: string;
  description: string;
  tech: string[];
  link?: string;
  index: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, type, description, tech, link, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Animate only once
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    if (isVisible) {
      // Calculate delay based on index to start typing only when card is potentially visible
      // Adding a bit more delay to let the card fade in first
      const delay = (index * 150) + 300; 
      let intervalId: ReturnType<typeof setInterval>;

      const timeoutId = setTimeout(() => {
        let currentIndex = 0;
        intervalId = setInterval(() => {
          if (currentIndex <= title.length) {
            setDisplayedTitle(title.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(intervalId);
          }
        }, 30);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [isVisible, title, index]);

  return (
    <div 
      ref={cardRef}
      className={`mb-6 transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <ArwesFrame hover={true}>
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-arwes-primary group-hover:text-white transition-colors duration-300 flex items-center gap-2 h-7">
            <SquareTerminal size={18} className="transition-colors duration-300 group-hover:text-white text-arwes-primary shrink-0" />
            {link ? (
               <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-arwes-primary/50 underline-offset-4 flex items-center">
                 {displayedTitle}
                 <span className="animate-pulse ml-0.5 text-arwes-secondary font-bold">_</span>
               </a>
            ) : (
                <span className="flex items-center">
                    {displayedTitle}
                    <span className="animate-pulse ml-0.5 text-arwes-secondary font-bold">_</span>
                </span>
            )}
            </h3>
            {link ? (
               <a href={link} target="_blank" rel="noopener noreferrer">
                 <ArrowUpRight className="text-arwes-primary opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
               </a>
            ) : (
                <ArrowUpRight className="text-arwes-primary opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
            )}
        </div>
        
        <div className="text-xs font-mono text-arwes-secondary/70 mb-3 uppercase tracking-wider">
           {'// '}{type}
        </div>
        
        <p 
          className={`text-sm text-arwes-text/80 mb-4 leading-relaxed transition-all duration-1000 ease-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${(index * 150) + 400}ms` }}
        >
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2 border-t border-arwes-primary/10">
          {tech.map((t, index) => (
            <span key={index} className="text-xs font-mono text-arwes-primary/80 border border-arwes-primary/30 px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </ArwesFrame>
    </div>
  );
};

export default ProjectCard;