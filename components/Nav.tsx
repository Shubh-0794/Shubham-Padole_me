import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import AudioToggle from './AudioToggle';

const Nav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Updated section IDs to spy on. 
      // We include all sections in the spy list so tracking works even for sections not in the menu.
      const sections = ['home', 'projects', 'experience', 'skills', 'education', 'services', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted threshold for better detection
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="nav hidden lg:block mt-12" aria-label="In-page jump links">
      <ul className="w-max space-y-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <a 
                className={`group flex items-center py-2 transition-all duration-300 ${isActive ? 'text-arwes-primary' : 'text-arwes-text/50 hover:text-arwes-primary'}`} 
                href={`#${item.id}`}
              >
                <span className={`mr-4 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:translate-x-0'}`}>
                    <ChevronRight size={16} />
                </span>
                <span className={`text-sm font-mono tracking-widest ${isActive ? 'font-bold shadow-[0_0_10px_rgba(38,218,253,0.5)]' : ''}`}>
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 pt-6 border-t border-arwes-primary/20">
        <AudioToggle />
      </div>
    </nav>
  );
};

export default Nav;