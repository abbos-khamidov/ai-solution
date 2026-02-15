'use client';

/**
 * CounterAnimation - Animated number counter that triggers on scroll
 * Uses GSAP for smooth counting with ScrollTrigger
 */

import React, { useRef, useState, useCallback } from 'react';
import { useGSAPContext } from './useGSAPContext';

interface CounterAnimationProps {
  /** Target number to count to */
  target: number;
  /** Starting number */
  from?: number;
  /** Duration in seconds */
  duration?: number;
  /** Suffix (e.g., '%', '+', 'K') */
  suffix?: string;
  /** Prefix (e.g., '$', '€') */
  prefix?: string;
  /** Decimal places */
  decimals?: number;
  /** GSAP ease */
  ease?: string;
  /** Separator for thousands */
  separator?: string;
  /** Additional className */
  className?: string;
  /** ScrollTrigger start */
  start?: string;
  /** Whether to pulse on hover */
  pulseOnHover?: boolean;
}

export function CounterAnimation({
  target,
  from = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  ease = 'power2.out',
  separator = ',',
  className = '',
  start = 'top 80%',
  pulseOnHover = true,
}: CounterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = useCallback(
    (num: number): string => {
      const fixed = num.toFixed(decimals);
      if (!separator) return fixed;

      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      return parts.join('.');
    },
    [decimals, separator]
  );

  useGSAPContext(
    (gsap) => {
      const el = containerRef.current;
      const valueEl = valueRef.current;
      if (!el || !valueEl) return;

      // Set initial value
      valueEl.textContent = `${prefix}${formatNumber(from)}${suffix}`;

      const counter = { value: from };

      gsap.to(counter, {
        value: target,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          onEnter: () => setHasAnimated(true),
        },
        onUpdate: () => {
          if (valueEl) {
            valueEl.textContent = `${prefix}${formatNumber(counter.value)}${suffix}`;
          }
        },
      });
    },
    { scope: containerRef as React.RefObject<HTMLElement>, deps: [target, from, duration] }
  );

  const handleMouseEnter = () => {
    if (!pulseOnHover || !hasAnimated) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`counter-animation inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={valueRef}
        className={`tabular-nums transition-transform duration-300 inline-block ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {prefix}{formatNumber(from)}{suffix}
      </span>
    </div>
  );
}
