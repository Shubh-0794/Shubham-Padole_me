import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { soundEngine } from '../utils/audio';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
  playHover: (type?: 'subtle' | 'chirp' | 'nav' | 'action') => void;
  playClick: () => void;
  playChime: (powerUp?: boolean) => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMutedState] = useState<boolean>(() => soundEngine.getMuted());
  const lastHoveredElementRef = useRef<Element | null>(null);

  const toggleMute = useCallback(() => {
    const next = soundEngine.toggleMute();
    setIsMutedState(next);
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    soundEngine.setMuted(muted);
    setIsMutedState(muted);
  }, []);

  const playHover = useCallback((type: 'subtle' | 'chirp' | 'nav' | 'action' = 'subtle') => {
    soundEngine.playHover(type);
  }, []);

  const playClick = useCallback(() => {
    soundEngine.playClick();
  }, []);

  const playChime = useCallback((powerUp: boolean = true) => {
    soundEngine.playChime(powerUp);
  }, []);

  // Global hover & click audio feedback listener for all interactive buttons and links
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive element
      const interactiveEl = target.closest(
        'button, a, [role="button"], input[type="button"], input[type="submit"], input[type="reset"], summary, [data-sound="hover"]'
      );

      if (interactiveEl) {
        // Prevent duplicate trigger when moving between child nodes within the same interactive element
        if (lastHoveredElementRef.current === interactiveEl) {
          return;
        }
        lastHoveredElementRef.current = interactiveEl;

        // Determine sound type based on element
        const isNav = interactiveEl.closest('nav') || interactiveEl.classList.contains('nav-link');
        const isButton = interactiveEl.tagName === 'BUTTON' || interactiveEl.getAttribute('role') === 'button' || interactiveEl.classList.contains('group');

        if (isNav) {
          soundEngine.playHover('nav');
        } else if (isButton) {
          soundEngine.playHover('action');
        } else {
          soundEngine.playHover('subtle');
        }
      } else {
        lastHoveredElementRef.current = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, [role="button"], input[type="button"], input[type="submit"], [data-sound="click"]'
      );

      if (interactiveEl) {
        soundEngine.playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        setMuted,
        playHover,
        playClick,
        playChime,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
