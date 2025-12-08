import type { AppConfig } from "@/types";

export const appConfig: AppConfig = {
  // Application basic information
  app: {
    name: 'WangshuXC',
    version: '0.1.0',
    description: 'A personal web',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3050',
    domain: 'wangshuxc.icu',
  },

  // SEO and metadata
  metadata: {
    title: {
      default: 'WangshuXC',
      template: '%s | WangshuXC',
    },
    description: 'A modern, full-stack SaaS application built with Next.js 15, featuring authentication, payments, file management, and internationalization.',
    keywords: ['SaaS', 'Next.js', 'React', 'TypeScript', 'Authentication', 'Payments'],
    authors: [{ name: 'WangshuXC' }],
    creator: 'WangshuXC',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3050',
      siteName: 'WangshuXC',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@better_saas',
    },
  },

  // Pagination configuration
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
}; 