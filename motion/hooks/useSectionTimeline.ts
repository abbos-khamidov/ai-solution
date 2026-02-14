/**
 * useSectionTimeline Hook
 * Complex multi-part section animations
 * 
 * CONSTRAINT: Only transform and opacity allowed
 * CONSTRAINT: Must not affect layout flow
 */

import { useRef, useState, useCallback } from 'react'
import { SectionTimelineOptions, SectionTimelineReturn } from '../types/hooks'
import { useIsomorphicLayoutEffect } from '../utils/ssrGuard'
import { getGSAP, getScrollTrigger } from '../utils/gsapConfig'
import { scrollManager } from '../utils/scrollManager'
import { getAnimationLevel } from '../utils/performance'
import { AnimationLevel } from '../types/animations'

export function useSectionTimeline(
  options: SectionTimelineOptions
): SectionTimelineReturn {
  const {
    ref,
    sectionId,
    steps,
    repeat = 0,
    yoyo = false,
    paused = false,
    scrollTrigger: scrollTriggerConfig,
    onStart,
    onComplete,
    onUpdate,
    onReverseComplete,
    enabled = true
  } = options

  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTriggerIdRef = useRef<string>(`section-${sectionId}`)

  /**
   * Manual controls
   */
  const play = useCallback(() => {
    const tl = timelineRef.current
    if (tl) tl.play()
  }, [])

  const pause = useCallback(() => {
    const tl = timelineRef.current
    if (tl) tl.pause()
  }, [])

  const restart = useCallback(() => {
    const tl = timelineRef.current
    if (tl) tl.restart()
  }, [])

  const reverse = useCallback(() => {
    const tl = timelineRef.current
    if (tl) tl.reverse()
  }, [])

  const seek = useCallback((position: number | string) => {
    const tl = timelineRef.current
    if (tl) {
      if (typeof position === 'number') {
        tl.progress(position)
      } else {
        tl.seek(position)
      }
    }
  }, [])

  /**
   * Setup effect
   */
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !ref.current || steps.length === 0) return
    
    const gsapInstance = getGSAP()
    const ST = getScrollTrigger()
    
    if (!gsapInstance) return
    
    // Check animation level
    const animLevel = getAnimationLevel()
    if (animLevel === AnimationLevel.NONE) {
      // Show final state immediately
      return
    }
    
    const element = ref.current
    const triggerId = scrollTriggerIdRef.current
    
    // PLACEHOLDER: Create timeline from steps
    const tl = gsapInstance.timeline({
      paused,
      repeat,
      yoyo,
      onStart: () => {
        setIsActive(true)
        onStart?.()
      },
      onUpdate: function() {
        const prog = this.progress()
        setProgress(prog)
        onUpdate?.(prog)
      },
      onComplete: () => {
        setIsActive(false)
        onComplete?.()
      },
      onReverseComplete: () => {
        onReverseComplete?.()
      }
    })
    
    // PLACEHOLDER: Add steps to timeline
    // Will be implemented in later phase
    steps.forEach((step) => {
      // For now, just add dummy tweens to maintain structure
      tl.to({}, { duration: 0.1 }, step.position || '+=0')
    })
    
    timelineRef.current = tl
    
    // Attach ScrollTrigger if configured
    if (scrollTriggerConfig && ST) {
      const scrollTrigger = ST.create({
        trigger: scrollTriggerConfig.trigger 
          ? (typeof scrollTriggerConfig.trigger === 'string' 
              ? scrollTriggerConfig.trigger 
              : scrollTriggerConfig.trigger.current)
          : element,
        start: scrollTriggerConfig.start || 'top 80%',
        end: scrollTriggerConfig.end || 'bottom 20%',
        scrub: scrollTriggerConfig.scrub,
        pin: scrollTriggerConfig.pin,
        pinSpacing: scrollTriggerConfig.pinSpacing,
        anticipatePin: scrollTriggerConfig.anticipatePin,
        snap: scrollTriggerConfig.snap,
        toggleActions: scrollTriggerConfig.toggleActions,
        animation: tl,
        onEnter: () => setIsActive(true),
        onLeave: () => setIsActive(false)
      })
      
      // Register to scroll manager
      scrollManager.register(triggerId, scrollTrigger, sectionId)
    }
    
    // Cleanup
    return () => {
      tl.kill()
      timelineRef.current = null
      scrollManager.unregister(triggerId)
    }
  }, [
    ref,
    sectionId,
    steps,
    repeat,
    yoyo,
    paused,
    scrollTriggerConfig,
    enabled,
    onStart,
    onComplete,
    onUpdate,
    onReverseComplete
  ])

  return {
    timeline: timelineRef.current,
    progress,
    isActive,
    play,
    pause,
    restart,
    reverse,
    seek
  }
}
