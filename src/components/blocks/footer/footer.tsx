import {
  Github as IconBrandGithub,
} from '@/lib/icons';
import Link from 'next/link';
import type React from 'react';


interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

export const Footer = ({
  logo = {
    url: '/',
    src: '/icons/favicon-32x32.png',
    alt: 'logo',
    title: 'wangshuxc.icu',
  },
  description = 'Reading and thinking, truth and freedom.',
  copyright = '© 2025 WangshuXC. All rights reserved.',
}: FooterProps) => {
  return (
    <section className="pt-32">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img src={logo.src} alt={logo.alt} title={logo.title} className="h-8" />
              </a>
              <h2 className="font-semibold text-xl">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-4 border-t py-8 font-medium text-muted-foreground text-xs md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <Link href="https://github.com/WangshuXC/wangshuxc.icu" target="__blank" passHref className='flex justify-between items-center gap-4 order-1 lg:order-2'>
            <IconBrandGithub strokeWidth={1} className="size-5" />
            <p>Power by Next.js</p>
          </Link>
        </div>
      </div>
    </section>
  );
};
