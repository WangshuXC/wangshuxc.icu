'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePageTransition } from '@/store/page-transition-store';
import { Moon } from 'lucide-react';

export function PageTransition() {
  const { isTransitioning, phase } = usePageTransition();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* 第一层遮罩 - sky-300 颜色，先出现 */}
          <motion.div
            className="fixed inset-0 z-9998 bg-sky-300"
            initial={{ x: '100%', borderRadius: 0 }}
            animate={{ 
              x: phase === 'entering' ? '0%' : '120%',
              borderRadius: phase === 'entering' ? 0 : '48px 48px 48px 48px',
            }}
            exit={{ x: '100%', borderRadius: '48px 48px 48px 48px' }}
            transition={{
              duration: phase === 'entering' ? 0.8 : 1.1,
              delay: phase === 'entering' ? 0 : 0.1,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* 第二层遮罩 - 主遮罩，带 loading 内容，延迟出现 */}
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
            initial={{ x: '100%', borderRadius: 0 }}
            animate={{ 
              x: phase === 'entering' ? '0%' : '100%',
              borderRadius: phase === 'entering' ? 0 : '48px 48px 48px 48px',
            }}
            exit={{ x: '100%', borderRadius: '48px 48px 48px 48px' }}
            transition={{
              duration: phase === 'entering' ? 0.8 : 0.8,
              delay: phase === 'entering' ? 0.15 : 0,
              ease: [0.76, 0, 0.24, 1],
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
                <Moon className="h-16 w-16 text-yellow-500" strokeWidth={1.5} />
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
