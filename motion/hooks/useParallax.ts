/**
 * useParallax Hook
 * Parallax scroll effects
 * 
 * CONSTRAINT: Subtle depth effect only (max 50px movement)
 * CONSTRAINT: Only transform allowed
 * CONSTRAINT: Auto-disabled on mobile
 */

import { useRef, useState } from 'react'
import { ParallaxOptions, ParallaxReturn } from '../types/hooks'
import { useIsomorphicLayoutEffect } from '../utils/ssrGuard'
import { getGSAP, getScrollTrigger } from '../utils/gsapConfig'
import { scrollManager } from '../utils/scrollManager'
import { getAnimationLevel, isMobile } from '../utils/performance'
import { AnimationLevel } from '../types/animations'
import { INTRO_CONFIG, MOBILE_ANIMATION_CONFIG } from '../types/config'

export function useParallax(
  options: ParallaxOptions
): ParallaxReturn {
  const {
    ref,
    y = [0, -50], // CONSTRAINT: Max 50px for subtle effect
    x = 0,
    scale = 1,
    rotation = 0,
    opacity = 1,
    trigger,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    ease = 'none',
    enabled = true
  } = options

  const [progress, setProgress] = useState(0)
  const scrollTriggerIdRef = useRef<string>(`parallax-${Math.random().toString(36).substr(2, 9)}`)

  /**
   * Setup effect
   */
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !ref.current) return
    
    // CONSTRAINT: Disable on mobile automatically
    if (isMobile() || MOBILE_ANIMATION_CONFIG.disableParallax) {
      return
    }
    
    const gsapInstance = getGSAP()
    const ST = getScrollTrigger()
    
    if (!gsapInstance || !ST) return
    
    // Check animation level
    const animLevel = getAnimationLevel()
    if (animLevel === AnimationLevel.NONE || animLevel === AnimationLevel.REDUCED) {
      // No parallax on reduced motion
      return
    }
    
    const element = ref.current
    const triggerId = scrollTriggerIdRef.current
    
    // CONSTRAINT: Enforce max movement for subtle effect
    const normalizeValue = (val: number | [number, number]): [number, number] => {
      if (typeof val === 'number') {
        return [0, Math.max(-INTRO_CONFIG.PARALLAX_MAX_MOVEMENT, Math.min(val, INTRO_CONFIG.PARALLAX_MAX_MOVEMENT))]
      }
      return [
        Math.max(-INTRO_CONFIG.PARALLAX_MAX_MOVEMENT, Math.min(val[0], INTRO_CONFIG.PARALLAX_MAX_MOVEMENT)),
        Math.max(-INTRO_CONFIG.PARALLAX_MAX_MOVEMENT, Math.min(val[1], INTRO_CONFIG.PARALLAX_MAX_MOVEMENT))
      ]
    }
    
    // PLACEHOLDER: Create parallax animation
    // For now, just set up the ScrollTrigger structure
    
    const scrollTrigger = ST.create({
      trigger: trigger ? trigger.current : element,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        setProgress(self.progress)
        
        // PLACEHOLDER: Actual transform animation will be added in later phase
        // This is just the progress tracking
      }
    })
    
    // Register to scroll manager
    scrollManager.register(triggerId, scrollTrigger)
    
    // Cleanup
    return () => {
      scrollManager.unregister(triggerId)
    }
  }, [ref, y, x, scale, rotation, opacity, trigger, start, end, scrub, ease, enabled])

  return {
    progress
  }
}
