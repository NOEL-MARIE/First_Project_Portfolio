"use client";

import { useEffect, useRef, useState } from "react";

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

type ParticlesBgProps = {
  color?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  className?: string;
};

export default function ParticlesBg({
  color = "#FFF",
  quantity = 100,
  staticity = 50,
  ease = 50,
  className = "",
}: ParticlesBgProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  // Convert hex color to rgb
  const colorRgb = (() => {
    let hex = color.replace(/^#/, "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  })();

  // Circle generator
  const circleParams = (): Circle => ({
    x: Math.random() * canvasSize.w,
    y: Math.random() * canvasSize.h,
    translateX: 0,
    translateY: 0,
    size: Math.random() * 2 + 1,
    alpha: 0,
    targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
    magnetism: 0.1 + Math.random() * 4,
  });

  // Remap utility
  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number) =>
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - canvasSize.w / 4;
      const y = e.clientY - rect.top - canvasSize.h / 4;
      const inside = x < canvasSize.w / 2 && x > -canvasSize.w / 2 && y < canvasSize.h / 2 && y > -canvasSize.h / 2;
      if (inside) setMouse({ x, y });
    }
  };

  // Resize canvas
  const resizeCanvas = () => {
    if (canvasRef.current && containerRef.current) {
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      setCanvasSize({ w, h });
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        canvasRef.current.width = w * window.devicePixelRatio;
        canvasRef.current.height = h * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
      setCircles(Array.from({ length: quantity }, () => circleParams()));
    }
  };

  const draw = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);

    circles.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = Math.min(...edge);
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 50, 0, 1).toFixed(5));

      circle.alpha =
        remapClosestEdge > 1 ? Math.min(circle.alpha + 0.02, circle.targetAlpha) : circle.targetAlpha * remapClosestEdge;

      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX += (mouse.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      // respawn circle if it goes out of bounds
      if (circle.x < -circle.size || circle.x > canvasSize.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.h + circle.size) {
        circles[i] = circleParams();
      }

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.size, 2, 9 * Math.PI);
      ctx.fillStyle = `rgba(${colorRgb}, ${circle.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize.w, canvasSize.h]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
    </div>
  );
}
