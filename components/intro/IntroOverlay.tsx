'use client';

import React, { useRef, useEffect } from 'react';
import { useIntroAnimation } from '@/motion/hooks';
import { getGSAP } from '@/motion/utils/gsapConfig';
import { 
  logoAnimation, 
  positioningLineAnimation, 
  structuralLinesAnimation,
  skipButtonAnimation,
  overlayExitAnimation 
} from '@/motion/animations/intro/overlayTimeline';

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  const { state, skip, isComplete } = useIntroAnimation({
    duration: 3000,
    autoStart: true,
    allowSkip: true,
    persistSkip: true,
    onComplete,
    onSkip: onComplete
  });

  // Custom animation timeline for intro elements
  useEffect(() => {
    const gsapInstance = getGSAP();
    if (!gsapInstance || !overlayRef.current) return;

    const tl = gsapInstance.timeline();

    // Phase 1: Entrance (0-500ms)
    if (logoRef.current) {
      tl.fromTo(logoRef.current, logoAnimation.entrance.from, logoAnimation.entrance.to, 0);
    }

    if (positioningRef.current) {
      tl.fromTo(
        positioningRef.current,
        positioningLineAnimation.entrance.from,
        positioningLineAnimation.entrance.to,
        0.1
      );
    }

    if (linesRef.current) {
      const lines = linesRef.current.querySelectorAll('.structural-line');
      tl.fromTo(
        lines,
        structuralLinesAnimation.entrance.from,
        structuralLinesAnimation.entrance.to,
        0.2
      );
    }

    if (skipRef.current) {
      tl.fromTo(skipRef.current, skipButtonAnimation.entrance.from, skipButtonAnimation.entrance.to, 0.3);
    }

    // Phase 2: Hold (500-2500ms) - elements stay visible

    // Phase 3: Exit (2500-3000ms)
    tl.to([logoRef.current, positioningRef.current], logoAnimation.exit.to, 2.5);
    tl.to(linesRef.current?.querySelectorAll('.structural-line') || [], structuralLinesAnimation.exit.to, 2.5);
    tl.to(overlayRef.current, overlayExitAnimation.to, 2.5);

    return () => {
      tl.kill();
    };
  }, []);

  // Skip on any click or key press
  useEffect(() => {
    const handleSkip = () => {
      if (!isComplete) {
        skip();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      handleSkip();
    };

    const handleClick = (e: MouseEvent) => {
      // Only skip on overlay click, not propagated clicks
      if (e.target === overlayRef.current || (e.target as HTMLElement).closest('.intro-overlay-content')) {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    overlayRef.current?.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      overlayRef.current?.removeEventListener('click', handleClick);
    };
  }, [isComplete, skip]);

  // Lock scroll during intro
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isComplete]);

  if (state === 'COMPLETE' || state === 'SKIPPED') {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="intro-overlay-content fixed inset-0 z-50 flex items-center justify-center mesh-gradient cursor-pointer"
      aria-label="Brand introduction"
      role="dialog"
      aria-modal="false"
    >
      {/* Background grid (reused from Hero) */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo/Wordmark */}
        <div ref={logoRef} className="mb-3">
          <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight">
            Adams AI
          </h1>
        </div>

        {/* Positioning line - engineering maturity */}
        <p
          ref={positioningRef}
          className="text-sm md:text-base text-gray-400 font-light tracking-wide uppercase mb-8"
        >
          Engineering Sales Infrastructure
        </p>

        {/* Structural lines - subtle assembly effect */}
        <div ref={linesRef} className="flex flex-col items-center gap-2">
          <div className="structural-line w-32 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent origin-left" />
          <div className="structural-line w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B829FF] to-transparent origin-left" />
          <div className="structural-line w-32 h-[1px] bg-gradient-to-r from-transparent via-[#00FFB8] to-transparent origin-left" />
        </div>
      </div>

      {/* Skip button (corner) */}
      <button
        ref={skipRef}
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
        className="absolute top-6 right-6 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 uppercase tracking-wider"
        aria-label="Skip introduction"
      >
        Skip intro
      </button>
    </div>
  );
}
