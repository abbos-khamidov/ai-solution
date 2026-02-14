/**
 * Configuration Types
 * Type definitions for animation configuration
 */

export interface FrameBudget {
  ideal: number
  acceptable: number
  minimum: number
}

export interface AnimationBudget {
  maxSimultaneous: number
  maxScrollTriggers: number
  maxTimelineNesting: number
  scrollCalculation: number
  tweenUpdate: number
  domUpdate: number
  buffer: number
}

export interface MobileAnimationConfig {
  disableParallax: boolean
  disablePin: boolean
  disableComplexTimelines: boolean
  maxDuration: number
  disableStagger: boolean
  reduceScrub: boolean
  mergeScrollTriggers: boolean
}

export const FRAME_BUDGET: FrameBudget = {
  ideal: 16.67,      // 60fps
  acceptable: 33.33, // 30fps
  minimum: 50        // 20fps
}

export const ANIMATION_BUDGET: AnimationBudget = {
  maxSimultaneous: 5,
  maxScrollTriggers: 20,
  maxTimelineNesting: 3,
  scrollCalculation: 2,
  tweenUpdate: 8,
  domUpdate: 4,
  buffer: 2.67
}

export const MOBILE_ANIMATION_CONFIG: MobileAnimationConfig = {
  disableParallax: true,
  disablePin: true,
  disableComplexTimelines: true,
  maxDuration: 0.6,
  disableStagger: true,
  reduceScrub: true,
  mergeScrollTriggers: true
}

// Constraint: Intro max 3-5 seconds
export const INTRO_CONFIG = {
  MAX_DURATION: 5000,        // 5s max
  MIN_DURATION: 3000,        // 3s min
  CORE_TEXT_DELAY: 1500,     // Core text must appear within 1.5s
  SKIP_DELAY: 2000,          // Show skip button after 2s
  PARALLAX_MAX_MOVEMENT: 50  // Max 50px for subtle depth effect
} as const
