import { Footer } from '@/components/blocks/footer/footer';
import type { ReactNode } from 'react';
import { NewNavbar } from '@/components/blocks/newNav/resize-nav';

type Props = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col relative container">
      <NewNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
} 