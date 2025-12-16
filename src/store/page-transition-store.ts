import { create } from 'zustand';

type TransitionPhase = 'idle' | 'entering' | 'exiting';
type TransitionType = 'initial' | 'navigation';

interface PageTransitionState {
  isTransitioning: boolean;
  phase: TransitionPhase;
  targetUrl: string | null;
  transitionType: TransitionType;
  isInitialLoadComplete: boolean;
  
  // 首次加载
  startInitialLoad: () => void;
  completeInitialLoad: () => void;
  
  // 路由切换
  startTransition: (url: string) => void;
  completeEnter: () => void;
  completeTransition: () => void;
}

export const usePageTransition = create<PageTransitionState>((set) => ({
  isTransitioning: false,
  phase: 'idle',
  targetUrl: null,
  transitionType: 'navigation',
  isInitialLoadComplete: false,

  startInitialLoad: () => {
    set({
      isTransitioning: true,
      phase: 'entering',
      transitionType: 'initial',
    });
  },

  completeInitialLoad: () => {
    set({
      phase: 'exiting',
    });
    // 延迟完成过渡
    setTimeout(() => {
      set({
        isTransitioning: false,
        phase: 'idle',
        isInitialLoadComplete: true,
      });
    }, 900);
  },

  startTransition: (url: string) => {
    set({
      isTransitioning: true,
      phase: 'entering',
      targetUrl: url,
      transitionType: 'navigation',
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
