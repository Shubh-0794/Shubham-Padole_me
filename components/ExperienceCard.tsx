import React from 'react';
import ArwesFrame from './ArwesFrame';

interface ExperienceProps {
  period: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  achievements?: string[];
}

const ExperienceCard: React.FC<ExperienceProps> = ({ period, role, company, description, skills, achievements }) => {
  return (
    <ArwesFrame hover={true} bgColor="bg-arwes-dark/30">
      <header className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-arwes-primary/20 pb-2">
        <h3 className="font-bold text-lg text-arwes-primary tracking-wide">
            {role} <span className="text-arwes-text/60">@</span> {company}
        </h3>
        <span className="text-xs font-mono text-arwes-secondary/80 mt-1 sm:mt-0 px-2 py-1 bg-arwes-primary/10 rounded-sm border border-arwes-primary/30 whitespace-nowrap">
          {period}
        </span>
      </header>
      
      <p className="mb-4 text-sm leading-relaxed text-arwes-text/90 font-light">
        {description}
      </p>
      
      {achievements && achievements.length > 0 && (
        <ul className="mb-4 space-y-2">
            {achievements.map((item, index) => (
            <li key={index} className="flex items-start text-sm text-arwes-text/80">
              <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 bg-arwes-primary shadow-[0_0_5px_#26dafd]"></span>
              {item}
            </li>
          ))}
        </ul>
      )}
      
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <span key={index} className="px-2 py-1 text-xs font-mono text-arwes-bg bg-arwes-primary font-bold opacity-80 hover:opacity-100 transition-opacity cursor-default">
            {skill}
          </span>
        ))}
      </div>
    </ArwesFrame>
  );
};

export default ExperienceCard;