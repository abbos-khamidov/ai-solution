'use client';

/**
 * MagneticButton - DIV wrapper that applies magnetic cursor effect to children.
 * Uses CSS transform + requestAnimationFrame (no GSAP).
 */

import React, { useRef, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from '@/motion/utils/ssrGuard';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function MagneticButton({
  children,
  strength = 0.3,
  radius = 150,
  className = '',
  style,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;
        const x = distX * pull;
        const y = distY * pull;
        wrapperRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (innerRef.current) {
          innerRef.current.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
        }
      }
    },
    [radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
    if (innerRef.current) {
      innerRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => handleMouseMove(e);
    el.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={wrapperRef}
      className={`inline-block will-change-transform ${className}`}
      style={{
        ...style,
        transition: 'transform 0.4s ease-out',
      }}
    >
      <div
        ref={innerRef}
        className="inline-block will-change-transform"
        style={{ transition: 'transform 0.4s ease-out' }}
      >
        {children}
      </div>
    </div>
  );
}
