'use client';

/**
 * MagneticButton - DIV wrapper that applies magnetic cursor effect to children.
 * Always renders a <div> — never a <button> — to avoid nested interactive elements.
 * Children are responsible for their own semantics (button, a, etc.).
 * GPU-accelerated with transform3d.
 */

import React, { useRef, useCallback, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/motion/utils/ssrGuard';
import { getGSAP } from '@/motion/utils/gsapConfig';
import { getAnimationLevel } from '@/motion/utils/performance';
import { AnimationLevel } from '@/motion/types/animations';

interface MagneticButtonProps {
  children: React.ReactNode;
  /** Magnetic pull strength (0-1) */
  strength?: number;
  /** Radius of magnetic effect in pixels */
  radius?: number;
  /** Additional className */
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

  const animLevel = typeof window !== 'undefined' ? getAnimationLevel() : AnimationLevel.FULL;
  const isAnimated = animLevel === AnimationLevel.FULL;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isAnimated || !wrapperRef.current) return;

      const gsapInstance = getGSAP();
      if (!gsapInstance) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const pull = (1 - distance / radius) * strength;

        gsapInstance.to(wrapperRef.current, {
          x: distX * pull,
          y: distY * pull,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: true,
        });

        if (innerRef.current) {
          gsapInstance.to(innerRef.current, {
            x: distX * pull * 0.5,
            y: distY * pull * 0.5,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: true,
          });
        }
      }
    },
    [isAnimated, radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isAnimated || !wrapperRef.current) return;

    const gsapInstance = getGSAP();
    if (!gsapInstance) return;

    gsapInstance.to(wrapperRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      overwrite: true,
    });

    if (innerRef.current) {
      gsapInstance.to(innerRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true,
      });
    }
  }, [isAnimated]);

  useIsomorphicLayoutEffect(() => {
    if (!isAnimated) return;

    const el = wrapperRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => handleMouseMove(e);
    const onLeave = () => handleMouseLeave();

    el.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isAnimated, handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={wrapperRef}
      className={`magnetic-wrapper inline-block will-change-transform ${className}`}
      style={{
        ...style,
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      <div ref={innerRef} className="magnetic-inner inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}
