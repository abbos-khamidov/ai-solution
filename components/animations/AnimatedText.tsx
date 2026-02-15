'use client';

/**
 * AnimatedText - Split text word-by-word or character reveal animations
 * Uses GSAP for 3D text reveals with Y-axis rotation
 */

import React, { useRef, useMemo } from 'react';
import { useGSAPContext } from './useGSAPContext';

type AnimationType = 'words' | 'chars' | 'lines';
type RevealStyle = 'fade-up' | 'rotate-y' | 'slide-up' | 'blur-in' | 'scale';

interface AnimatedTextProps {
  /** Text content to animate */
  text: string;
  /** How to split the text */
  splitBy?: AnimationType;
  /** Animation style */
  reveal?: RevealStyle;
  /** Duration per element in seconds */
  duration?: number;
  /** Stagger delay between elements */
  stagger?: number;
  /** Overall delay */
  delay?: number;
  /** GSAP ease */
  ease?: string;
  /** Whether triggered by scroll */
  scrollTrigger?: boolean;
  /** ScrollTrigger start */
  start?: string;
  /** Tag for the container */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** Additional className */
  className?: string;
  /** Whether to add gradient to text */
  gradient?: boolean;
}

export function AnimatedText({
  text,
  splitBy = 'words',
  reveal = 'fade-up',
  duration = 0.8,
  stagger = 0.05,
  delay = 0,
  ease = 'power3.out',
  scrollTrigger = false,
  start = 'top 80%',
  as: Tag = 'div',
  className = '',
  gradient = false,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const elements = useMemo(() => {
    if (splitBy === 'words') {
      return text.split(' ').map((word, i) => ({
        key: `${word}-${i}`,
        content: word,
        isSpace: false,
      }));
    }
    if (splitBy === 'chars') {
      return text.split('').map((char, i) => ({
        key: `${char}-${i}`,
        content: char === ' ' ? '\u00A0' : char,
        isSpace: char === ' ',
      }));
    }
    // Lines - split by newline
    return text.split('\n').map((line, i) => ({
      key: `line-${i}`,
      content: line,
      isSpace: false,
    }));
  }, [text, splitBy]);

  const getFromVars = () => {
    switch (reveal) {
      case 'fade-up':
        return { opacity: 0, y: 30, rotateX: 10 };
      case 'rotate-y':
        return { opacity: 0, rotateY: 90, transformOrigin: 'left center' };
      case 'slide-up':
        return { opacity: 0, y: '100%' };
      case 'blur-in':
        return { opacity: 0, filter: 'blur(10px)', y: 10 };
      case 'scale':
        return { opacity: 0, scale: 0.5 };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  const getToVars = () => {
    switch (reveal) {
      case 'fade-up':
        return { opacity: 1, y: 0, rotateX: 0 };
      case 'rotate-y':
        return { opacity: 1, rotateY: 0 };
      case 'slide-up':
        return { opacity: 1, y: '0%' };
      case 'blur-in':
        return { opacity: 1, filter: 'blur(0px)', y: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  useGSAPContext(
    (gsap) => {
      const container = containerRef.current;
      if (!container) return;

      const targets = container.querySelectorAll('.animated-text-element');
      if (!targets.length) return;

      const animConfig: Record<string, unknown> = {
        ...getToVars(),
        duration,
        stagger,
        delay,
        ease,
      };

      if (scrollTrigger) {
        animConfig.scrollTrigger = {
          trigger: container,
          start,
          toggleActions: 'play none none none',
        };
      }

      gsap.fromTo(targets, getFromVars(), animConfig);
    },
    { scope: containerRef as React.RefObject<HTMLElement>, deps: [text, reveal, duration, stagger, delay] }
  );

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={containerRef}
      className={`animated-text ${gradient ? 'text-gradient' : ''} ${className}`}
      style={{ perspective: reveal === 'rotate-y' ? '600px' : undefined }}
      aria-label={text}
    >
      {elements.map((el) => (
        <span
          key={el.key}
          className="animated-text-element inline-block will-change-transform"
          style={{
            display: 'inline-block',
            transformStyle: reveal === 'rotate-y' ? 'preserve-3d' : undefined,
          }}
          aria-hidden="true"
        >
          {el.content}
          {splitBy === 'words' && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}
