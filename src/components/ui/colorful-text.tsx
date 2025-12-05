"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";

const colors = [
  "rgb(125, 211, 252)", // sky-300 - 浅天蓝
  "rgb(56, 189, 248)",  // sky-400 - 明亮天蓝
  "rgb(14, 165, 233)",  // sky-500 - 标准天蓝
];

export function ColorfulText({ text }: { text: string }) {
  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 缓存字符数组，避免重复计算
  const chars = useMemo(() => text.split(""), [text]);

  return chars.map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{ y: 0, color: currentColors[index % currentColors.length] }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, 5, 0], // 减少位移幅度
      }}
      transition={{
        duration: 0.4, // 缩短动画时间
        delay: index * 0.03, // 减少延迟
        ease: "easeOut",
      }}
      className="inline-block whitespace-pre tracking-tight mt-2"
    >
      {char}
    </motion.span>
  ));
}
