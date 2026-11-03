import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../context/SoundContext';

interface AudioToggleProps {
  className?: string;
  compact?: boolean;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ className = '', compact = false }) => {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      type="button"
      onClick={toggleMute}
      className={`group relative inline-flex items-center gap-2.5 px-3 py-1.5 font-mono text-xs transition-all duration-300 border focus:outline-none select-none ${
        isMuted
          ? 'border-arwes-primary/30 text-arwes-text/50 hover:border-arwes-primary/60 hover:text-arwes-text/80 bg-arwes-dark/40'
          : 'border-arwes-primary text-arwes-primary bg-arwes-dark/80 shadow-[0_0_12px_rgba(38,218,253,0.25)] hover:shadow-[0_0_18px_rgba(38,218,253,0.45)]'
      } ${className}`}
      aria-label={isMuted ? 'Unmute sci-fi audio effects' : 'Mute sci-fi audio effects'}
      aria-pressed={!isMuted}
      title={isMuted ? 'Enable sci-fi audio feedback' : 'Mute sci-fi audio feedback'}
    >
      {/* Corner cut accent / subtle sci-fi border markings */}
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-arwes-primary opacity-60"></span>
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-arwes-primary opacity-60"></span>

      {/* Audio Icon */}
      <span className="relative flex items-center justify-center">
        {isMuted ? (
          <VolumeX size={14} className="text-arwes-text/40 group-hover:text-arwes-text/70 transition-colors" />
        ) : (
          <Volume2 size={14} className="text-arwes-primary animate-pulse" />
        )}
      </span>

      {/* Dynamic Sound Wave visualizer bars (active when unmuted) */}
      {!compact && (
        <div className="flex items-center gap-0.5 h-3">
          <span
            className={`w-0.5 rounded-full transition-all duration-200 ${
              isMuted
                ? 'h-1 bg-arwes-text/20'
                : 'h-2.5 bg-arwes-primary group-hover:h-3 animate-[pulse_1s_ease-in-out_infinite]'
            }`}
          ></span>
          <span
            className={`w-0.5 rounded-full transition-all duration-200 ${
              isMuted
                ? 'h-1 bg-arwes-text/20'
                : 'h-1.5 bg-arwes-secondary group-hover:h-2 animate-[pulse_1.2s_ease-in-out_infinite_0.2s]'
            }`}
          ></span>
          <span
            className={`w-0.5 rounded-full transition-all duration-200 ${
              isMuted
                ? 'h-1 bg-arwes-text/20'
                : 'h-3 bg-arwes-primary group-hover:h-3.5 animate-[pulse_0.8s_ease-in-out_infinite_0.4s]'
            }`}
          ></span>
        </div>
      )}

      {/* Label Text */}
      <span className="tracking-widest uppercase font-semibold">
        {compact ? (
          isMuted ? 'MUTE' : 'AUDIO'
        ) : (
          <span>
            AUDIO FX: <span className={isMuted ? 'text-arwes-text/40' : 'text-arwes-secondary font-bold'}>{isMuted ? 'OFF' : 'ON'}</span>
          </span>
        )}
      </span>

      {/* Status LED Dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
          isMuted
            ? 'bg-arwes-text/30'
            : 'bg-arwes-secondary shadow-[0_0_6px_#00f8f8] animate-ping'
        }`}
      />
    </button>
  );
};

export default AudioToggle;
