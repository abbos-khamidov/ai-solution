/**
 * Performance Detection & Monitoring
 * Device capability detection and frame rate monitoring
 */

import { AnimationLevel } from '../types/animations'
import { FRAME_BUDGET } from '../types/config'
import { isClient, safeWindow } from './ssrGuard'

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (!isClient()) return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Detect if device is mobile
 */
export const isMobile = (): boolean => {
  if (!isClient()) return false
  
  return (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  )
}

/**
 * Detect low-end device based on hardware
 */
export const isLowEndDevice = (): boolean => {
  if (!isClient()) return false
  
  const nav = navigator as any
  const memory = nav.deviceMemory // GB
  const cores = nav.hardwareConcurrency
  
  return (
    (memory && memory < 4) ||   // Less than 4GB RAM
    (cores && cores < 4)         // Less than 4 CPU cores
  )
}

/**
 * Detect slow network connection
 */
export const isSlowConnection = (): boolean => {
  if (!isClient()) return false
  
  const nav = navigator as any
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection
  
  if (!conn) return false
  
  return (
    conn.effectiveType === 'slow-2g' ||
    conn.effectiveType === '2g' ||
    conn.saveData === true
  )
}

/**
 * Detect battery saver mode
 */
export const isBatterySaving = async (): Promise<boolean> => {
  if (!isClient()) return false
  
  const nav = navigator as any
  
  if (!nav.getBattery) return false
  
  try {
    const battery = await nav.getBattery()
    return battery.level < 0.2 && !battery.charging
  } catch {
    return false
  }
}

/**
 * Determine appropriate animation level based on device/preferences
 * CONSTRAINT: Mobile defaults to REDUCED mode automatically
 */
export const getAnimationLevel = (): AnimationLevel => {
  if (!isClient()) return AnimationLevel.NONE
  
  // User preference takes priority
  if (prefersReducedMotion()) {
    return AnimationLevel.NONE
  }
  
  // CONSTRAINT: Mobile defaults to REDUCED
  if (isMobile()) {
    return AnimationLevel.REDUCED
  }
  
  // Low-end device detection
  if (isLowEndDevice()) {
    return AnimationLevel.REDUCED
  }
  
  // Slow connection
  if (isSlowConnection()) {
    return AnimationLevel.REDUCED
  }
  
  return AnimationLevel.FULL
}

/**
 * Frame Rate Monitor
 * Tracks performance and can trigger animation reduction
 */
class FrameRateMonitor {
  private frames: number[] = []
  private isMonitoring = false
  private rafId: number | null = null
  private onThrottle?: () => void

  /**
   * Start monitoring frame rate
   */
  start(onThrottle?: () => void): void {
    if (!isClient() || this.isMonitoring) return
    
    this.onThrottle = onThrottle
    this.isMonitoring = true
    
    let lastTime = performance.now()
    
    const check = () => {
      const now = performance.now()
      const delta = now - lastTime
      
      this.frames.push(delta)
      
      // Keep last 60 frames
      if (this.frames.length > 60) {
        this.frames.shift()
      }
      
      // Check average frame time
      const avgFrameTime = this.frames.reduce((a, b) => a + b, 0) / this.frames.length
      
      if (avgFrameTime > FRAME_BUDGET.acceptable) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`⚠️ Frame rate dropping: ${(1000 / avgFrameTime).toFixed(1)} fps`)
        }
        
        if (this.onThrottle) {
          this.onThrottle()
        }
      }
      
      lastTime = now
      
      if (this.isMonitoring) {
        this.rafId = requestAnimationFrame(check)
      }
    }
    
    this.rafId = requestAnimationFrame(check)
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    this.isMonitoring = false
    
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    
    this.frames = []
  }

  /**
   * Get current average FPS
   */
  getAverageFPS(): number {
    if (this.frames.length === 0) return 60
    
    const avgFrameTime = this.frames.reduce((a, b) => a + b, 0) / this.frames.length
    return Math.round(1000 / avgFrameTime)
  }

  /**
   * Check if currently throttling
   */
  isThrottling(): boolean {
    return this.getAverageFPS() < 30
  }
}

// Singleton instance
export const frameMonitor = new FrameRateMonitor()

// Auto-start in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  frameMonitor.start(() => {
    console.warn('🐌 Performance degradation detected')
  })
}
