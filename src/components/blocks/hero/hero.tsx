import React from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

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
    "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg",
    "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg",
    "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg",
    "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg",
    "https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg",
    "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg",
    "https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg",
    "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
    "https://images.pexels.com/photos/994883/pexels-photo-994883.jpeg",
    "https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg",
    "https://images.pexels.com/photos/1054164/pexels-photo-1054164.jpeg",
    "https://images.pexels.com/photos/2299545/pexels-photo-2299545.jpeg",
    "https://images.pexels.com/photos/3417015/pexels-photo-3417015.jpeg",
    "https://images.pexels.com/photos/16394365/pexels-photo-16394365.jpeg",
    "https://images.pexels.com/photos/5818100/pexels-photo-5818100.jpeg",
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
      <div className="relative mx-auto flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-6 z-20 text-balance text-white">
          <h1 className="font-extrabold text-3xl lg:text-6xl">{finalHeading}</h1>
          <p className="text-balance text-muted-foreground lg:text-lg">{finalDescription}</p>
        </div>
 
      <Button asChild size="lg" className="mt-10 z-20 bg-sky-600">
          <a href={finalButton.url}>{finalButton.text}</a>
        </Button>
 
      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={[...images, ...images.reverse(), ...images]}
      />
    </div>
    </section>
  );
};

export { Hero };
