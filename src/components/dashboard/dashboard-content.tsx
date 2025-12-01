'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Download, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DashboardContent() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('welcome')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t('downloadReport')}
          </Button>
          <Button>
            <User className="mr-2 h-4 w-4" />
            {t('addUser')}
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notification Settings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t('notificationSettings')}
              </CardTitle>
              <CardDescription>{t('manageNotifications')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Newsletter Subscription */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{t('newsletterSubscription')}</h3>
                  <p className="text-muted-foreground text-sm">{t('manageNewsletter')}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="newsletter">{t('subscribeToNewsletter')}</Label>
                    <p className="text-muted-foreground text-sm">{t('changeAnytime')}</p>
                  </div>
                  <Switch id="newsletter" defaultChecked />
                </div>
              </div>

              {/* Other Notification Settings */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{t('emailNotifications')}</h3>
                  <p className="text-muted-foreground text-sm">{t('chooseNotifications')}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing">{t('marketingEmails')}</Label>
                    <Switch id="marketing" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="security">{t('securityAlerts')}</Label>
                    <Switch id="security" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="updates">{t('productUpdates')}</Label>
                    <Switch id="updates" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('recentActivity')}</CardTitle>
              <CardDescription>{t('latestActivity')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">New user registered</p>
                  <p className="text-muted-foreground text-xs">2 minutes ago</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 font-semibold text-secondary-foreground text-xs">
                  New
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">File uploaded</p>
                  <p className="text-muted-foreground text-xs">5 minutes ago</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 font-semibold text-primary-foreground text-xs">
                  Success
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Server maintenance</p>
                  <p className="text-muted-foreground text-xs">1 hour ago</p>
                </div>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs">
                  Warning
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Failed login attempt</p>
                  <p className="text-muted-foreground text-xs">2 hours ago</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 font-semibold text-destructive-foreground text-xs">
                  Alert
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
