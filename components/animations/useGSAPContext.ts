'use client';

/**
 * useGSAPContext - GSAP context hook with automatic cleanup
 * Ensures all GSAP animations are properly scoped and cleaned up
 */

import { useRef, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from '@/motion/utils/ssrGuard';
import { getGSAP, getScrollTrigger } from '@/motion/utils/gsapConfig';
import { getAnimationLevel } from '@/motion/utils/performance';
import { AnimationLevel } from '@/motion/types/animations';
import type { gsap as GSAPType } from 'gsap';

interface UseGSAPContextOptions {
  /** Dependencies array - re-run setup when these change */
  deps?: unknown[];
  /** Scope selector for GSAP context */
  scope?: React.RefObject<HTMLElement | null>;
  /** Whether to skip animations entirely */
  disabled?: boolean;
}

interface GSAPContextReturn {
  /** Ref to attach to the container element */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Current animation level */
  animationLevel: AnimationLevel;
  /** Whether animations are fully enabled */
  isFullAnimations: boolean;
  /** Whether animations are reduced */
  isReduced: boolean;
  /** Whether animations are completely disabled */
  isDisabled: boolean;
}

export function useGSAPContext(
  setup: (gsap: typeof GSAPType, container: HTMLElement) => void | (() => void),
  options: UseGSAPContextOptions = {}
): GSAPContextReturn {
  const { deps = [], scope, disabled = false } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<ReturnType<typeof GSAPType.context> | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const animationLevel = typeof window !== 'undefined' ? getAnimationLevel() : AnimationLevel.FULL;

  useIsomorphicLayoutEffect(() => {
    if (disabled || animationLevel === AnimationLevel.NONE) return;

    const gsapInstance = getGSAP();
    if (!gsapInstance) return;

    const container = scope?.current || containerRef.current;
    if (!container) return;

    // Create scoped GSAP context
    const ctx = gsapInstance.context(() => {
      const userCleanup = setup(gsapInstance, container);
      if (typeof userCleanup === 'function') {
        cleanupRef.current = userCleanup;
      }
    }, container);

    contextRef.current = ctx;

    // Cleanup on unmount or dependency change
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      ctx.revert();
      contextRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, animationLevel, ...deps]);

  return {
    containerRef,
    animationLevel,
    isFullAnimations: animationLevel === AnimationLevel.FULL,
    isReduced: animationLevel === AnimationLevel.REDUCED,
    isDisabled: animationLevel === AnimationLevel.NONE || disabled,
  };
}

/**
 * Hook to get ScrollTrigger refresh function
 * Useful when content changes and ScrollTrigger needs recalculation
 */
export function useScrollTriggerRefresh() {
  return useCallback(() => {
    const ST = getScrollTrigger();
    if (ST) {
      ST.refresh();
    }
  }, []);
}
