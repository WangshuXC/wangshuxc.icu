"use client";

import { useTranslations } from "next-intl";
import { ColorfulText } from "@/components/ui/colorful-text";
import { MotionWrapper } from "@/components/motion-wrapper";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  greeting?: string;
  name?: string;
  role?: string;
  company?: string;
  location?: string;
}

export function HeroSection({
  greeting,
  name,
  role,
  company,
  location,
}: HeroSectionProps) {
  const t = useTranslations("heroSection");

  const displayName = name || t("name");
  const displayGreeting = greeting || t("greeting");
  const displayRole = role || t("role");
  const displayCompany = company || t("company");
  const displayLocation = location || t("location");

  return (
    <section className='relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden'>
      <div className='relative z-10 mx-auto max-w-4xl text-center'>
        {/* Greeting */}
        <MotionWrapper variant='fadeUp' delay={0.1} duration={0.8}>
          <h1 className='mb-6 font-bold text-5xl text-foreground md:text-6xl lg:text-8xl'>
            {displayGreeting} <br />
            <ColorfulText text={displayName} /> 👋
          </h1>
        </MotionWrapper>

        <MotionWrapper variant='fadeUp' delay={0.3} duration={0.8}>
          <p className='mb-8 text-muted-foreground text-xl md:text-2xl'>
            {displayRole}{" "}
            <span className='font-semibold text-[#0053D9]'>
              {displayCompany}
            </span>{" "}
            {displayLocation}
          </p>
        </MotionWrapper>
      </div>

      <motion.div
          className='absolute bottom-20 left-1/2 cursor-pointer'
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <ChevronDown
            className='h-8 w-8 text-muted-foreground/60'
            strokeWidth={1.5}
          />
        </motion.div>
    </section>
  );
}
