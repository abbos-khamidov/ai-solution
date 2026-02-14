/**
 * useRevealAnimation Hook
 * Simple scroll-triggered reveal animations
 * 
 * CONSTRAINT: Only transform and opacity allowed
 * CONSTRAINT: Must not affect layout flow
 */

import { useRef, useState, useCallback } from 'react'
import { RevealOptions, RevealReturn } from '../types/hooks'
import { useIsomorphicLayoutEffect } from '../utils/ssrGuard'
import { getGSAP, getScrollTrigger } from '../utils/gsapConfig'
import { scrollManager } from '../utils/scrollManager'
import { getAnimationLevel } from '../utils/performance'
import { AnimationLevel } from '../types/animations'

export function useRevealAnimation(
  options: RevealOptions
): RevealReturn {
  const {
    ref,
    variant = 'fade-up',
    trigger,
    start = 'top 80%',
    end = 'top 20%',
    scrub = false,
    once = true,
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    stagger,
    onEnter,
    onLeave,
    enabled = true
  } = options

  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const scrollTriggerIdRef = useRef<string>(`reveal-${Math.random().toString(36).substr(2, 9)}`)

  /**
   * Replay animation manually
   */
  const replay = useCallback(() => {
    const gsapInstance = getGSAP()
    if (!gsapInstance || !ref.current) return
    
    // PLACEHOLDER: Replay logic
    // Will animate based on variant in later phase
  }, [ref, variant])

  /**
   * Get animation properties based on variant
   */
  const getVariantProps = (variant: string) => {
    switch (variant) {
      case 'fade-up':
        return { from: { opacity: 0, y: 16 }, to: { opacity: 1, y: 0 } }
      case 'fade-down':
        return { from: { opacity: 0, y: -16 }, to: { opacity: 1, y: 0 } }
      case 'fade-left':
        return { from: { opacity: 0, x: 16 }, to: { opacity: 1, x: 0 } }
      case 'fade-right':
        return { from: { opacity: 0, x: -16 }, to: { opacity: 1, x: 0 } }
      case 'fade':
        return { from: { opacity: 0 }, to: { opacity: 1 } }
      case 'scale':
        return { from: { opacity: 0, scale: 0.95 }, to: { opacity: 1, scale: 1 } }
      case 'clip':
        return { from: { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, to: { opacity: 1, clipPath: 'inset(0 0% 0 0)' } }
      default:
        return { from: { opacity: 0, y: 16 }, to: { opacity: 1, y: 0 } }
    }
  }

  /**
   * Setup effect
   */
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !ref.current) return
    
    const gsapInstance = getGSAP()
    if (!gsapInstance) return
    
    // Check animation level
    const animLevel = getAnimationLevel()
    if (animLevel === AnimationLevel.NONE) {
      // Show final state immediately
      gsapInstance.set(ref.current, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }
    
    const element = ref.current
    const variantProps = getVariantProps(variant)
    
    // For on-mount animations (no ScrollTrigger), just animate immediately
    if (!trigger && once) {
      // Simple entrance animation on mount
      const tween = gsapInstance.fromTo(
        element,
        variantProps.from,
        {
          ...variantProps.to,
          duration: animLevel === AnimationLevel.REDUCED ? duration * 0.5 : duration,
          delay,
          ease,
          onComplete: () => {
            setProgress(1)
            setIsActive(false)
          }
        }
      )
      
      setIsActive(true)
      
      return () => {
        tween.kill()
      }
    }
    
    // For scroll-triggered animations, use ScrollTrigger
    const ST = getScrollTrigger()
    if (!ST) return
    
    const triggerId = scrollTriggerIdRef.current
    
    // Create animation with ScrollTrigger
    const animation = gsapInstance.fromTo(
      element,
      variantProps.from,
      {
        ...variantProps.to,
        duration: animLevel === AnimationLevel.REDUCED ? duration * 0.5 : duration,
        ease,
        paused: true
      }
    )
    
    const scrollTrigger = ST.create({
      trigger: trigger ? (typeof trigger === 'string' ? trigger : trigger.current) : element,
      start,
      end,
      once,
      animation: scrub ? animation : undefined,
      scrub: scrub || false,
      onEnter: () => {
        setIsActive(true)
        if (!scrub) {
          animation.play()
        }
        onEnter?.()
      },
      onLeave: () => {
        if (once) {
          setIsActive(false)
        }
        onLeave?.()
      },
      onUpdate: (self) => {
        setProgress(self.progress)
      }
    })
    
    // Register to scroll manager
    scrollManager.register(triggerId, scrollTrigger)
    
    // Cleanup
    return () => {
      animation.kill()
      scrollManager.unregister(triggerId)
    }
  }, [
    ref,
    variant,
    trigger,
    start,
    end,
    scrub,
    once,
    duration,
    delay,
    ease,
    enabled,
    onEnter,
    onLeave
  ])

  return {
    progress,
    isActive,
    replay
  }
}
