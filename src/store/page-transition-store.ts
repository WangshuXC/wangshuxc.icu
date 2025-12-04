import { create } from 'zustand';

type TransitionPhase = 'idle' | 'entering' | 'exiting';

interface PageTransitionState {
  isTransitioning: boolean;
  phase: TransitionPhase;
  targetUrl: string | null;
  
  startTransition: (url: string) => void;
  completeEnter: () => void;
  completeTransition: () => void;
}

export const usePageTransition = create<PageTransitionState>((set) => ({
  isTransitioning: false,
  phase: 'idle',
  targetUrl: null,

  startTransition: (url: string) => {
    set({
      isTransitioning: true,
      phase: 'entering',
      targetUrl: url,
    });
  },

  completeEnter: () => {
    set({
      phase: 'exiting',
    });
  },

  completeTransition: () => {
    set({
      isTransitioning: false,
      phase: 'idle',
      targetUrl: null,
    });
  },
}));
