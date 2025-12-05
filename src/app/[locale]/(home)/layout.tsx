import { Footer } from "@/components/blocks/footer/footer";
import type { ReactNode } from "react";
import { ResizableNavbar } from "@/components/blocks/navbar/navbar";
import dynamic from "next/dynamic";

// 延迟加载非关键的页面过渡和滚动进度组件
const PageTransition = dynamic(
  () => import("@/components/page-transition").then((mod) => mod.PageTransition),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then((mod) => mod.ScrollProgress),
  { ssr: false }
);

type Props = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col relative container'>
      <ScrollProgress />
      <PageTransition />
      <ResizableNavbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
