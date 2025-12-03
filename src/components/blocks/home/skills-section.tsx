'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

interface ProgrammingLanguage {
  name: string;
  imagePath: string;
}

interface SkillsSectionProps {
  heading?: string;
  description?: string;
}

export function SkillsSection({ heading, description }: SkillsSectionProps) {
  const t = useTranslations('skills');

  const languages: ProgrammingLanguage[] = [
    {
      name: 'C++',
      imagePath: '/images/C++.png',
    },
    {
      name: 'Python',
      imagePath: '/images/Python.png',
    },
    {
      name: 'TypeScript',
      imagePath: '/images/TypeScript.png',
    },
    {
      name: 'React',
      imagePath: '/images/React.png',
    },
    {
      name: 'Vue',
      imagePath: '/images/Vue.png',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <MotionWrapper variant="fadeUp" className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              {heading || t('heading')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {description || t('description')}
            </p>
          </MotionWrapper>

          {/* Programming Languages Grid */}
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {languages.map((lang) => (
              <StaggerItem key={lang.name} variant="scale">
                <div className="group flex cursor-pointer flex-col items-center">
                  <div className="rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/20 group-hover:bg-background/80 group-hover:shadow-lg">
                    <div className="relative h-20 w-20 md:h-24 md:w-24">
                      <Image
                        src={lang.imagePath}
                        alt={lang.name}
                        fill
                        className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                      />
                    </div>
                  </div>
                  <span className="mt-3 font-medium text-foreground text-sm transition-colors duration-300 group-hover:text-muted-foreground">
                    {lang.name}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
