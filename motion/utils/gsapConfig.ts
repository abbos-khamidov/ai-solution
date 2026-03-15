/**
 * GSAP Configuration & Initialization
 * Centralized GSAP setup with SSR safety
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isClient } from './ssrGuard'

// Track initialization
let isInitialized = false

/**
 * Initialize and configure GSAP
 * Safe to call multiple times - only initializes once
 */
export const initGSAP = (): typeof gsap | null => {
  // SSR guard
  if (!isClient()) {
    return null
  }
  
  // Already initialized
  if (isInitialized) {
    return gsap
  }
  
  try {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger)
    
    // Set global GSAP defaults
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.3,
      force3D: true,           // Force GPU acceleration
      overwrite: 'auto'        // Prevent animation conflicts
    })
    
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      markers: process.env.NODE_ENV === 'development' ? false : false // Enable in debug mode if needed
    })
    
    // ScrollTrigger performance config
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      limitCallbacks: true  // Throttle callbacks for performance
    })
    
    isInitialized = true
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ GSAP initialized with ScrollTrigger')
    }
    
    return gsap
  } catch (error) {
    console.error('❌ GSAP initialization failed:', error)
    return null
  }
}

/**
 * Get configured GSAP instance
 * Initializes if needed
 */
export const getGSAP = (): typeof gsap | null => {
  if (!isClient()) return null
  
  if (!isInitialized) {
    return initGSAP()
  }
  
  return gsap
}

/**
 * Get ScrollTrigger instance
 */
export const getScrollTrigger = (): typeof ScrollTrigger | null => {
  if (!isClient()) return null
  
  if (!isInitialized) {
    initGSAP()
  }
  
  return ScrollTrigger
}

/**
 * Check if GSAP is initialized
 */
export const isGSAPInitialized = (): boolean => {
  return isInitialized && isClient()
}

// Export configured instances
export { gsap, ScrollTrigger }

// Guard: do not auto-init on import — wait for explicit getGSAP() call
if (typeof window !== 'undefined' && document.readyState === 'complete') {
  // Page already loaded — safe to init
  initGSAP();
} else if (typeof window !== 'undefined') {
  window.addEventListener('load', () => initGSAP(), { once: true });
}
