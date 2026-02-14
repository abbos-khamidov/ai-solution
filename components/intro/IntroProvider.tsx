'use client';

import React, { useState, useEffect } from 'react';
import { IntroOverlay } from './IntroOverlay';
import { prefersReducedMotion, isSlowConnection } from '@/motion/utils/performance';
import { isClient } from '@/motion/utils/ssrGuard';

const INTRO_STORAGE_KEY = 'intro_completed';
const INTRO_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Check if user has seen intro recently
 */
function hasSeenIntro(): boolean {
  if (!isClient()) return false;

  try {
    const stored = localStorage.getItem(INTRO_STORAGE_KEY);
    if (!stored) return false;

    const { timestamp } = JSON.parse(stored);
    const now = Date.now();

    return now - timestamp < INTRO_EXPIRY;
  } catch {
    return false;
  }
}

/**
 * Save intro completion
 */
function saveIntroCompletion(): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(
      INTRO_STORAGE_KEY,
      JSON.stringify({ timestamp: Date.now() })
    );
  } catch {
    // Ignore storage errors
  }
}

/**
 * Determine if intro should be shown
 */
function shouldShowIntro(): boolean {
  if (!isClient()) return false;

  // Skip for reduced motion users
  if (prefersReducedMotion()) return false;

  // Skip for slow connections
  if (isSlowConnection()) return false;

  // Skip for return visitors (within 24 hours)
  if (hasSeenIntro()) return false;

  return true;
}

interface IntroProviderProps {
  children: React.ReactNode;
}

export function IntroProvider({ children }: IntroProviderProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if intro should be shown on mount
  useEffect(() => {
    setMounted(true);
    setShowIntro(shouldShowIntro());
  }, []);

  // Handle intro completion
  const handleIntroComplete = () => {
    setShowIntro(false);
    saveIntroCompletion();
  };

  // Don't render anything until mounted (SSR safety)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      {children}
    </>
  );
}
