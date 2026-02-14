/**
 * useIntroAnimation Hook
 * Orchestrates the master intro timeline
 * 
 * CONSTRAINT: Max duration 3-5 seconds
 * CONSTRAINT: Core text must appear within 1.5s
 * CONSTRAINT: Must be skippable on interaction
 */

import { useRef, useState, useCallback } from 'react'
import { IntroState } from '../types/animations'
import { IntroAnimationOptions, IntroAnimationReturn } from '../types/hooks'
import { INTRO_CONFIG } from '../types/config'
import { useIsomorphicLayoutEffect } from '../utils/ssrGuard'
import { getGSAP } from '../utils/gsapConfig'
import { getAnimationLevel } from '../utils/performance'
import { AnimationLevel } from '../types/animations'

const STORAGE_KEY = 'intro_completed'
const STORAGE_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Check if intro was completed recently
 */
const shouldSkipIntro = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    
    if (!stored) return false
    
    const { timestamp } = JSON.parse(stored)
    const now = Date.now()
    
    return now - timestamp < STORAGE_EXPIRY
  } catch {
    return false
  }
}

/**
 * Save intro completion to localStorage
 */
const saveIntroCompletion = (): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      timestamp: Date.now()
    }))
  } catch {
    // Ignore storage errors
  }
}

export function useIntroAnimation(
  options: IntroAnimationOptions = {}
): IntroAnimationReturn {
  const {
    autoStart = true,
    allowSkip = true,
    skipDelay = INTRO_CONFIG.SKIP_DELAY,
    persistSkip = true,
    duration = 4000, // Default 4s (within 3-5s range)
    onStart,
    onComplete,
    onSkip,
    debug = false
  } = options

  const [state, setState] = useState<IntroState>(IntroState.IDLE)
  const [progress, setProgress] = useState(0)
  
  const loaderRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  /**
   * Create master intro timeline (placeholder)
   */
  const createIntroTimeline = useCallback(() => {
    const gsapInstance = getGSAP()
    if (!gsapInstance) return null
    
    const animLevel = getAnimationLevel()
    
    // Enforce duration constraints
    const safeDuration = Math.max(
      INTRO_CONFIG.MIN_DURATION,
      Math.min(duration, INTRO_CONFIG.MAX_DURATION)
    )
    
    if (debug) {
      console.log(`🎬 Creating intro timeline: ${safeDuration}ms (level: ${animLevel})`)
    }
    
    // PLACEHOLDER: Create timeline structure
    const tl = gsapInstance.timeline({
      paused: !autoStart,
      onStart: () => {
        setState(IntroState.ANIMATING)
        onStart?.()
      },
      onUpdate: function() {
        setProgress(this.progress())
      },
      onComplete: () => {
        setState(IntroState.COMPLETE)
        if (persistSkip) {
          saveIntroCompletion()
        }
        onComplete?.()
      }
    })
    
    // PLACEHOLDER: Timeline steps (no actual animations yet)
    // Will be implemented in later phase
    
    // Phase 1: Loader (0-1.5s) - CONSTRAINT: Core text within 1.5s
    tl.to({}, { duration: 1.5 }, 'loader')
    
    // Phase 2: Transition (1.5-2.5s)
    tl.to({}, { duration: 1 }, 'transition')
    
    // Phase 3: Hero entry (2.5-4s)
    tl.to({}, { duration: 1.5 }, 'hero')
    
    return tl
  }, [autoStart, duration, debug, onStart, onComplete, onSkip, persistSkip])

  /**
   * Start intro animation
   */
  const start = useCallback(() => {
    if (state === IntroState.COMPLETE || state === IntroState.SKIPPED) return
    
    const tl = timelineRef.current
    if (tl && tl.paused()) {
      tl.play()
    }
  }, [state])

  /**
   * Skip intro animation
   */
  const skip = useCallback(() => {
    if (state === IntroState.COMPLETE || state === IntroState.SKIPPED) return
    
    const tl = timelineRef.current
    if (tl) {
      tl.progress(1)
    }
    
    setState(IntroState.SKIPPED)
    setProgress(1)
    
    if (persistSkip) {
      saveIntroCompletion()
    }
    
    onSkip?.()
  }, [state, persistSkip, onSkip])

  /**
   * Pause intro animation
   */
  const pause = useCallback(() => {
    const tl = timelineRef.current
    if (tl) {
      tl.pause()
    }
  }, [])

  /**
   * Resume intro animation
   */
  const resume = useCallback(() => {
    const tl = timelineRef.current
    if (tl && tl.paused()) {
      tl.play()
    }
  }, [])

  /**
   * Setup effect
   */
  useIsomorphicLayoutEffect(() => {
    // Check if should skip based on storage
    if (persistSkip && shouldSkipIntro()) {
      setState(IntroState.COMPLETE)
      setProgress(1)
      return
    }
    
    // Check animation level
    const animLevel = getAnimationLevel()
    if (animLevel === AnimationLevel.NONE) {
      setState(IntroState.COMPLETE)
      setProgress(1)
      return
    }
    
    // Create timeline
    const tl = createIntroTimeline()
    if (!tl) return
    
    timelineRef.current = tl
    
    // Cleanup
    return () => {
      tl.kill()
      timelineRef.current = null
    }
  }, [createIntroTimeline, persistSkip])

  return {
    state,
    progress,
    isComplete: state === IntroState.COMPLETE || state === IntroState.SKIPPED,
    start,
    skip,
    pause,
    resume,
    loaderRef,
    heroRef
  }
}
