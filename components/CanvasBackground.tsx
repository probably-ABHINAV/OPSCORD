"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { HERO_NODES, HERO_EDGES } from "@/lib/mockData";

interface Particle {
  t: number;
  speed: number;
  color: string;
  edgeIdx: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    HERO_EDGES.forEach((edge, idx) => {
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        particles.push({
          t: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
          color: HERO_NODES[edge[1]].color,
          edgeIdx: idx,
        });
      }
    });
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    initParticles();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouse);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Draw edges
      HERO_EDGES.forEach(([a, b]) => {
        const ax = HERO_NODES[a].x * W;
        const ay = HERO_NODES[a].y * H;
        const bx = HERO_NODES[b].x * W;
        const by = HERO_NODES[b].y * H;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = "rgba(99,139,255,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw particles
      particlesRef.current.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const edge = HERO_EDGES[p.edgeIdx];
        const ax = HERO_NODES[edge[0]].x * W;
        const ay = HERO_NODES[edge[0]].y * H;
        const bx = HERO_NODES[edge[1]].x * W;
        const by = HERO_NODES[edge[1]].y * H;
        const px = ax + (bx - ax) * p.t;
        const py = ay + (by - ay) * p.t;

        // Glow halo
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
        grad.addColorStop(0, p.color + "66");
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Particle dot
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw nodes
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      HERO_NODES.forEach((node) => {
        const nx = node.x * W;
        const ny = node.y * H;
        const dist = Math.sqrt((mx - nx) ** 2 + (my - ny) ** 2);
        const isHover = dist < 80;
        const opacity = isHover ? 1 : 0.6;
        const r = (node as { big?: boolean }).big ? 9 : 6;

        // Background glow
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 4);
        glow.addColorStop(0, node.color + (isHover ? "44" : "22"));
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(nx, ny, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Label
        ctx.font = "11px var(--font-space-mono), monospace";
        ctx.fillStyle = `rgba(255,255,255,${isHover ? 0.85 : 0.55})`;
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny - r - 10);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
