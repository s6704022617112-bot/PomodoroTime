import { useEffect, useRef } from 'react';
import type { Particle } from '../types';

interface ExplosionEffectProps {
  onComplete?: () => void;
}

export function ExplosionEffect({ onComplete }: ExplosionEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const centerX = width / 2;
    const centerY = height / 2;

    const colors = [
      '#ef4444', // Red tomato
      '#f87171', // Light red
      '#dc2626', // Deep red
      '#fbbf24', // Yellow/Gold
      '#f59e0b', // Amber seed
      '#10b981', // Green leaf
      '#34d399', // Light green
      '#38bdf8', // Cyan blue
      '#ffffff', // White sparkle
    ];

    const shapes: Particle['shape'][] = ['circle', 'star', 'seed', 'leaf'];

    // Generate 120 explosion particles
    const particles: Particle[] = Array.from({ length: 120 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 14;
      return {
        id: i,
        x: centerX + (Math.random() - 0.5) * 40,
        y: centerY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // Slight upward burst
        size: 5 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
      };
    });

    let frame = 0;
    const maxFrames = 100;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.vx *= 0.98; // air drag
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - frame / maxFrames);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          // Draw 4-point star
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(0, 0, p.size, 0);
          ctx.quadraticCurveTo(0, 0, 0, p.size);
          ctx.quadraticCurveTo(0, 0, -p.size, 0);
          ctx.quadraticCurveTo(0, 0, 0, -p.size);
          ctx.fill();
        } else if (p.shape === 'seed') {
          // Teardrop seed
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 3, p.size / 1.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Leaf shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.quadraticCurveTo(p.size / 2, 0, 0, p.size / 2);
          ctx.quadraticCurveTo(-p.size / 2, 0, 0, -p.size / 2);
          ctx.fill();
        }

        ctx.restore();
      });

      frame++;
      if (frame < maxFrames) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        if (onComplete) onComplete();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      id="tomato-explosion-canvas"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
