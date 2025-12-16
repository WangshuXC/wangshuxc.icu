"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

// nankai.png 是 16:9 横屏，qb.jpg 是竖屏（假设约 9:16）
const NANKAI_ASPECT = 16 / 9;
const QB_ASPECT = 9 / 16;

// 倾斜图片配置接口
interface TiltedImageConfig {
  /** 图片路径 */
  src: string;
  /** 图片描述 */
  alt: string;
  /** X轴偏移量 */
  x: number;
  /** Y轴偏移量 */
  y: number;
}

// 倾斜图片数据 - 可在此处替换图片
const TILTED_IMAGES: TiltedImageConfig[] = [
  { src: "/introImages/7.jpg", alt: "Photo 1", x: -950, y: 150 },
  { src: "/introImages/5.jpg", alt: "Photo 2", x: -465, y: 150 },
  { src: "/introImages/2.jpg", alt: "Photo 4", x: 510, y: 150 },
  { src: "/introImages/8.jpg", alt: "Photo 5", x: 1000, y: 150 },
  { src: "/introImages/3.jpg", alt: "Photo 6", x: -860, y: 560 },
  { src: "/introImages/1.jpg", alt: "Photo 7", x: -390, y: 570 },
  { src: "/introImages/4.jpg", alt: "Photo 8", x: 110, y: 560 },
  { src: "/introImages/5.jpg", alt: "Photo 9", x: 600, y: 560 },
  { src: "/introImages/1.jpg", alt: "Photo 10", x: 1000, y: 650 },
];

export function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 阶段1: 0-0.3 nankai图片宽度从100%缩小到匹配qb比例
  // 阶段2: 0.3-0.5 qb图片逐渐显现
  // 阶段3: 0.5-0.7 qb图片向下旋转
  // 阶段4: 0.7-1.0 落入倾斜图片堆，显示slogan
  
  // nankai 透明度
  const nankaiOpacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);
  
  // nankai 外层容器宽度变化 (初始宽度 -> 280px)
  // 初始宽度 = 高度 * NANKAI_ASPECT = (280 / QB_ASPECT) * NANKAI_ASPECT
  const nankaiInitialWidth = (280 / QB_ASPECT) * NANKAI_ASPECT;
  const nankaiWidth = useTransform(scrollYProgress, [0, 0.25], [nankaiInitialWidth, 280]);
  
  // qb 图片透明度
  const qbOpacity = useTransform(scrollYProgress, [0.25, 0.3], [0, 1]);
  
  // qb 图片旋转 (0 -> 45度)
  const qbRotateX = useTransform(scrollYProgress, [0.25, 0.6], [0, 15]);
  const qbRotateZ = useTransform(scrollYProgress, [0.3, 0.7], [0, 45]);
  
  // qb 图片缩放和位置
  const qbScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.9]);
  const qbY = useTransform(scrollYProgress, [0.5, 1], [0, 150]);
  
  // 倾斜图片堆的透明度和缩放
  const stackOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const stackScale = useTransform(scrollYProgress, [0.6, 1], [0.8, 0.9]);
  
  // slogan 透明度和位置
  const sloganOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const sloganY = useTransform(scrollYProgress, [0.6, 1], [150, 200]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full mb-[25vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
        
        {/* nankai 横屏图片 - 外层容器宽度随滚动减小 */}
        <motion.div
          className="absolute flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: useTransform(nankaiWidth, (v) => `${v}px`),
            height: `${280 / QB_ASPECT}px`, // 与qb图片高度相同
            opacity: nankaiOpacity,
            y: 0, // 与qb图片初始y相同
          }}
        >
          <div 
            className="relative rounded-2xl"
            style={{
              width: `${nankaiInitialWidth}px`,
              height: `${280 / QB_ASPECT}px`,
            }}
          >
            <Image
              src="/images/nankai.png"
              alt="Nankai"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* qb 竖屏图片 */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{
            opacity: qbOpacity,
            rotateX: qbRotateX,
            rotateZ: qbRotateZ,
            scale: qbScale,
            y: qbY,
            perspective: 1000,
          }}
        >
          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: "280px",
              aspectRatio: QB_ASPECT,
            }}
          >
            <Image
              src="/images/qb.jpg"
              alt="QB"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* 倾斜图片堆 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: stackOpacity,
            scale: stackScale,
            perspective: 1000,
            rotateX: 15,
          }}
        >
          {TILTED_IMAGES.map((img, index) => (
            <motion.div
              key={img.alt}
              className="absolute rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: "280px",
                aspectRatio: QB_ASPECT,
                x: img.x,
                y: img.y,
                rotate: 45,
                zIndex: index,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Slogan */}
        <motion.div
          className="absolute top-0 left-0 right-0 text-center z-20"
          style={{
            opacity: sloganOpacity,
            y: sloganY,
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            我在做什么
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            <span className="text-sky-500 font-bold">灵犀</span>如小窗，佳景观历历
          </p>
        </motion.div>
      </div>
    </section>
  );
}
