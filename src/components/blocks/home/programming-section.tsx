"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ProgrammingIcons } from "./Icon";

export const ProgrammingSection = () => {
  const t = useTranslations("programmingSection");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const iconRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    setMounted(true);
  }, []);

  // 预计算图标数据
  const icons = useMemo(() => {
    const orbits = [
      { radius: 45, speed: 0.0001, tilt: 0.35, baseZIndex: 100 }, // 内圈：最高层级基准
      { radius: 55, speed: 0.0002, tilt: 0.35, baseZIndex: 200 }, // 中圈
      { radius: 65, speed: 0.0003, tilt: 0.35, baseZIndex: 300 }, // 外圈：最低层级基准
    ];

    return ProgrammingIcons.map((item, index) => {
      const orbitIndex = index % 3;
      const orbit = orbits[orbitIndex]!;

      const iconsInOrbit =
        Math.floor(ProgrammingIcons.length / 3) +
        (index < ProgrammingIcons.length % 3 ? 1 : 0);
      const indexInOrbit = Math.floor(index / 3);
      const angleStep = (2 * Math.PI) / iconsInOrbit;
      const initialAngle =
        indexInOrbit * angleStep + (orbitIndex * Math.PI) / 3;

      const pseudoRandom = ((index * 137) % 100) / 100;

      return {
        id: item.id,
        Icon: item.Icon,
        radius: orbit.radius,
        initialAngle,
        speed: orbit.speed * (0.9 + pseudoRandom * 0.2),
        size: 50 + pseudoRandom * 20,
        tilt: orbit.tilt,
        baseZIndex: orbit.baseZIndex,
      };
    });
  }, []);

  // 使用单一 requestAnimationFrame 循环更新所有图标
  // 直接操作 DOM style，避免 React 重渲染
  useEffect(() => {
    if (!mounted) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // 批量更新所有图标位置
      icons.forEach((icon) => {
        const el = iconRefs.current.get(icon.id);
        if (!el) return;

        const angle = icon.initialAngle + elapsed * icon.speed;
        const x = Math.cos(angle) * icon.radius;
        const y = Math.sin(angle) * icon.radius * icon.tilt;
        const zFactor = Math.sin(angle);
        const scale = 1 + zFactor * 0.2;
        const opacity = 0.5 + (zFactor + 1) * 0.25;

        // zIndex 计算：轨道基准值 + 纵深偏移 (0-50)
        // 这样同一轨道内的图标根据前后位置排序，不同轨道之间不会互相干扰
        const zIndex = icon.baseZIndex + Math.floor((zFactor + 1) * 25);

        // 使用 transform 和 will-change 优化 GPU 加速
        el.style.transform = `translate3d(calc(${x}vmin - 50%), calc(${y}vmin - 50%), 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted, icons]);

  // 注册图标 DOM 引用
  const setIconRef = (id: number, el: HTMLDivElement | null) => {
    if (el) {
      iconRefs.current.set(id, el);
    } else {
      iconRefs.current.delete(id);
    }
  };

  return (
    <section
      ref={containerRef}
      className='relative h-screen overflow-visible bg-linear-to-b from-background via-background/95 to-background flex items-center justify-center'
    >
      {/* 背景装饰：网格图案 */}
      <div className='absolute inset-0 bg-grid-pattern opacity-5' />
      {/* 背景装饰：径向渐变 */}
      <div className='absolute inset-0 bg-radial-gradient from-background/0 via-background/50 to-background pointer-events-none' />

      {/* 轨道视觉辅助线 */}
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none opacity-5'>
        <div className='rounded-full border border-foreground/50 w-[70vmin] h-[24.5vmin] absolute' />
        <div className='rounded-full border border-foreground/30 w-[100vmin] h-[35vmin] absolute' />
        <div className='rounded-full border border-foreground/20 w-[130vmin] h-[45.5vmin] absolute' />
      </div>

      {/* 渲染图标容器 */}
      {mounted &&
        icons.map((icon) => (
          <div
            key={icon.id}
            ref={(el) => setIconRef(icon.id, el)}
            className='absolute top-1/2 left-1/2 flex items-center justify-center will-change-transform'
            style={{
              width: icon.size,
              height: icon.size,
            }}
          >
            <div className='p-2 w-full h-full'>
              <icon.Icon className='w-full h-full text-foreground/80' />
            </div>
          </div>
        ))}

      {/* 中心 Slogan 区域 */}
      <div className='z-50 relative text-center px-4 max-w-4xl'>
        <h2 className='mb-6 bg-linear-to-r from-foreground via-foreground/80 to-foreground bg-clip-text font-bold text-4xl text-transparent md:text-5xl lg:text-7xl tracking-tight'>
          {t("heading")}
        </h2>
        <p className='text-base sm:text-lg md:text-2xl text-muted-foreground'>
          {t("description")}
        </p>
      </div>
    </section>
  );
};
