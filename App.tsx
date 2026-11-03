
import React, { useState, useEffect, Suspense } from 'react';
import { resumeData } from './data/resume';
import ExperienceCard from './components/ExperienceCard';
import Nav from './components/Nav';
import SocialLinks from './components/SocialLinks';
import Section from './components/Section';
import ArwesFrame from './components/ArwesFrame';
import AudioToggle from './components/AudioToggle';
import { SoundProvider } from './context/SoundContext';
import { MousePointer2, Download, Cpu, Activity, Database, PenTool, Zap, Globe, Layout, Code, Send, Linkedin } from 'lucide-react';

// Lazy load ProjectCard component
const ProjectCard = React.lazy(() => import('./components/ProjectCard'));

const AppContent: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-arwes-bg text-arwes-text font-sans selection:bg-arwes-primary selection:text-arwes-bg">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-20 pointer-events-none z-0"></div>
      
      {/* Scanlines Overlay */}
      <div className="scanlines"></div>

      {/* Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-100 lg:absolute mix-blend-screen"
        style={{
          background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(38, 218, 253, 0.1), transparent 80%)`
        }}
      />

      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-12">
          
          {/* Header / Sidebar */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              {/* Profile Image with Sci-Fi Frame */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-8 group mx-auto md:mx-0">
                  <div className="absolute inset-0 border border-arwes-primary/30 clip-arwes translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                  <div className="absolute inset-0 border border-arwes-secondary/30 clip-arwes -translate-x-2 -translate-y-2 transition-transform duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3"></div>
                  <div className="relative h-full w-full clip-arwes overflow-hidden bg-arwes-dark border border-arwes-primary/50">
                      <img 
                          src={resumeData.personal.avatarUrl} 
                          alt={resumeData.personal.name} 
                          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(resumeData.personal.name)}&background=0a1f24&color=26dafd&size=200`;
                          }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-arwes-bg via-transparent to-transparent opacity-20"></div>
                  </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="inline-block px-2.5 py-1 border border-arwes-primary text-xs font-mono text-arwes-primary tracking-widest shadow-[0_0_10px_rgba(38,218,253,0.3)]">
                  STATUS: ONLINE
                </div>
                <AudioToggle />
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl glow-text mb-2">
                <span className="text-arwes-primary">&lt;</span>
                {resumeData.personal.name}
                <span className="text-arwes-primary">/&gt;</span>
              </h1>
              
              <h2 className="mt-3 text-xl font-medium tracking-wide text-arwes-secondary flex items-center gap-2">
                 <span className="animate-pulse w-2 h-2 bg-arwes-secondary rounded-full inline-block"></span>
                 {resumeData.personal.role}
              </h2>
              
              <p className="mt-8 max-w-xs leading-relaxed text-arwes-text/80 font-light border-l-2 border-arwes-primary/30 pl-4">
                Building pixel-perfect, accessible, and high-performance web experiences for the modern web.
              </p>
              
              <Nav />
            </div>
            <SocialLinks />
          </header>

          {/* Main Content */}
          <main className="pt-24 lg:w-[55%] lg:py-24">
            
            {/* Home / About Section */}
            <Section id="home">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                  <span className="text-arwes-primary mr-2">01.</span>Profile
                </h2>
                <div className="h-px bg-arwes-primary/30 flex-grow"></div>
              </div>
              
              <ArwesFrame bgColor="bg-arwes-dark/50 backdrop-blur-sm">
                <p className="mb-4">
                  I am an ambitious, hardworking professional targeting challenging and enriching assignments in the IT Industry.
                  With a strong background in <span className="font-bold text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]">Information Technology</span>, I have honed my skills in 
                  frontend development, specifically mastering <span className="font-bold text-arwes-secondary">React.js</span>.
                </p>
                <p>
                  Currently, I am a Frontend Developer at <span className="font-bold text-white">Tata Consultancy Services</span>, where I build 
                  dynamic interfaces for the BFSI domain.
                </p>
              </ArwesFrame>
            </Section>

            {/* Projects Section */}
            <Section id="projects">
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                  <span className="text-arwes-primary mr-2">02.</span>Projects
                </h2>
                <div className="h-px bg-arwes-primary/30 flex-grow"></div>
              </div>

              <div className="grid gap-4">
                <Suspense fallback={
                  <div className="w-full h-32 flex items-center justify-center border border-arwes-primary/20 bg-arwes-dark/30">
                     <span className="text-arwes-primary font-mono text-sm animate-pulse">LOADING PROJECTS DATA...</span>
                  </div>
                }>
                  {resumeData.projects.map((proj, idx) => (
                    <ProjectCard 
                      key={idx}
                      index={idx}
                      title={proj.title}
                      type={proj.type}
                      description={proj.description}
                      tech={proj.tech}
                      link={(proj as any).link}
                    />
                  ))}
                </Suspense>
              </div>
            </Section>

            {/* Portfolio / Experience Section */}
            <Section id="experience">
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                  <span className="text-arwes-primary mr-2">03.</span>Experience
                </h2>
                <div className="h-px bg-arwes-primary/30 flex-grow"></div>
              </div>
              
              {/* Timeline Container */}
              <div className="relative border-l border-arwes-primary/30 ml-3 md:ml-4 space-y-10 pb-4">
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-12">
                    {/* Timeline Dot/Node */}
                    <div className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-arwes-bg border border-arwes-primary shadow-[0_0_8px_rgba(38,218,253,0.8)] z-10"></div>
                    
                    {/* Connector Line (Horizontal) */}
                    <div className="absolute left-0 top-7 h-px w-6 md:w-10 bg-arwes-primary/30"></div>
                    
                    <ExperienceCard 
                      period={exp.period}
                      role={exp.role}
                      company={exp.company}
                      description={exp.description}
                      skills={exp.skills}
                      achievements={exp.achievements}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <a 
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-arwes-bg transition-all duration-200 focus:outline-none clip-arwes overflow-hidden"
                  href="/resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download CV"
                >
                  <div className="absolute inset-0 bg-arwes-primary group-hover:bg-white transition-colors"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Download CV
                    <Download className="transition-transform group-hover:translate-y-1" size={18} />
                  </span>
                </a>
              </div>
            </Section>
            
            {/* Skills Section */}
            <Section id="skills">
               <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                  <span className="text-arwes-primary mr-2">04.</span>Skills
                </h2>
                <div className="h-px bg-arwes-primary/30 flex-grow"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ArwesFrame className="h-full">
                  <div className="flex items-center gap-2 mb-4 text-arwes-secondary">
                    <Cpu size={20} />
                    <h3 className="font-bold uppercase tracking-wide">Frontend Core</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.frontend.map((skill, i) => (
                      <span key={i} className="text-xs border border-arwes-primary/40 px-2 py-1 text-arwes-primary">{skill}</span>
                    ))}
                  </div>
                </ArwesFrame>

                <ArwesFrame className="h-full">
                   <div className="flex items-center gap-2 mb-4 text-arwes-secondary">
                    <Database size={20} />
                    <h3 className="font-bold uppercase tracking-wide">Backend/DB</h3>
                  </div>
                   <div className="flex flex-wrap gap-2">
                    {resumeData.skills.backend.map((skill, i) => (
                      <span key={i} className="text-xs border border-arwes-text/40 px-2 py-1 text-arwes-text/80">{skill}</span>
                    ))}
                  </div>
                </ArwesFrame>
                
                 <ArwesFrame className="h-full">
                   <div className="flex items-center gap-2 mb-4 text-arwes-secondary">
                    <Activity size={20} />
                    <h3 className="font-bold uppercase tracking-wide">Tools</h3>
                  </div>
                   <div className="flex flex-wrap gap-2">
                    {resumeData.skills.tools.map((skill, i) => (
                      <span key={i} className="text-xs border border-arwes-text/40 px-2 py-1 text-arwes-text/80">{skill}</span>
                    ))}
                  </div>
                </ArwesFrame>

                 <ArwesFrame className="h-full">
                   <div className="flex items-center gap-2 mb-4 text-arwes-secondary">
                    <PenTool size={20} />
                    <h3 className="font-bold uppercase tracking-wide">Design</h3>
                  </div>
                   <div className="flex flex-wrap gap-2">
                    {resumeData.skills.design.map((skill, i) => (
                      <span key={i} className="text-xs border border-arwes-text/40 px-2 py-1 text-arwes-text/80">{skill}</span>
                    ))}
                  </div>
                </ArwesFrame>
              </div>
            </Section>

            {/* Education Section - Timeline Style */}
            <Section id="education">
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                  <span className="text-arwes-primary mr-2">05.</span>Education
                </h2>
                <div className="h-px bg-arwes-primary/30 flex-grow"></div>
              </div>

              {/* Timeline Container */}
              <div className="relative border-l border-arwes-primary/30 ml-3 md:ml-4 space-y-10 pb-4">
                {resumeData.education.map((edu, idx) => (
                   <div key={idx} className="relative pl-8 md:pl-12">
                     {/* Timeline Dot/Node */}
                     <div className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-arwes-bg border border-arwes-primary shadow-[0_0_8px_rgba(38,218,253,0.8)] z-10"></div>
                    
                     {/* Connector Line (Horizontal) */}
                     <div className="absolute left-0 top-7 h-px w-6 md:w-10 bg-arwes-primary/30"></div>
                     
                     <ArwesFrame hover={true} bgColor="bg-arwes-dark/30">
                       <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-bold text-lg">{edu.degree}</h3>
                            <div className="text-arwes-primary/70 text-sm mt-1">{edu.institution}</div>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <div className="text-xs font-mono text-arwes-secondary border border-arwes-secondary/30 px-2 py-1 inline-block mb-1 bg-arwes-primary/5">{edu.year}</div>
                            <div className="text-xs text-arwes-text/50">Score: {edu.score}</div>
                          </div>
                       </div>
                     </ArwesFrame>
                   </div>
                ))}
              </div>
            </Section>

            {/* Services Section */}
            <Section id="services">
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                  <span className="text-arwes-primary mr-2">06.</span>Services
                </h2>
                <div className="h-px bg-arwes-primary/30 flex-grow"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <ArwesFrame hover={true} bgColor="bg-arwes-dark/30">
                   <div className="flex items-start gap-4">
                      <div className="p-3 border border-arwes-primary/30 bg-arwes-primary/10">
                        <Globe className="text-arwes-primary h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Web Development</h3>
                        <p className="text-sm text-arwes-text/80">
                          Building responsive, performant, and accessible web applications using modern technologies like React, TypeScript, and Tailwind CSS.
                        </p>
                      </div>
                   </div>
                </ArwesFrame>
                
                <ArwesFrame hover={true} bgColor="bg-arwes-dark/30">
                   <div className="flex items-start gap-4">
                      <div className="p-3 border border-arwes-primary/30 bg-arwes-primary/10">
                        <Layout className="text-arwes-primary h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">UI/UX Implementation</h3>
                        <p className="text-sm text-arwes-text/80">
                          Translating complex design systems into pixel-perfect code, ensuring a seamless and engaging user experience across all devices.
                        </p>
                      </div>
                   </div>
                </ArwesFrame>

                <ArwesFrame hover={true} bgColor="bg-arwes-dark/30">
                   <div className="flex items-start gap-4">
                      <div className="p-3 border border-arwes-primary/30 bg-arwes-primary/10">
                         <Code className="text-arwes-primary h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Frontend Architecture</h3>
                        <p className="text-sm text-arwes-text/80">
                           Designing scalable and maintainable codebase structures, optimizing performance, and integrating with backend APIs efficiently.
                        </p>
                      </div>
                   </div>
                </ArwesFrame>
              </div>
            </Section>

             {/* Contact Section */}
            <Section id="contact">
              <div className="flex items-center gap-4 mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                  <span className="text-arwes-primary mr-2">07.</span>Contact
                </h2>
                <div className="h-px bg-arwes-primary/30 flex-grow"></div>
              </div>

              <ArwesFrame className="text-center py-12">
                 <h3 className="text-2xl font-bold text-white mb-4">Ready to Initiate Collaboration?</h3>
                 <p className="text-arwes-text/80 mb-8 max-w-md mx-auto">
                   Whether you have a question or just want to say hi, my inbox is always open. I'll try my best to get back to you!
                 </p>
                 
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <a 
                      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-arwes-bg transition-all duration-200 focus:outline-none clip-arwes overflow-hidden w-full sm:w-auto"
                      href={`mailto:${resumeData.personal.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="absolute inset-0 bg-arwes-primary group-hover:bg-white transition-colors"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        TRANSMIT MESSAGE
                        <Send className="transition-transform group-hover:translate-x-1" size={18} />
                      </span>
                    </a>

                    <a 
                      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-arwes-primary transition-all duration-300 border border-arwes-primary/50 hover:border-arwes-primary hover:bg-arwes-primary/10 hover:shadow-[0_0_20px_rgba(38,218,253,0.3)] clip-arwes focus:outline-none w-full sm:w-auto"
                      href={resumeData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        CONNECT ON LINKEDIN
                        <Linkedin className="transition-transform group-hover:translate-x-1" size={18} />
                      </span>
                    </a>
                 </div>
              </ArwesFrame>
            </Section>

             <footer className="max-w-md pb-16 text-sm text-arwes-text/40 sm:pb-0 font-mono mt-24 border-t border-arwes-primary/20 pt-8">
                <p>
                  
                  Designed By <span className="text-arwes-primary">Shubham Padole</span>.
                </p>
             </footer>

          </main>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  );
};

export default App;
