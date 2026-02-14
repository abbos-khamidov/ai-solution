/**
 * Animation Cleanup Utilities
 * Memory management and cleanup helpers
 */

import { getGSAP, getScrollTrigger } from './gsapConfig'
import { scrollManager } from './scrollManager'
import { isClient } from './ssrGuard'

/**
 * Kill all GSAP animations globally
 */
export const killAllAnimations = (): void => {
  if (!isClient()) return
  
  const gsapInstance = getGSAP()
  
  if (gsapInstance) {
    gsapInstance.killTweensOf('*')
    
    if (process.env.NODE_ENV === 'development') {
      console.log('💀 All GSAP animations killed')
    }
  }
}

/**
 * Kill all ScrollTriggers globally
 */
export const killAllScrollTriggers = (): void => {
  if (!isClient()) return
  
  const ST = getScrollTrigger()
  
  if (ST) {
    ST.getAll().forEach(trigger => trigger.kill())
    
    if (process.env.NODE_ENV === 'development') {
      console.log('💀 All ScrollTriggers killed')
    }
  }
}

/**
 * Complete cleanup of all animations and ScrollTriggers
 * Call this on route changes or full resets
 */
export const cleanupAllAnimations = (): void => {
  if (!isClient()) return
  
  // 1. Kill all GSAP animations
  killAllAnimations()
  
  // 2. Kill all ScrollTriggers via ScrollTrigger API
  killAllScrollTriggers()
  
  // 3. Clear scroll manager registry
  scrollManager.killAll()
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🧹 Complete animation cleanup finished')
  }
}

/**
 * Reset scroll position to top
 */
export const resetScroll = (): void => {
  if (!isClient()) return
  
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant' as ScrollBehavior
  })
}

/**
 * Cleanup and reset everything
 * Nuclear option for complete state reset
 */
export const resetAllAnimations = (): void => {
  cleanupAllAnimations()
  resetScroll()
  
  if (process.env.NODE_ENV === 'development') {
    console.log('🔄 Complete animation reset finished')
  }
}
