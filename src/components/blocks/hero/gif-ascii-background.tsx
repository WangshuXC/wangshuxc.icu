'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { parseGIF, decompressFrames } from 'gifuct-js';

interface GifAsciiBackgroundProps {
  gifUrl: string;
  width?: number;
  height?: number;
  fontSize?: number;
  charset?: string;
  className?: string;
  fps?: number;
}

interface ParsedFrame {
  data: Uint8ClampedArray;
  delay: number;
  width: number;
  height: number;
}

export function GifAsciiBackground({
  gifUrl,
  width = 100,
  height = 30,
  fontSize = 10,
  charset = '@%#*+=-:. ',
  className = '',
  fps = 15,
}: GifAsciiBackgroundProps) {
  const [asciiText, setAsciiText] = useState<string>('');
  const [frames, setFrames] = useState<ParsedFrame[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef<number>(0);

  // 将像素亮度转换为 ASCII 字符
  const brightnessToAscii = useCallback((brightness: number): string => {
    const charIndex = Math.floor((brightness / 255) * (charset.length - 1));
    return charset[charIndex] || ' ';
  }, [charset]);

  // 将图像数据转换为 ASCII
  const imageDataToAscii = useCallback((
    data: Uint8ClampedArray,
    imgWidth: number,
    imgHeight: number,
    targetWidth: number,
    targetHeight: number
  ): string => {
    let ascii = '';
    const cellWidth = imgWidth / targetWidth;
    const cellHeight = imgHeight / targetHeight;

    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const startX = Math.floor(x * cellWidth);
        const startY = Math.floor(y * cellHeight);
        
        let totalBrightness = 0;
        let count = 0;

        const endY = Math.min(Math.ceil((y + 1) * cellHeight), imgHeight);
        const endX = Math.min(Math.ceil((x + 1) * cellWidth), imgWidth);

        for (let dy = startY; dy < endY; dy++) {
          for (let dx = startX; dx < endX; dx++) {
            const pixelIndex = (dy * imgWidth + dx) * 4;
            const r = data[pixelIndex] ?? 0;
            const g = data[pixelIndex + 1] ?? 0;
            const b = data[pixelIndex + 2] ?? 0;
            const a = data[pixelIndex + 3] ?? 0;
            
            if (a < 128) {
              totalBrightness += 255;
            } else {
              const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
              totalBrightness += brightness;
            }
            count++;
          }
        }

        const avgBrightness = count > 0 ? totalBrightness / count : 255;
        ascii += brightnessToAscii(avgBrightness);
      }
      ascii += '\n';
    }

    return ascii;
  }, [brightnessToAscii]);

  // 检查帧是否为空白（全透明或全白）
  const isBlankFrame = useCallback((data: Uint8ClampedArray): boolean => {
    let totalAlpha = 0;
    let totalBrightness = 0;
    const pixelCount = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      const a = data[i + 3] ?? 0;
      
      totalAlpha += a;
      totalBrightness += (r + g + b) / 3;
    }
    
    const avgAlpha = totalAlpha / pixelCount;
    const avgBrightness = totalBrightness / pixelCount;
    
    // 如果平均透明度很低（几乎全透明）或平均亮度很高（几乎全白）
    const isTransparent = avgAlpha < 10;
    const isBright = avgBrightness > 250;
    
    return isTransparent || isBright;
  }, []);

  // 解析 GIF 文件
  const loadGif = useCallback(async (url: string) => {
    try {
      // 获取 GIF 文件
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      
      // 解析 GIF
      const gif = parseGIF(arrayBuffer);
      const parsedFrames = decompressFrames(gif, true);

      // 转换帧数据并过滤空白帧
      const processedFrames: ParsedFrame[] = [];
      
      for (const frame of parsedFrames) {
        // gifuct-js 返回的 patch 包含了像素数据
        const patch = frame.patch;
        const frameData = new Uint8ClampedArray(frame.dims.width * frame.dims.height * 4);
        
        // 复制像素数据
        for (let i = 0; i < patch.length; i++) {
          frameData[i] = patch[i] ?? 0;
        }
        
        // 检查是否为空白帧
        if (!isBlankFrame(frameData)) {
          processedFrames.push({
            data: frameData,
            delay: frame.delay || 100, // 默认 100ms
            width: frame.dims.width,
            height: frame.dims.height,
          });
        }
      }

      setFrames(processedFrames);

      // 立即显示第一帧
      if (processedFrames.length > 0) {
        const firstFrame = processedFrames[0];
        if (firstFrame) {
          const ascii = imageDataToAscii(
            firstFrame.data,
            firstFrame.width,
            firstFrame.height,
            width,
            height
          );
          setAsciiText(ascii);
        }
      }
    } catch (error) {
      console.error('Error loading GIF:', error);
    }
  }, [imageDataToAscii, width, height, isBlankFrame]);

  // 动画循环
  const animate = useCallback((currentTime: number) => {
    if (frames.length === 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const frameInterval = 1000 / fps;
    
    if (currentTime - lastFrameTimeRef.current >= frameInterval) {
      const frame = frames[currentFrameRef.current];
      if (frame) {
        const ascii = imageDataToAscii(
          frame.data,
          frame.width,
          frame.height,
          width,
          height
        );
        setAsciiText(ascii);
        
        // 移动到下一帧
        currentFrameRef.current = (currentFrameRef.current + 1) % frames.length;
      }
      
      lastFrameTimeRef.current = currentTime;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [frames, fps, imageDataToAscii, width, height]);

  // 加载 GIF
  useEffect(() => {
    loadGif(gifUrl);
  }, [gifUrl, loadGif]);

  // 启动动画
  useEffect(() => {
    if (frames.length === 0) return;

    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [frames, animate]);

  return (
    <pre
      className={`pointer-events-none flex items-center justify-center overflow-hidden font-mono leading-none text-muted-foreground/30 ${className}`}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: `${fontSize}px`,
        letterSpacing: '0',
        whiteSpace: 'pre',
      }}
      aria-hidden="true"
    >
      {asciiText}
    </pre>
  );
}

