'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = innerRef.current;
    if (!cursor || !inner) return;

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(cursor, {
        x: x - 20,
        y: y - 20,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(inner, {
        x: x - 8,
        y: y - 8,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleLinkHover = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);

    // Track mouse movement
    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[99999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ mixBlendMode: 'difference' }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? 'border-[#00D4FF] scale-150'
              : 'border-[#D4A853]'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 83, 0.1) 0%, transparent 70%)',
          }}
        >
          {/* Neuron visualization */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Central node */}
            <div
              className={`absolute w-2 h-2 rounded-full transition-all duration-300 ${
                isHovering ? 'bg-[#00D4FF] scale-150' : 'bg-[#D4A853]'
              }`}
            />
            
            {/* Neuron connections */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className={`absolute top-1/2 left-1/2 w-px h-3 -translate-x-1/2 -translate-y-1/2 origin-bottom transition-all duration-300 ${
                    isHovering ? 'bg-[#00D4FF]' : 'bg-[#D4A853]'
                  }`}
                  style={{ opacity: 0.6 }}
                />
                <div
                  className={`absolute top-[10px] left-1/2 w-1 h-1 rounded-full -translate-x-1/2 transition-all duration-300 ${
                    isHovering ? 'bg-[#00D4FF]' : 'bg-[#D4A853]'
                  }`}
                  style={{ opacity: 0.8 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className={`fixed top-0 left-0 w-4 h-4 pointer-events-none z-[99999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isHovering
              ? 'bg-[#00D4FF] scale-0'
              : 'bg-[#D4A853]'
          }`}
          style={{
            boxShadow: isHovering
              ? '0 0 20px rgba(0, 212, 255, 0.6)'
              : '0 0 10px rgba(212, 168, 83, 0.4)',
          }}
        />
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
