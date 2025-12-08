import { z } from 'zod';

// App configuration schema
export const appConfigSchema = z.object({
  app: z.object({
    name: z.string().min(1, 'App name is required'),
    version: z.string().min(1, 'App version is required'),
    description: z.string().min(1, 'App description is required'),
    url: z.string().url('App URL must be a valid URL'),
    domain: z.string().min(1, 'App domain is required'),
  }),
  metadata: z.object({
    title: z.object({
      default: z.string().min(1, 'Default title is required'),
      template: z.string().min(1, 'Title template is required'),
    }),
    description: z.string().min(1, 'Metadata description is required'),
    keywords: z.array(z.string()).min(1, 'At least one keyword is required'),
    authors: z.array(z.object({
      name: z.string().min(1, 'Author name is required'),
      url: z.string().url().optional(),
    })),
    creator: z.string().min(1, 'Creator is required'),
    robots: z.object({
      index: z.boolean(),
      follow: z.boolean(),
    }),
    openGraph: z.object({
      type: z.string().min(1, 'OpenGraph type is required'),
      locale: z.string().min(1, 'OpenGraph locale is required'),
      url: z.string().url('OpenGraph URL must be valid'),
      siteName: z.string().min(1, 'OpenGraph site name is required'),
    }),
    twitter: z.object({
      card: z.string().min(1, 'Twitter card type is required'),
      creator: z.string().min(1, 'Twitter creator is required'),
    }),
  }),
  pagination: z.object({
    defaultPageSize: z.number().positive('Default page size must be positive'),
    maxPageSize: z.number().positive('Max page size must be positive'),
  }),
});

// Features configuration schema
export const featuresConfigSchema = z.object({
  blog: z.object({
    enabled: z.boolean(),
    commentsEnabled: z.boolean(),
    tagsEnabled: z.boolean(),
    authorsEnabled: z.boolean(),
    searchEnabled: z.boolean(),
  }),
});

// I18n configuration schema
export const i18nConfigSchema = z.object({
  locales: z.array(z.string().min(1, 'Locale cannot be empty')).min(1, 'At least one locale is required'),
  defaultLocale: z.string().min(1, 'Default locale is required'),
  fallbackLocale: z.string().min(1, 'Fallback locale is required'),
  languages: z.record(z.string(), z.object({
    name: z.string().min(1, 'Language name is required'),
    nativeName: z.string().min(1, 'Native name is required'),
    flag: z.string().min(1, 'Flag is required'),
    dir: z.enum(['ltr', 'rtl']),
    enabled: z.boolean(),
  })),
  routing: z.object({
    localePrefix: z.enum(['always', 'as-needed', 'never']),
    localeDetection: z.boolean(),
    domains: z.record(z.string(), z.string()).optional(),
  }),
  namespaces: z.array(z.string().min(1, 'Namespace cannot be empty')),
  dateTimeFormats: z.record(z.string(), z.object({
    short: z.record(z.string(), z.union([z.string(), z.number()])),
    medium: z.record(z.string(), z.union([z.string(), z.number()])),
    long: z.record(z.string(), z.union([z.string(), z.number()])),
  })),
  numberFormats: z.record(z.string(), z.object({
    currency: z.record(z.string(), z.union([z.string(), z.number()])),
    decimal: z.record(z.string(), z.union([z.string(), z.number()])),
    percent: z.record(z.string(), z.union([z.string(), z.number()])),
  })),
});

// Theme configuration schema
export const themeConfigSchema = z.object({
  defaultTheme: z.enum(['light', 'dark', 'system']),
  themes: z.array(z.string().min(1, 'Theme name cannot be empty')),
  colors: z.record(z.string(), z.record(z.string(), z.string())),
  fonts: z.object({
    sans: z.array(z.string().min(1, 'Font name cannot be empty')),
    mono: z.array(z.string().min(1, 'Font name cannot be empty')),
    serif: z.array(z.string().min(1, 'Font name cannot be empty')),
  }),
  borderRadius: z.record(z.string(), z.string()),
  spacing: z.record(z.string(), z.string()),
  animations: z.object({
    duration: z.record(z.string(), z.string()),
    easing: z.record(z.string(), z.string()),
  }),
  breakpoints: z.record(z.string(), z.string()),
  shadows: z.record(z.string(), z.string()),
  zIndex: z.record(z.string(), z.number()),
});

// Configuration validation function
export function validateConfig<T>(config: T, schema: z.ZodSchema<T>, configName: string): T {
  try {
    return schema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('\n');
      
      throw new Error(`Configuration validation failed for ${configName}:\n${errorMessages}`);
    }
    throw error;
  }
}

// Validate all configurations
export function validateAllConfigs(configs: {
  app: unknown;
  features: unknown;
  i18n: unknown;
  theme: unknown;
}) {
  const validatedConfigs = {
    app: validateConfig(configs.app, appConfigSchema, 'app'),
    features: validateConfig(configs.features, featuresConfigSchema, 'features'),
    i18n: validateConfig(configs.i18n, i18nConfigSchema, 'i18n'),
    theme: validateConfig(configs.theme, themeConfigSchema, 'theme'),
  } as {
    app: z.infer<typeof appConfigSchema>;
    features: z.infer<typeof featuresConfigSchema>;
    i18n: z.infer<typeof i18nConfigSchema>;
    theme: z.infer<typeof themeConfigSchema>;
  };

  // Cross-validation checks
  validateCrossReferences(validatedConfigs);

  return validatedConfigs;
}

// Cross-reference validation
function validateCrossReferences(configs: {
  app: z.infer<typeof appConfigSchema>;
  features: z.infer<typeof featuresConfigSchema>;
  i18n: z.infer<typeof i18nConfigSchema>;
  theme: z.infer<typeof themeConfigSchema>;
}) {
  // Check if default locale exists in languages
  if (!configs.i18n.languages[configs.i18n.defaultLocale]) {
    throw new Error(`Default locale '${configs.i18n.defaultLocale}' not found in languages configuration`);
  }

  // Check if fallback locale exists in languages
  if (!configs.i18n.languages[configs.i18n.fallbackLocale]) {
    throw new Error(`Fallback locale '${configs.i18n.fallbackLocale}' not found in languages configuration`);
  }

  // Check if default theme exists in themes
  if (!configs.theme.themes.includes(configs.theme.defaultTheme)) {
    throw new Error(`Default theme '${configs.theme.defaultTheme}' not found in themes list`);
  }
}

// Environment-specific validation
export function validateEnvironmentConfig() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_APP_URL',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Configuration health check
export function configHealthCheck() {
  try {
    validateEnvironmentConfig();
    console.log('✅ Environment configuration is valid');
  } catch (error) {
    console.error('❌ Environment configuration error:', error);
    throw error;
  }
}

// Development helper to check configuration
export function devConfigCheck() {
  if (process.env.NODE_ENV === 'development') {
    configHealthCheck();
  }
} 