import React from 'react';

interface ArwesFrameProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  bgColor?: string;
}

const ArwesFrame: React.FC<ArwesFrameProps> = ({ 
  children, 
  className = "", 
  hover = false,
  bgColor = "bg-arwes-bg"
}) => {
  return (
    <div className={`relative flex flex-col ${className} group`}>
      {/* 
        Outer Border Layer (Simulates Border)
        - Uses clip-path to cut corners
        - Background color acts as the border color
      */}
      <div 
        className={`absolute inset-0 clip-arwes transition-all duration-300 
          ${hover ? 'bg-arwes-primary/60 shadow-[0_0_15px_rgba(38,218,253,0.3)]' : 'bg-arwes-primary/30'}
        `}
      ></div>

      {/* 
        Inner Content Layer 
        - Uses flex-grow to fill height if parent is stretched
        - Uses margin to create the border thickness effect
      */}
      <div 
        className={`relative flex-grow ${bgColor} clip-arwes flex flex-col`} 
        style={{ 
          margin: '1px'
        }}
      >
        
        {/* Corner Accents - Visible on Uncut Corners (Top-Right, Bottom-Left) */}
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-arwes-primary transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-50'}`}></div>
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-arwes-primary transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-50'}`}></div>
        
        {/* Content Container */}
        <div className="p-6 relative z-10 flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ArwesFrame;