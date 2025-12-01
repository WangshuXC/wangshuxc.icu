'use client';

export function HeroSection() {
  return (
    <section className="h-screen container flex flex-col items-center justify-center py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
          {/* Greeting */}
          <h1 className="mb-6 font-bold text-5xl text-foreground md:text-6xl lg:text-8xl">
            Hello, I&apos;m{' '}
            <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
              WangshuXC
            </span>{' '}
            👋
          </h1>

          {/* Job Title */}
          <p className="mb-8 text-muted-foreground text-xl md:text-2xl">
            Frontend Developer at{' '}
            <span className="font-semibold text-[#0053D9]">Tencent</span>, Beijing
          </p>
        </div>
    </section>
  );
}
