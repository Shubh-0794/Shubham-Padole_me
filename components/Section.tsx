import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className = "", children }) => {
  return (
    <section id={id} className={`mb-24 scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
};

export default Section;