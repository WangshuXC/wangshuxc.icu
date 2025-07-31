'use client';

import { ProtectedContainer } from '@/components/dashboard/protected-container';
import { useIsAdmin } from '@/components/auth/permission-provider';
import type { SidebarGroup } from '@/types';
import {
  Bell,
  CreditCard,
  Files,
  Settings,
  Shield,
  Users,
} from 'lucide-react';
import { featuresConfig } from '@/config';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

interface ProtectedLayoutClientProps {
  children: ReactNode;
}

export function ProtectedLayoutClient({ children }: ProtectedLayoutClientProps) {
  const t = useTranslations('sidebar');
  const isAdmin = useIsAdmin();

  const sidebarGroups: SidebarGroup[] = useMemo(() => {
    const groups: SidebarGroup[] = [];

    // only admin can see Dashboard menu
    if (isAdmin) {
      groups.push({
        title: t('dashboard'),
        defaultOpen: true,
        items: [
          {
            title: t('users'),
            href: '/dashboard/users',
            icon: Users,
          },
          {
            title: t('files'),
            href: '/dashboard/files',
            icon: Files,
          },
        ],
      });
    }

    // all users can see Settings menu
    groups.push({
      title: t('settings'),
      defaultOpen: true,
      items: [
        {
          title: t('profile'),
          href: '/settings/profile',
          icon: Users,
        },
        // 只有当payment功能启用时才显示billing菜单项
        ...(featuresConfig.payment.enabled ? [
          {
            title: t('billing'),
            href: '/settings/billing',
            icon: CreditCard,
          }
        ] : []),
        {
          title: t('security'),
          href: '/settings/security',
          icon: Shield,
        },
      ],
    });

    return groups;
  }, [isAdmin, t]);

  return <ProtectedContainer sidebarGroups={sidebarGroups}>{children}</ProtectedContainer>;
}
