import { HeroSection } from '@/components/blocks/home/hero-section';
import { SkillsSection } from '@/components/blocks/home/skills-section';
import { TechStack } from '@/components/blocks/home/tech-stack';
import { ScrollToTop } from '@/components/scroll-to-top';
import React from 'react';

export default function HomePage() {
  return (
    <div className="relative">
      <ScrollToTop />

      <HeroSection backgroundGif='/images/alice-aris.gif' />

      <SkillsSection />

      <TechStack />
    </div>
  );
}
