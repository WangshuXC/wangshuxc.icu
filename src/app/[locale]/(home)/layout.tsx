import { Footer } from '@/components/blocks/footer/footer';
import type { ReactNode } from 'react';
import { ResizableNavbar } from '@/components/blocks/navbar/navbar';

type Props = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col relative container">
      <ResizableNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
} 