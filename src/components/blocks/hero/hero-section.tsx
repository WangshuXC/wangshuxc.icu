'use client';

import { useTranslations } from 'next-intl';
import { GifAsciiBackground } from './gif-ascii-background';

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
  const t = useTranslations('heroSection');

  return (
    <section className="relative h-screen container flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden">
      {/* ASCII 背景 */}
      {backgroundGif && (
        <GifAsciiBackground
          gifUrl={backgroundGif}
          width={80}
          height={60}
          fontSize={12}
          fps={15}
          className="absolute right-0 bottom-[140px] z-0 hidden sm:block"
          charset="@%#*+=-:. "
        />
      )}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Greeting */}
        <h1 className="mb-6 font-bold text-5xl text-foreground md:text-6xl lg:text-8xl">
          {greeting || t('greeting')}{' '}
          <span className="bg-linear-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
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
