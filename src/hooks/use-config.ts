import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { appConfig, featuresConfig, i18nConfig, themeConfig, navbarConfig } from '@/config';
import type {
  AppConfig,
  FeaturesConfig,
  I18nConfig,
  ThemeConfig,
  NavbarConfig,
} from '@/types';

/**
 * Hook to access application configuration
 */
export function useAppConfig(): AppConfig {
  return useMemo(() => appConfig, []);
}

/**
 * Hook to access features configuration
 */
export function useFeaturesConfig(): FeaturesConfig {
  return useMemo(() => featuresConfig, []);
}

/**
 * Hook to access internationalization configuration
 */
export function useI18nConfig(): I18nConfig {
  return useMemo(() => i18nConfig, []);
}

/**
 * Hook to access theme configuration
 */
export function useThemeConfig(): ThemeConfig {
  return useMemo(() => themeConfig, []);
}

/**
 * Hook to access navbar configuration
 */
export function useNavbarConfig(): NavbarConfig {
  return useMemo(() => navbarConfig, []);
}

/**
 * Hook to get current locale configuration
 */
export function useCurrentLocaleConfig() {
  const locale = useLocale();
  const config = useI18nConfig();

  return useMemo(() => {
    const language = config.languages[locale];
    const dateTimeFormat = config.dateTimeFormats[locale];
    const numberFormat = config.numberFormats[locale];

    return {
      locale,
      language,
      dateTimeFormat,
      numberFormat,
      isRTL: language?.dir === 'rtl',
      isDefault: locale === config.defaultLocale,
    };
  }, [locale, config]);
}

/**
 * Hook to check if a feature is enabled
 */
export function useFeatureFlag(feature: string): boolean {
  const config = useFeaturesConfig();

  return useMemo(() => {
    const keys = feature.split('.');
    let current: unknown = config;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return false;
      }
    }

    return Boolean(current);
  }, [feature, config]);
}

/**
 * Hook to get theme colors
 */
export function useThemeColors() {
  const config = useThemeConfig();

  return useMemo(() => config.colors, [config]);
}

/**
 * Hook to get responsive breakpoints
 */
export function useBreakpoints() {
  const config = useThemeConfig();

  return useMemo(() => config.breakpoints, [config]);
}

/**
 * Hook to get pagination configuration
 */
export function usePaginationConfig() {
  const config = useAppConfig();

  return useMemo(() => config.pagination, [config]);
}

/**
 * Hook to get metadata configuration for SEO
 */
export function useMetadataConfig() {
  const config = useAppConfig();

  return useMemo(() => config.metadata, [config]);
}

/**
 * Hook to get all enabled languages
 */
export function useEnabledLanguages() {
  const config = useI18nConfig();

  return useMemo(() => {
    return config.locales
      .filter((locale: string) => config.languages[locale]?.enabled)
      .map((locale: string) => ({
        locale,
        ...config.languages[locale],
      }));
  }, [config]);
}

/**
 * Hook to format currency based on locale
 */
export function useCurrencyFormatter() {
  const { locale, numberFormat } = useCurrentLocaleConfig();

  return useMemo(() => {
    return (amount: number, currency?: string) => {
      const formatOptions = {
        ...numberFormat?.currency,
        ...(currency && { currency }),
      };

      return new Intl.NumberFormat(locale, formatOptions).format(amount);
    };
  }, [locale, numberFormat]);
}

/**
 * Hook to format date based on locale
 */
export function useDateFormatter() {
  const { locale, dateTimeFormat } = useCurrentLocaleConfig();

  return useMemo(() => {
    return {
      short: (date: Date) => new Intl.DateTimeFormat(locale, dateTimeFormat?.short).format(date),
      medium: (date: Date) => new Intl.DateTimeFormat(locale, dateTimeFormat?.medium).format(date),
      long: (date: Date) => new Intl.DateTimeFormat(locale, dateTimeFormat?.long).format(date),
    };
  }, [locale, dateTimeFormat]);
}
