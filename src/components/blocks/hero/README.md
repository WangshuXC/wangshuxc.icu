# Hero Section with Animated ASCII Background

## 功能特性

- ✨ **实时 GIF 动画转换**：将 GIF 动画实时转换为 ASCII 字符背景
- 🎬 **帧同步**：ASCII 动画与原始 GIF 完全同步
- 🎨 **可自定义**：字符集、尺寸、帧率、样式等都可配置
- 🚀 **高性能**：使用 requestAnimationFrame 优化渲染
- 📱 **响应式设计**：适配各种屏幕尺寸

## 工作原理

1. **GIF 加载**：浏览器原生加载和播放 GIF 动画
2. **实时捕获**：使用 Canvas API 实时捕获当前显示的帧
3. **ASCII 转换**：将每一帧转换为 ASCII 字符
4. **同步渲染**：ASCII 动画与 GIF 完美同步

## 使用方法

### 基础用法

```tsx
import { HeroSection } from '@/components/blocks/hero/hero-section';

export default function Page() {
  return (
    <HeroSection
      greeting="Hello, I'm"
      name="Your Name"
      role="Frontend Developer"
      company="Your Company"
      location="Your Location"
      backgroundGif="/path/to/animated.gif"
    />
  );
}
```

### 直接使用 GifAsciiBackground 组件

```tsx
import { GifAsciiBackground } from '@/components/blocks/hero/gif-ascii-background';

export default function MyComponent() {
  return (
    <div className="relative h-screen">
      <GifAsciiBackground
        gifUrl="/your-animated.gif"
        width={100}
        height={30}
        fontSize={10}
        fps={15}
      />
      {/* 你的内容 */}
    </div>
  );
}
```

## 组件参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `gifUrl` | `string` | - | GIF 图片的 URL（必需）⚠️ 必须支持 CORS |
| `width` | `number` | `100` | ASCII 艺术的宽度（字符数） |
| `height` | `number` | `30` | ASCII 艺术的高度（行数） |
| `fontSize` | `number` | `10` | 字符的字体大小（像素） |
| `charset` | `string` | `'@%#*+=-:. '` | 用于渲染的字符集（从暗到亮） |
| `fps` | `number` | `15` | 采样帧率（每秒帧数） |
| `className` | `string` | `''` | 额外的 CSS 类名 |

## 性能优化建议

### 1. 调整 ASCII 分辨率

```tsx
// 低分辨率 - 更好的性能
<GifAsciiBackground width={80} height={25} />

// 高分辨率 - 更好的细节
<GifAsciiBackground width={150} height={50} />
```

### 2. 调整帧率

```tsx
// 低帧率 - 节省 CPU
<GifAsciiBackground fps={10} />

// 高帧率 - 更流畅
<GifAsciiBackground fps={30} />
```

### 3. 优化字符集

```tsx
// 简单字符集 - 更快的渲染
charset=" .-+*#@"

// 复杂字符集 - 更好的效果（但更慢）
charset=" .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
```

## 自定义字符集示例

### 标准灰度
```tsx
charset="@%#*+=-:. "
```

### 块状字符
```tsx
charset=" ░▒▓█"
```

### 数字风格
```tsx
charset=" .123456789@"
```

### 极简风格
```tsx
charset=" .oO@"
```

### 复杂细节
```tsx
charset=" .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
```

## 推荐配置

### 桌面端全屏背景
```tsx
<GifAsciiBackground
  gifUrl="/bg.gif"
  width={120}
  height={40}
  fontSize={10}
  fps={15}
/>
```

### 移动端优化
```tsx
<GifAsciiBackground
  gifUrl="/bg.gif"
  width={60}
  height={20}
  fontSize={8}
  fps={10}
  className="md:hidden"
/>
```

### 高性能配置
```tsx
<GifAsciiBackground
  gifUrl="/bg.gif"
  width={80}
  height={25}
  fontSize={8}
  fps={12}
  charset=" .-:=+*#@"
/>
```

### 高质量配置
```tsx
<GifAsciiBackground
  gifUrl="/bg.gif"
  width={150}
  height={50}
  fontSize={6}
  fps={24}
  charset=" .'`^\",:;Il!i<>~+_-?][}{1)(|tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
/>
```

## 技术实现细节

### 核心原理

1. **图像加载**：使用 `<img>` 元素加载 GIF，浏览器自动处理动画
2. **帧捕获**：使用 `requestAnimationFrame` 循环，按指定 FPS 捕获
3. **Canvas 绘制**：将当前 GIF 帧绘制到 Canvas
4. **像素采样**：读取 Canvas 像素数据
5. **亮度计算**：使用公式 `0.299*R + 0.587*G + 0.114*B`
6. **ASCII 映射**：根据亮度映射到字符集
7. **DOM 更新**：使用 React state 更新显示

### 性能优化技术

- ✅ `willReadFrequently: true` - 优化频繁的像素读取
- ✅ `requestAnimationFrame` - 与浏览器刷新率同步
- ✅ 帧率控制 - 避免不必要的计算
- ✅ `useCallback` - 避免函数重建
- ✅ 区域采样 - 减少像素处理量

## CORS 注意事项

GIF 图片必须支持 CORS。如果 GIF 来自外部域名：

### 方法 1：服务器配置 CORS
```nginx
Access-Control-Allow-Origin: *
```

### 方法 2：使用代理
```tsx
<GifAsciiBackground
  gifUrl="/api/proxy?url=https://external.com/image.gif"
/>
```

### 方法 3：使用本地文件
将 GIF 放在 `public` 目录：
```tsx
<GifAsciiBackground gifUrl="/images/bg.gif" />
```

## 浏览器兼容性

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ⚠️ 需要支持 Canvas API、requestAnimationFrame

## 常见问题

### Q: GIF 不动了？
A: 检查：
1. CORS 配置
2. GIF 文件是否有效
3. 浏览器控制台是否有错误

### Q: 性能问题？
A: 尝试：
1. 降低 `width` 和 `height`
2. 降低 `fps`
3. 使用简单的 `charset`
4. 减小 GIF 文件尺寸

### Q: ASCII 看起来很模糊？
A: 调整：
1. 增加 `width` 和 `height`
2. 减小 `fontSize`
3. 使用更丰富的 `charset`

## 示例画廊

### 矩阵风格
```tsx
<GifAsciiBackground
  gifUrl="/matrix.gif"
  charset="ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01"
  className="text-green-500/30"
/>
```

### 赛博朋克风格
```tsx
<GifAsciiBackground
  gifUrl="/cyberpunk.gif"
  charset="█▓▒░ "
  className="text-cyan-500/40"
/>
```

### 复古终端风格
```tsx
<GifAsciiBackground
  gifUrl="/retro.gif"
  charset="@#S%?*+;:,. "
  className="text-amber-500/25 font-['Courier_New']"
/>
```

