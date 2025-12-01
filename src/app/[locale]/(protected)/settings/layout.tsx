import type { ReactNode } from 'react';
import { AuthGuard } from '@/components/auth-guard';
import { ProtectedLayoutClient } from '@/components/dashboard/protected-layout-client';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { Suspense } from 'react';

// Force dynamic rendering for settings routes
// This is necessary because settings pages now check admin permissions
export const dynamic = 'force-dynamic';

type Props = {
  children: ReactNode;
};

/**
 * Settings layout - Handles authentication and layout for settings pages
 * Settings pages require:
 * 1. User authentication (AuthGuard)
 * 2. Permission context (provided globally in root layout)
 * 3. Standard layout (ProtectedLayoutClient)
 * 
 * Admin users will see both Dashboard and Settings menus
 * Regular users will only see Settings menu
 * 
 * Note: PermissionWrapper is provided globally in the root layout
 */
export default function SettingsLayout({ children }: Props) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AuthGuard useSkeletonFallback>
        <ProtectedLayoutClient>{children}</ProtectedLayoutClient>
      </AuthGuard>
    </Suspense>
  );
}