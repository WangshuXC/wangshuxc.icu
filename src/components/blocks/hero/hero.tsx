import React from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import Link from 'next/link';

interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const Hero = ({
  heading,
  description,
  button,
}: HeroProps) => {
  const t = useTranslations('hero');
  const images = [
    "/hero/hero-1-pexels-photo-691668.webp",
    "/hero/hero-2-pexels-photo-933054.webp",
    "/hero/hero-3-pexels-photo-417173.webp",
    "/hero/hero-4-pexels-photo-1287145.webp",
    "/hero/hero-5-pexels-photo-355747.webp",
    "/hero/hero-6-pexels-photo-355770.webp",
    "/hero/hero-7-pexels-photo-167699.webp",
    "/hero/hero-8-pexels-photo-2085998.webp",
    "/hero/hero-9-pexels-photo-1054218.webp",
    "/hero/hero-10-pexels-photo-994883.webp",
    "/hero/hero-11-pexels-photo-2835436.webp",
    "/hero/hero-12-pexels-photo-1054164.webp",
    "/hero/hero-13-pexels-photo-2299545.webp",
    "/hero/hero-14-pexels-photo-3417015.webp",
    "/hero/hero-16-pexels-photo-5818100.webp",
  ];


  // 使用i18n翻译或传入的props
  const finalHeading = heading || t('heading');
  const finalDescription = description || t('description');
  const finalButton = button || {
    text: t('buttonText'),
    url: t('buttonUrl'),
  };
  
  return (
    <section className="pt-10">
      <div className="relative mx-auto flex lg:h-[85vh] h-[400px] w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6 z-20 text-center text-white bg-black/50 p-10 rounded-3xl">
          <h1 className="font-extrabold text-3xl lg:text-6xl">{finalHeading}</h1>
          <p className="text-balance text-muted-foreground lg:text-lg">{finalDescription}</p>
        </div>

        <Button asChild size="lg" className="mt-10 z-20 bg-sky-600">
          <Link href={finalButton.url}>{finalButton.text}</Link>
        </Button>

        {/* overlay */}
        {/* <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" /> */}
        <ThreeDMarquee
          className="absolute inset-0 h-full w-full"
          images={[...images, ...images]}
        />
      </div>
    </section>
  );
};

export { Hero };
