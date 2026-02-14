/**
 * Motion System
 * Main entry point for animation system
 */

// Hooks
export * from './hooks'

// Types
export * from './types/animations'
export * from './types/hooks'
export * from './types/config'

// Utilities
export { initGSAP, getGSAP, getScrollTrigger, isGSAPInitialized } from './utils/gsapConfig'
export { scrollManager } from './utils/scrollManager'
export { cleanupAllAnimations, resetAllAnimations } from './utils/cleanup'
export { 
  getAnimationLevel, 
  prefersReducedMotion, 
  isMobile,
  frameMonitor 
} from './utils/performance'
export { isSSR, isClient } from './utils/ssrGuard'
