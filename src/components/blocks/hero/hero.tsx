import React from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

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

  // 使用i18n翻译或传入的props
  const finalHeading = heading || t('heading');
  const finalDescription = description || t('description');
  const finalButton = button || {
    text: t('buttonText'),
    url: t('buttonUrl'),
  };
  return (
    <section className="pt-24">
      <div className="container text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="font-extrabold text-3xl lg:text-6xl">{finalHeading}</h1>
          <p className="text-balance text-muted-foreground lg:text-lg">{finalDescription}</p>
        </div>
        <Button asChild size="lg" className="mt-10">
          <a href={finalButton.url}>{finalButton.text}</a>
        </Button>
      </div>
    </section>
  );
};

export { Hero };
