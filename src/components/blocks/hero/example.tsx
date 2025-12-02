/**
 * GIF ASCII Background 使用示例
 * 
 * 这个文件展示了如何在不同场景下使用 GifAsciiBackground 组件
 */

import { HeroSection } from './hero-section';
import { GifAsciiBackground } from './gif-ascii-background';

// ============================================
// 示例 1: 基础用法 - 在 Hero Section 中使用
// ============================================
export function BasicHeroExample() {
  return (
    <HeroSection
      greeting="Hello, I'm"
      name="Your Name"
      role="Frontend Developer"
      company="Your Company"
      location="Beijing"
      backgroundGif="/images/animated-bg.gif"
    />
  );
}

// ============================================
// 示例 2: 矩阵风格背景
// ============================================
export function MatrixStyleExample() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <GifAsciiBackground
        gifUrl="/gifs/matrix-rain.gif"
        width={120}
        height={40}
        fontSize={10}
        charset="ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01"
        fps={20}
        className="text-green-500/40"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="font-bold text-6xl text-green-500">Enter the Matrix</h1>
      </div>
    </section>
  );
}

// ============================================
// 示例 3: 赛博朋克风格
// ============================================
export function CyberpunkExample() {
  return (
    <section className="relative h-screen overflow-hidden bg-gray-900">
      <GifAsciiBackground
        gifUrl="/gifs/cyberpunk.gif"
        width={150}
        height={50}
        fontSize={8}
        charset="█▓▒░ "
        fps={15}
        className="text-cyan-400/30"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-7xl text-cyan-400">CYBER FUTURE</h1>
        <p className="text-2xl text-cyan-300/80">Welcome to 2077</p>
      </div>
    </section>
  );
}

// ============================================
// 示例 4: 复古终端风格
// ============================================
export function RetroTerminalExample() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <GifAsciiBackground
        gifUrl="/gifs/retro-computer.gif"
        width={100}
        height={30}
        fontSize={12}
        charset="@#S%?*+;:,. "
        fps={12}
        className="font-['Courier_New'] text-amber-500/25"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="border-4 border-amber-500 bg-black/80 p-8">
          <pre className="font-mono text-amber-500 text-xl">
{`> SYSTEM ONLINE
> LOADING...
> READY_`}
          </pre>
        </div>
      </div>
    </section>
  );
}

// ============================================
// 示例 5: 高性能配置（移动端友好）
// ============================================
export function MobileOptimizedExample() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 桌面端高质量 */}
      <GifAsciiBackground
        gifUrl="/gifs/background.gif"
        width={120}
        height={40}
        fontSize={10}
        fps={15}
        className="hidden md:block"
      />
      
      {/* 移动端优化 */}
      <GifAsciiBackground
        gifUrl="/gifs/background.gif"
        width={60}
        height={20}
        fontSize={8}
        fps={10}
        className="md:hidden"
      />
      
      <div className="relative z-10 container mx-auto p-8">
        <h1 className="font-bold text-4xl md:text-6xl">Your Content</h1>
      </div>
    </section>
  );
}

// ============================================
// 示例 6: 多层叠加效果
// ============================================
export function MultiLayerExample() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* 背景层 */}
      <GifAsciiBackground
        gifUrl="/gifs/layer-1.gif"
        width={80}
        height={30}
        fontSize={14}
        charset=" .:-=+*#%@"
        fps={10}
        className="text-blue-500/10"
      />
      
      {/* 中间层 */}
      <GifAsciiBackground
        gifUrl="/gifs/layer-2.gif"
        width={100}
        height={35}
        fontSize={10}
        charset=" ░▒▓█"
        fps={15}
        className="text-purple-500/15"
      />
      
      {/* 内容层 */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="font-bold text-8xl">Layered Effects</h1>
      </div>
    </section>
  );
}

// ============================================
// 示例 7: 自定义颜色和样式
// ============================================
export function CustomStyledExample() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
      <GifAsciiBackground
        gifUrl="/gifs/abstract.gif"
        width={120}
        height={40}
        fontSize={9}
        charset="@%#*+=-:. "
        fps={18}
        className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent opacity-30"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-bold text-7xl text-transparent">
          Gradient Magic
        </h1>
      </div>
    </section>
  );
}

// ============================================
// 示例 8: 极简风格
// ============================================
export function MinimalExample() {
  return (
    <section className="relative h-screen overflow-hidden bg-white">
      <GifAsciiBackground
        gifUrl="/gifs/minimal-pattern.gif"
        width={80}
        height={25}
        fontSize={12}
        charset=" .oO"
        fps={8}
        className="text-gray-400/20"
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="font-light text-8xl text-gray-900">Minimal</h1>
      </div>
    </section>
  );
}

// ============================================
// 示例 9: 响应式配置
// ============================================
export function ResponsiveExample() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <GifAsciiBackground
        gifUrl="/gifs/responsive.gif"
        width={120}
        height={40}
        fontSize={10}
        fps={15}
        className="text-muted-foreground/20"
      />
      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="mb-6 font-bold text-4xl md:text-6xl lg:text-8xl">
          Responsive Design
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl">
          Adapts to any screen size
        </p>
      </div>
    </section>
  );
}

// ============================================
// 示例 10: 交互式内容
// ============================================
export function InteractiveExample() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <GifAsciiBackground
        gifUrl="/gifs/interactive.gif"
        width={100}
        height={30}
        fontSize={10}
        fps={15}
        className="text-primary/15"
      />
      <div className="relative z-10 container mx-auto p-8">
        <div className="mx-auto max-w-2xl rounded-lg border bg-background/95 p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="mb-4 font-bold text-3xl">Interactive Content</h2>
          <p className="mb-6">
            ASCII background doesn't interfere with user interactions thanks to pointer-events-none.
          </p>
          <button 
            type="button"
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Click Me!
          </button>
        </div>
      </div>
    </section>
  );
}
