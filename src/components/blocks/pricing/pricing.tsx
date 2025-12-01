'use client';

import { ArrowRight, CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useIsAuthenticated } from '@/store/auth-store';
import { useRouter } from '@/i18n/navigation';

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlyTotal?: number;
  features: PricingFeature[];
  priceIds?: {
    monthly?: string;
    yearly?: string;
  };
  button: {
    text: string;
    url?: string; // Optional, for fallback
  };
}

interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const Pricing = ({
  heading,
  description,
  plans,
}: Pricing2Props) => {
  const t = useTranslations('pricing');

  // 使用i18n翻译或传入的props
  const finalHeading = heading || t('heading');
  const finalDescription = description || t('description');
  const [isYearly, setIsYearly] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  
  // Use configured plans if not provided as props
  const pricingPlans = plans || [];

  const handlePurchaseClick = (plan: PricingPlan) => {
    if (!isAuthenticated) {
      // If user is not logged in, redirect to login page
      router.push('/login');
      return;
    }

    // Free plan redirects directly to dashboard
    if (plan.id === 'free') {
      router.push('/dashboard');
      return;
    }

    // For paid plans, redirect to dashboard as payment is not integrated
    router.push('/dashboard');
  };

  return (
    <section id="pricing" className="py-16">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty font-bold text-4xl lg:text-6xl">{finalHeading}</h2>
          <p className="text-muted-foreground lg:text-xl">{finalDescription}</p>
          <div className="flex items-center gap-3 text-lg">
            {t('monthly')}
            <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)} />
            {t('yearly')}
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            {pricingPlans.map((plan: PricingPlan) => (
              <Card key={plan.id} className="flex w-80 flex-col justify-between text-left">
                <CardHeader>
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <span className="font-bold text-4xl">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <p className="text-muted-foreground">
                    {plan.monthlyPrice === 'Free' ? (
                      'Forever free'
                    ) : (
                      <>
                        Billed{' '}
                        {isYearly
                          ? `$${plan.yearlyTotal} annually`
                          : `$${Number(plan.monthlyPrice.slice(1))} monthly`}
                      </>
                    )}
                  </p>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  {plan.id === 'pro' && (
                    <p className="mb-3 font-semibold">Everything in Plus, and:</p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature: PricingFeature, index: number) => (
                      <li key={`${plan.id}-feature-${index}`} className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button 
                    className="w-full" 
                    onClick={() => handlePurchaseClick(plan)}
                  >
                    {plan.button.text}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing };
