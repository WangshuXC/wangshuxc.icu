import { useParams, useRouter } from 'next/navigation';
import { useNavbarConfig } from '@/hooks/use-config';
import { Book, Sunset, Trees, Zap } from 'lucide-react';
import { createElement } from 'react';
import { useTranslations } from 'next-intl';
import type { UseNavbarReturn, LogoConfig, MenuItem } from '@/types/navbar';
import type { NavbarMenuItem } from '@/types';
import type { JSX } from 'react';

// Icon mapping function
const getIconComponent = (iconName?: string): JSX.Element | undefined => {
  if (!iconName) return undefined;

  const iconProps = { className: "size-5 shrink-0" };

  switch (iconName) {
    case 'Book':
      return createElement(Book, iconProps);
    case 'Sunset':
      return createElement(Sunset, iconProps);
    case 'Trees':
      return createElement(Trees, iconProps);
    case 'Zap':
      return createElement(Zap, iconProps);
    default:
      return undefined;
  }
};

// Translation helper function
const translateMenuItem = (item: NavbarMenuItem, t: (key: string) => string, locale: string): MenuItem => {
  return {
    title: t(item.title),
    url: item.url.startsWith('#') ? item.url : `/${locale}${item.url}`,
    description: item.description ? t(item.description) : undefined,
    icon: getIconComponent(item.icon),
    items: item.items?.map(subItem => translateMenuItem(subItem, t, locale)),
  };
};



export function useNavbar(): UseNavbarReturn {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = useTranslations('navbar');

  // Get navbar configuration
  const config = useNavbarConfig();

  // Logo configuration with i18n
  const logo: LogoConfig = {
    url: config.logo.url,
    src: config.logo.src,
    alt: t(config.logo.alt),
    title: t(config.logo.title),
  };

  // Menu configuration with i18n
  const menu: MenuItem[] = config.menu.items.map(item => {
    return translateMenuItem(item, t, locale);
  });

  return {
    logo,
    menu,
    locale,
  };
} 