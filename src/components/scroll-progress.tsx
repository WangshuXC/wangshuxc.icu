'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const height = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 w-1.5 bg-sky-300 rounded-b-full"
      style={{ height }}
    />
  );
}
