'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon } from 'lucide-react';

interface PageLoaderProps {
  children: React.ReactNode;
  /** 最小显示时间(ms)，避免闪烁 */
  minDisplayTime?: number;
}

export function PageLoader({ children, minDisplayTime = 800 }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  // 检查资源加载状态
  const checkResourcesLoaded = useCallback(() => {
    // 检查 document.readyState
    if (document.readyState === 'complete') {
      setResourcesLoaded(true);
      return;
    }

    // 监听 load 事件
    const handleLoad = () => {
      setResourcesLoaded(true);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
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
  }, [minDisplayTime, checkResourcesLoaded]);

  // 当最小时间过去且资源加载完成时，隐藏 loading
  useEffect(() => {
    if (minTimeElapsed && resourcesLoaded) {
      setIsLoading(false);
    }
  }, [minTimeElapsed, resourcesLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: 'easeInOut' }
            }}
          >
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
              <div className="flex items-center gap-1 font-medium text-lg tracking-widest text-foreground">
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页面内容 - 预渲染但隐藏 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
