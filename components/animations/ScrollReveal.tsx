'use client';

import { useEffect, useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

/**
 * ScrollReveal — всегда показывает контент с лёгким fadeIn через CSS.
 * Без IntersectionObserver: после delay применяется плавное появление.
 */
export function ScrollReveal({ children, delay = 0, className, style }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
