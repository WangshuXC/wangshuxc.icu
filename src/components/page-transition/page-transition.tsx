'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePageTransition } from '@/store/page-transition-store';
import { Moon } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

interface PageTransitionProps {
  /** 最小显示时间(ms)，用于首次加载，避免闪烁 */
  minDisplayTime?: number;
}

// Loading 内容组件
function LoadingContent() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* 旋转月牙 */}
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Moon className="h-16 w-16 text-sky-400" strokeWidth={1.5} />
      </motion.div>

      {/* LOADING 文字 */}
      <motion.div
        className="flex items-center gap-1 font-medium text-lg tracking-widest text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {'LOADING'.split('').map((char, index) => (
          <motion.span
            key={index}
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export function PageTransition({ minDisplayTime = 1000 }: PageTransitionProps) {
  const { 
    isTransitioning, 
    phase, 
    transitionType,
    isInitialLoadComplete,
    startInitialLoad,
    completeInitialLoad,
  } = usePageTransition();
  
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  // 检查资源加载状态
  const checkResourcesLoaded = useCallback(() => {
    if (document.readyState === 'complete') {
      setResourcesLoaded(true);
      return;
    }

    const handleLoad = () => {
      setResourcesLoaded(true);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // 首次加载逻辑
  useEffect(() => {
    if (isInitialLoadComplete) return;

    // 启动首次加载过渡
    startInitialLoad();

    // 最小显示时间计时器
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDisplayTime);

    // 检查资源加载
    const cleanup = checkResourcesLoaded();

    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, [minDisplayTime, checkResourcesLoaded, isInitialLoadComplete, startInitialLoad]);

  // 当最小时间过去且资源加载完成时，完成首次加载
  useEffect(() => {
    if (minTimeElapsed && resourcesLoaded && transitionType === 'initial' && !isInitialLoadComplete) {
      completeInitialLoad();
    }
  }, [minTimeElapsed, resourcesLoaded, transitionType, isInitialLoadComplete, completeInitialLoad]);

  // 首次加载使用淡出动画，路由切换使用滑动动画
  const isInitial = transitionType === 'initial';

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* 第一层遮罩 - sky-300 颜色 */}
          <motion.div
            className="fixed inset-0 z-9998 bg-sky-300"
            initial={isInitial ? { opacity: 1 } : { x: '100%', borderRadius: 0 }}
            animate={isInitial 
              ? { opacity: phase === 'entering' ? 1 : 0 }
              : { 
                  x: phase === 'entering' ? '0%' : '120%',
                  borderRadius: phase === 'entering' ? 0 : '48px 48px 48px 48px',
                }
            }
            exit={isInitial 
              ? { opacity: 0 }
              : { x: '100%', borderRadius: '48px 48px 48px 48px' }
            }
            transition={isInitial
              ? { duration: 0.5, delay: phase === 'exiting' ? 0.3 : 0, ease: 'easeInOut' }
              : {
                  duration: phase === 'entering' ? 0.8 : 1.1,
                  delay: phase === 'entering' ? 0 : 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }
            }
          />

          {/* 第二层遮罩 - 主遮罩，带 loading 内容 */}
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
            initial={isInitial ? { opacity: 1 } : { x: '100%', borderRadius: 0 }}
            animate={isInitial
              ? { opacity: phase === 'entering' ? 1 : 0 }
              : { 
                  x: phase === 'entering' ? '0%' : '100%',
                  borderRadius: phase === 'entering' ? 0 : '48px 48px 48px 48px',
                }
            }
            exit={isInitial
              ? { opacity: 0 }
              : { x: '100%', borderRadius: '48px 48px 48px 48px' }
            }
            transition={isInitial
              ? { duration: 0.5, ease: 'easeInOut' }
              : {
                  duration: phase === 'entering' ? 0.8 : 0.8,
                  delay: phase === 'entering' ? 0.15 : 0,
                  ease: [0.76, 0, 0.24, 1],
                }
            }
          >
            <LoadingContent />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
