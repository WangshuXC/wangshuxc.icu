import { HeroSection } from '@/components/blocks/hero/hero-section';
import { SkillsSection } from '@/components/blocks/skills-section';
import { TechStack } from '@/components/blocks/tech-stack';
import { WorkspaceSection } from '@/components/blocks/workspace-section';
import React from 'react';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section - Introduction */}
      <HeroSection backgroundGif='/images/alice-aris.gif' />

      {/* Skills Section - Programming, Markup, Editors */}
      <SkillsSection />

      {/* Tech Stack Section - Project Technologies */}
      <TechStack />

      {/* Workspace Section - Hardware Specs */}
      {/* <WorkspaceSection /> */}
    </div>
  );
}
