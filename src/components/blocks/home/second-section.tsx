"use client";

import { useRef, useState, useEffect } from "react";
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
}

// 倾斜图片数据 - 可在此处替换图片
const TILTED_IMAGES: TiltedImageConfig[] = [
  { src: "/introImages/7.jpg", alt: "Photo 1" },
  { src: "/introImages/5.jpg", alt: "Photo 2" },
  { src: "/images/qb.jpg", alt: "Photo qb" },
  { src: "/introImages/2.jpg", alt: "Photo 3" },
  { src: "/introImages/8.jpg", alt: "Photo 4" },
  { src: "/introImages/3.jpg", alt: "Photo 5" },
  { src: "/introImages/1.jpg", alt: "Photo 6" },
  { src: "/introImages/4.jpg", alt: "Photo 7" },
  { src: "/introImages/5.jpg", alt: "Photo 8" },
];

// 将图片均分为两行
const ROW1_IMAGES = TILTED_IMAGES.slice(0, 5);
const ROW2_IMAGES = TILTED_IMAGES.slice(3, 8);

// 响应式尺寸配置
function useResponsiveSizes() {
  const [sizes, setSizes] = useState({
    qbWidth: 280,
    stackImageWidth: 250,
    gap: 150,
    isMobile: false,
  });

  useEffect(() => {
    function updateSizes() {
      const width = window.innerWidth;
      const isMobile = width < 768;
      
      if (isMobile) {
        // 移动端：根据屏幕宽度动态计算
        const qbWidth = Math.min(width * 0.5, 180);
        setSizes({
          qbWidth,
          stackImageWidth: qbWidth * 0.85,
          gap: Math.min(width * 0.25, 100),
          isMobile: true,
        });
      } else {
        // 桌面端：使用原始尺寸
        setSizes({
          qbWidth: 280,
          stackImageWidth: 250,
          gap: 150,
          isMobile: false,
        });
      }
    }

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return sizes;
}

export function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { qbWidth, stackImageWidth, gap, isMobile } = useResponsiveSizes();
  
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
  
  // nankai 外层容器宽度变化 (初始宽度 -> qbWidth)
  // 初始宽度 = 高度 * NANKAI_ASPECT = (qbWidth / QB_ASPECT) * NANKAI_ASPECT
  const nankaiInitialWidth = (qbWidth / QB_ASPECT) * NANKAI_ASPECT;
  const nankaiWidth = useTransform(scrollYProgress, [0, 0.25], [nankaiInitialWidth, qbWidth]);
  const qbHeight = qbWidth / QB_ASPECT;
  
  // qb 图片透明度
  const qbOpacity = useTransform(scrollYProgress, [0.25, 0.3], [0, 1]);
  
  // qb 图片旋转 (0 -> 45度)
  const qbRotateX = useTransform(scrollYProgress, [0.25, 0.6], [0, 45]);
  const qbRotateZ = useTransform(scrollYProgress, [0.3, 0.7], [0, 45]);
  
  // qb 图片缩放和位置
  const qbScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.9]);
  const qbY = useTransform(scrollYProgress, [0.5, 1], [0, isMobile ? 80 : 150]);
  
  // 倾斜图片堆的透明度
  const stackOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  
  // slogan 透明度和位置
  const sloganOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const sloganY = useTransform(scrollYProgress, [0.6, 1], [150, 200]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full mb-[25vh]"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* nankai 横屏图片 - 外层容器宽度随滚动减小 */}
        <motion.div
          className="absolute flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: useTransform(nankaiWidth, (v) => `${v}px`),
            height: `${qbHeight}px`,
            opacity: nankaiOpacity,
            y: 0,
          }}
        >
          <div 
            className="relative rounded-2xl"
            style={{
              width: `${nankaiInitialWidth}px`,
              height: `${qbHeight}px`,
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
          className="absolute flex items-center justify-center z-30"
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
              width: `${qbWidth}px`,
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
          className="absolute flex flex-col items-center pointer-events-none"
          style={{
            y: qbY,
            opacity: stackOpacity,
          }}
        >
          {/* 第一行 - 中间图片(index=2)与qb重合 */}
          <div 
            className="flex items-center justify-center"
            style={{ 
              gap: `${gap}px`,
              transform: "translateY(50%)",
            }}
          >
            {ROW1_IMAGES.map((img, index) => (
              <div
                key={img.alt}
                className="rounded-2xl overflow-hidden shadow-2xl shrink-0"
                style={{
                  width: `${stackImageWidth}px`,
                  aspectRatio: QB_ASPECT,
                  opacity: index === 2 ? 0 : 1,
                  transform: "rotateX(45deg) rotateZ(45deg)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover relative!"
                />
              </div>
            ))}
          </div>
          {/* 第二行 */}
          <div 
            className="flex items-center justify-center"
            style={{ 
              gap: `${gap}px`,
              transform: "translateX(4%) translateY(12%)",
            }}
          >
            {ROW2_IMAGES.map((img) => (
              <div
                key={img.alt}
                className="rounded-2xl overflow-hidden shadow-2xl shrink-0"
                style={{
                  width: `${stackImageWidth}px`,
                  aspectRatio: QB_ASPECT,
                  transform: "rotateX(45deg) rotateZ(45deg)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover relative!"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Slogan */}
        <motion.div
          className="absolute top-0 left-0 right-0 text-center z-20 px-4"
          style={{
            opacity: sloganOpacity,
            y: sloganY,
          }}
        >
          <h2 className="text-5xl font-bold text-foreground mb-4">
            我在做什么
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-muted-foreground">
            <span className="text-sky-500 font-bold">灵犀</span>如小窗，佳景观历历
          </p>
        </motion.div>
      </div>
    </section>
  );
}
