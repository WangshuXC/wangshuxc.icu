"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";

// 延迟加载 GIF ASCII 背景 - 这是最耗性能的组件
const GifAsciiBackground = dynamic(
  () => import("./gif-ascii-background").then((mod) => mod.GifAsciiBackground),
  { ssr: false }
);

// 延迟加载动画组件
const ColorfulText = dynamic(
  () => import("@/components/ui/colorful-text").then((mod) => mod.ColorfulText),
  { ssr: false }
);

const MotionWrapper = dynamic(
  () => import("@/components/motion-wrapper").then((mod) => mod.MotionWrapper),
  { ssr: false }
);

interface HeroSectionProps {
  greeting?: string;
  name?: string;
  role?: string;
  company?: string;
  location?: string;
  backgroundGif?: string;
}

export function HeroSection({
  greeting,
  name,
  role,
  company,
  location,
  backgroundGif,
}: HeroSectionProps) {
  const t = useTranslations("heroSection");
  const [showBackground, setShowBackground] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // 延迟加载背景，优先渲染文字内容
  useEffect(() => {
    setIsHydrated(true);
    // 使用 requestIdleCallback 在浏览器空闲时加载背景
    const loadBackground = () => {
      setShowBackground(true);
    };
    
    if ('requestIdleCallback' in window) {
      (window as Window).requestIdleCallback(loadBackground, { timeout: 2000 });
    } else {
      setTimeout(loadBackground, 1000);
    }
  }, []);

  const displayName = name || t("name");
  const displayGreeting = greeting || t("greeting");
  const displayRole = role || t("role");
  const displayCompany = company || t("company");
  const displayLocation = location || t("location");

  return (
    <section className='relative h-screen container flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden'>
      {/* ASCII 背景 - 延迟加载 */}
      {backgroundGif && showBackground && (
        <Suspense fallback={null}>
          <GifAsciiBackground
            gifUrl={backgroundGif}
            width={80}
            height={60}
            fontSize={12}
            fps={15}
            className='absolute right-0 bottom-[140px] z-0 hidden sm:block text-muted-foreground/30'
            charset='@%#*+=-:. '
          />
        </Suspense>
      )}

      <div className='relative z-10 mx-auto max-w-4xl text-center'>
        {/* Greeting - 优先渲染静态内容 */}
        {isHydrated ? (
          <Suspense fallback={
            <h1 className='mb-6 font-bold text-5xl text-foreground md:text-6xl lg:text-8xl'>
              {displayGreeting} <br />
              <span className='text-sky-400'>{displayName}</span> 👋
            </h1>
          }>
            <MotionWrapper variant='fadeUp' delay={0.1} duration={0.8}>
              <h1 className='mb-6 font-bold text-5xl text-foreground md:text-6xl lg:text-8xl'>
                {displayGreeting} <br />
                <ColorfulText text={displayName} /> 👋
              </h1>
            </MotionWrapper>
          </Suspense>
        ) : (
          <h1 className='mb-6 font-bold text-5xl text-foreground md:text-6xl lg:text-8xl'>
            {displayGreeting} <br />
            <span className='text-sky-400'>{displayName}</span> 👋
          </h1>
        )}

        {/* Job Title */}
        {isHydrated ? (
          <Suspense fallback={
            <p className='mb-8 text-muted-foreground text-xl md:text-2xl'>
              {displayRole}{" "}
              <span className='font-semibold text-[#0053D9]'>{displayCompany}</span>{" "}
              {displayLocation}
            </p>
          }>
            <MotionWrapper variant='fadeUp' delay={0.3} duration={0.8}>
              <p className='mb-8 text-muted-foreground text-xl md:text-2xl'>
                {displayRole}{" "}
                <span className='font-semibold text-[#0053D9]'>{displayCompany}</span>{" "}
                {displayLocation}
              </p>
            </MotionWrapper>
          </Suspense>
        ) : (
          <p className='mb-8 text-muted-foreground text-xl md:text-2xl'>
            {displayRole}{" "}
            <span className='font-semibold text-[#0053D9]'>{displayCompany}</span>{" "}
            {displayLocation}
          </p>
        )}
      </div>
    </section>
  );
}
