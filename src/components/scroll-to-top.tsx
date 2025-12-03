'use client';

import { useEffect } from 'react';

export function ScrollToTop() {
  useEffect(() => {
    // 强制滚动到顶部
    window.scrollTo(0, 0);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    return () => {
      // 离开页面时恢复默认行为
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}
