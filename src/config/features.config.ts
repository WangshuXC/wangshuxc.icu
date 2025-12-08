import type { FeaturesConfig } from "@/types";


export const featuresConfig: FeaturesConfig = {
  // Authentication features
  auth: {
    enabled: false,
    providers: {
      email: false,
      github: false,
      google: false,
    },
    session: {
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    passwordReset: false,
    emailVerification: false,
  },

  // Blog features
  blog: {
    enabled: true,
    commentsEnabled: false,
    tagsEnabled: true,
    authorsEnabled: true,
    searchEnabled: true,
  },

  // Documentation features
  docs: {
    enabled: true,
    searchEnabled: true,
    editOnGithub: true,
    tableOfContents: true,
    breadcrumbs: true,
  },

  // Analytics features
  analytics: {
    enabled: true,
    provider: 'vercel',
    trackingId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },

  // Notification features
  notifications: {
    enabled: false,
    emailNotifications: false,
    pushNotifications: false,
    inAppNotifications: false,
  },

  // Dashboard features
  dashboard: {
    enabled: false,
    widgets: {
      analytics: false,
      recentActivity: false,
      quickActions: false,
      notifications: false,
    },
  },

}; 