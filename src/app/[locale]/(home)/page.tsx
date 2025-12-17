import { HeroSection } from "@/components/blocks/home/hero-section";
import { WorkIntroSection } from "@/components/blocks/home/work-intro-section";
import { SkillsSection } from "@/components/blocks/home/skills-section";
import { TechStack } from "@/components/blocks/home/tech-stack";
import { ProgrammingSection } from "@/components/blocks/home/programming-section";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function HomePage() {
  return (
    <div className='relative'>
      <ScrollToTop />

      <HeroSection />

      <WorkIntroSection />

      <ProgrammingSection />

      {/* <SkillsSection /> */}

      <TechStack />
    </div>
  );
}
