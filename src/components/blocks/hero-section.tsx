'use client';

import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  greeting?: string;
  name?: string;
  role?: string;
  company?: string;
  location?: string;
}

export function HeroSection({
  greeting,
  name,
  role,
  company,
  location,
}: HeroSectionProps) {
  const t = useTranslations('heroSection');

  return (
    <section className="h-screen container flex flex-col items-center justify-center py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* Greeting */}
        <h1 className="mb-6 font-bold text-5xl text-foreground md:text-6xl lg:text-8xl">
          {greeting || t('greeting')}{' '}
          <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
            {name || t('name')}
          </span>{' '}
          👋
        </h1>

        {/* Job Title */}
        <p className="mb-8 text-muted-foreground text-xl md:text-2xl">
          {role || t('role')}{' '}
          <span className="font-semibold text-[#0053D9]">{company || t('company')}</span>
           {' '}{location || t('location')}
        </p>
      </div>
    </section>
  );
}
