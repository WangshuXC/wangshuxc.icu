import type { FeaturesConfig } from "@/types";


export const featuresConfig: FeaturesConfig = {
  // Blog features
  blog: {
    enabled: true,
    commentsEnabled: false,
    tagsEnabled: true,
    authorsEnabled: true,
    searchEnabled: true,
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