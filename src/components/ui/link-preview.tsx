"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 预加载图片
  React.useEffect(() => {
    if (!src) return;

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: any) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className='hidden'>
          <img src={src} width={width} height={height} alt='hidden image' />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className='origin-(--radix-hover-card-content-transform-origin) z-[100]'
            align='center'
            sideOffset={10}
            forceMount
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key='preview'
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    scale: 0.6,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                  className='shadow-xl rounded-xl'
                  style={{
                    x: translateX,
                  }}
                >
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block p-1 border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
                    style={{ fontSize: 0 }}
                  >
                    {!imageLoaded && (
                      <div
                        className='flex items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-800'
                        style={{ width, height }}
                      >
                        <div className='h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-600 dark:border-neutral-700 dark:border-t-neutral-400' />
                      </div>
                    )}
                    <Image
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      className={cn(
                        "rounded-lg transition-opacity duration-300",
                        imageLoaded ? "opacity-100" : "opacity-0"
                      )}
                      alt='preview image'
                      onLoad={() => setImageLoaded(true)}
                    />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};
