export interface AppConfig {
  app: {
    name: string;
    version: string;
    description: string;
    url: string;
    domain: string;
  };
  metadata: {
    title: {
      default: string;
      template: string;
    };
    description: string;
    keywords: string[];
    authors: Array<{ name: string; url?: string }>;
    creator: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
    openGraph: {
      type: string;
      locale: string;
      url: string;
      siteName: string;
    };
    twitter: {
      card: string;
      creator: string;
    };
  };
  pagination: {
    defaultPageSize: number;
    maxPageSize: number;
  };
}

export interface I18nConfig {
  locales: readonly string[];
  defaultLocale: string;
  languages: Record<string, {
    name: string;
    nativeName: string;
    flag: string;
    dir: 'ltr' | 'rtl';
    enabled: boolean;
  }>;
  routing: {
    localePrefix: 'always' | 'as-needed' | 'never';
    localeDetection: boolean;
    domains?: Record<string, string>;
  };
  namespaces: string[];
  fallbackLocale: string;
  dateTimeFormats: Record<string, {
    short: Intl.DateTimeFormatOptions;
    medium: Intl.DateTimeFormatOptions;
    long: Intl.DateTimeFormatOptions;
  }>;
  numberFormats: Record<string, {
    currency: Intl.NumberFormatOptions;
    decimal: Intl.NumberFormatOptions;
    percent: Intl.NumberFormatOptions;
  }>;
}

export interface FeaturesConfig {
  blog: {
    enabled: boolean;
    commentsEnabled: boolean;
    tagsEnabled: boolean;
    authorsEnabled: boolean;
    searchEnabled: boolean;
  };
}

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system';
  themes: readonly string[];
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
    neutral: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
    info: Record<string, string>;
  };
  fonts: {
    sans: string[];
    mono: string[];
    serif: string[];
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  zIndex: {
    dropdown: number;
    modal: number;
    popover: number;
    tooltip: number;
    toast: number;
  };
}

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | string;
}

// Navbar configuration types
export interface NavbarConfig {
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu: {
    items: NavbarMenuItem[];
  };
}

export interface NavbarMenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: string; // Icon name for config, will be resolved to JSX.Element in component
  items?: NavbarMenuItem[];
  onClick?: string; // Function name for special handlers like 'handlePricingClick'
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
  defaultOpen?: boolean;
}

export interface ProtectedSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  sidebarGroups: SidebarGroup[];
}

export interface ProtectedContainerProps {
  children: React.ReactNode;
  sidebarGroups: SidebarGroup[];
}

// FriendLink config
export interface FriendLinkConfig {
  title: string;
  description: string;
  items: {  
    name: string;
    description: string;
    descriptionEn?: string;
    url: string;
  }[];
}