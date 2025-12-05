"use client";

import { HeroSection } from "@/components/blocks/home/hero-section";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 延迟加载非关键组件
const SkillsSection = dynamic(
  () => import("@/components/blocks/home/skills-section").then((mod) => mod.SkillsSection),
  { ssr: true }
);

const TechStack = dynamic(
  () => import("@/components/blocks/home/tech-stack").then((mod) => mod.TechStack),
  { ssr: true }
);

// 延迟加载平滑滚动 - 非关键功能
const SmoothScrollProvider = dynamic(
  () => import("@/components/smooth-scroll-provider").then((mod) => mod.SmoothScrollProvider),
  { ssr: false }
);

const ScrollToTop = dynamic(
  () => import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop),
  { ssr: false }
);

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className='relative'>
        <ScrollToTop />

        <HeroSection backgroundGif='/images/alice-aris.gif' />

        <Suspense fallback={<div className="py-16" />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<div className="py-16" />}>
          <TechStack />
        </Suspense>
      </div>
    </SmoothScrollProvider>
  );
}
