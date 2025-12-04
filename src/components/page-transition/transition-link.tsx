'use client';

import { usePageTransition } from '@/store/page-transition-store';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';

type TransitionLinkProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { startTransition, completeEnter, completeTransition } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const targetUrl = typeof href === 'string' ? href : href.pathname || '';
    
    // 如果是当前页面，不触发过渡动画
    if (targetUrl === pathname) {
      onClick?.(e);
      return;
    }

    // 如果是外部链接或锚点链接，不触发过渡动画
    if (targetUrl.startsWith('http') || targetUrl.startsWith('#')) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    onClick?.(e);

    // 开始过渡动画（从右侧进入）
    startTransition(targetUrl);

    // 等待遮罩完全覆盖屏幕后，导航到目标页面
    setTimeout(() => {
      router.push(targetUrl);
      
      // 给页面一点时间加载，然后开始退出动画
      setTimeout(() => {
        completeEnter();
        
        // 等待退出动画完成后，完全隐藏遮罩
        setTimeout(() => {
          completeTransition();
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
