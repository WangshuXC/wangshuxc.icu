import type { NavbarConfig } from "@/types";
import { featuresConfig } from "@/config";

export const navbarConfig: NavbarConfig = {
  // Logo configuration
  logo: {
    url: "/",
    src: "/icons/apple-touch-icon.png",
    alt: "logo.alt", // i18n key (navbar. prefix will be added by useTranslations)
    title: "logo.title", // i18n key
  },

  // Authentication configuration
  auth: {
    login: {
      text: "auth.login", // i18n key
      url: "/login",
    },
    signup: {
      text: "auth.signup", // i18n key
      url: "/signup",
    },
  },

  // Menu configuration
  menu: {
    items: [
      {
        title: "menu.blog", // i18n key
        url: "/blog", // Will be prefixed with locale in hook
      },
      {
        title: "menu.document", // i18n key
        url: "/docs",
      },
      {
        title: "menu.components", // i18n key
        url: "/blocks",
      },
      ...(featuresConfig.payment.enabled
        ? [
            {
              title: "menu.pricing", // i18n key
              url: "#pricing",
              onClick: "handlePricingClick", // Special handler
            },
          ]
        : []),
    ],
  },
};
