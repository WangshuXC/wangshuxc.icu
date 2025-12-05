"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useIsAdmin } from "@/components/auth/permission-provider";

/**
 * Client component wrapper for Vercel Analytics
 * Automatically disables analytics for admin users by not rendering the component
 */
export function AnalyticsWrapper() {
  const isAdmin = useIsAdmin();

  return (
    <>
      <Analytics
        beforeSend={(event: BeforeSendEvent) => {
          if (isAdmin) {
            return null;
          }
          return event;
        }}
      />
      <SpeedInsights/>
    </>
  );
}
