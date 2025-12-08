"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

/**
 * Client component wrapper for Vercel Analytics
 */
export function AnalyticsWrapper() {
  return (
    <>
      <Analytics />
      <SpeedInsights/>
    </>
  );
}
