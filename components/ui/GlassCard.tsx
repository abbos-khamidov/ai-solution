'use client';

/**
 * GlassCard - Glassmorphism card with 3D tilt on hover
 * GPU-accelerated transforms, no layout shift
 */

import React, { useRef, useCallback } from 'react';
import { getGSAP } from '@/motion/utils/gsapConfig';
import { getAnimationLevel } from '@/motion/utils/performance';
import { AnimationLevel } from '@/motion/types/animations';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Tilt intensity (degrees) */
  tiltMax?: number;
  /** Glow on hover */
  glow?: boolean;
  /** Hover scale */
  hoverScale?: number;
  /** Click handler */
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function GlassCard({
  children,
  className = '',
  tiltMax = 8,
  glow = true,
  hoverScale = 1.02,
  onClick,
  style,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const animLevel = typeof window !== 'undefined' ? getAnimationLevel() : AnimationLevel.FULL;
  const isAnimated = animLevel === AnimationLevel.FULL;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isAnimated || !cardRef.current) return;

      const gsapInstance = getGSAP();
      if (!gsapInstance) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * tiltMax;
      const rotateY = (x - 0.5) * tiltMax;

      gsapInstance.to(cardRef.current, {
        rotateX,
        rotateY,
        scale: hoverScale,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });

      // Move glow to cursor position
      if (glowRef.current && glow) {
        gsapInstance.to(glowRef.current, {
          x: e.clientX - rect.left - 100,
          y: e.clientY - rect.top - 100,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        });
      }
    },
    [isAnimated, tiltMax, hoverScale, glow]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isAnimated || !cardRef.current) return;

    const gsapInstance = getGSAP();
    if (!gsapInstance) return;

    gsapInstance.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
    });

    if (glowRef.current) {
      gsapInstance.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });
    }
  }, [isAnimated]);

  return (
    <div
      ref={cardRef}
      className={`glass-card relative rounded-2xl p-6 overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: 'translate3d(0,0,0)',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Hover glow effect */}
      {glow && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-[200px] h-[200px] rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      )}
      {/* Card content - elevated on Z axis for 3D effect */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}
