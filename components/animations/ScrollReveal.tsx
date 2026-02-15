'use client';

/**
 * ScrollReveal - Wrapper component for scroll-triggered animations
 * Uses GSAP ScrollTrigger for performant reveals
 */

import React, { useRef } from 'react';
import { useGSAPContext } from './useGSAPContext';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Distance to travel in pixels */
  distance?: number;
  /** GSAP ease string */
  ease?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** Whether animation plays only once */
  once?: boolean;
  /** Stagger children */
  stagger?: number;
  /** Additional className */
  className?: string;
  /** HTML tag for the wrapper */
  as?: keyof JSX.IntrinsicElements;
  /** Override styles */
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 40,
  ease = 'power3.out',
  start = 'top 85%',
  once = true,
  stagger = 0,
  className = '',
  as: Tag = 'div',
  style,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const getFromVars = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      case 'scale': return { opacity: 0, scale: 0.9 };
      case 'fade': return { opacity: 0 };
      default: return { opacity: 0, y: distance };
    }
  };

  const getToVars = () => {
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 };
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'scale': return { opacity: 1, scale: 1 };
      case 'fade': return { opacity: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  useGSAPContext(
    (gsap) => {
      const el = elementRef.current;
      if (!el) return;

      const targets = stagger > 0 ? el.children : el;

      gsap.fromTo(
        targets,
        getFromVars(),
        {
          ...getToVars(),
          duration,
          delay,
          ease,
          stagger: stagger > 0 ? { amount: stagger, from: 'start' } : undefined,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    },
    { scope: elementRef as React.RefObject<HTMLElement>, deps: [direction, duration, delay, distance] }
  );

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={elementRef}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
