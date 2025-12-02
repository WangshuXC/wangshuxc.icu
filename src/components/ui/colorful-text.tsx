"use client";
import React from "react";
import { motion } from "motion/react";

export function ColorfulText({ text }: { text: string }) {
  const colors = [
    "rgb(125, 211, 252)", // sky-300 - 浅天蓝
    "rgb(56, 189, 248)",  // sky-400 - 明亮天蓝
    "rgb(14, 165, 233)",  // sky-500 - 标准天蓝
  ];

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

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, 10, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block whitespace-pre tracking-tight mt-2"
    >
      {char}
    </motion.span>
  ));
}
