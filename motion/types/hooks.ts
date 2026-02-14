/**
 * Hook Interface Types
 * Type definitions for animation hooks
 */

import { RefObject } from 'react'
import { IntroState, RevealVariant, StaggerConfig } from './animations'

// Intro Animation Hook
export interface IntroAnimationOptions {
  autoStart?: boolean
  allowSkip?: boolean
  skipDelay?: number
  persistSkip?: boolean
  duration?: number
  onStart?: () => void
  onComplete?: () => void
  onSkip?: () => void
  debug?: boolean
}

export interface IntroAnimationReturn {
  state: IntroState
  progress: number
  isComplete: boolean
  start: () => void
  skip: () => void
  pause: () => void
  resume: () => void
  loaderRef: RefObject<HTMLDivElement> | null
  heroRef: RefObject<HTMLDivElement> | null
}

// Reveal Animation Hook
export interface RevealOptions {
  ref: RefObject<HTMLElement>
  variant?: RevealVariant
  trigger?: RefObject<HTMLElement> | string
  start?: string
  end?: string
  scrub?: boolean
  once?: boolean
  duration?: number
  delay?: number
  ease?: string
  stagger?: number | StaggerConfig
  onEnter?: () => void
  onLeave?: () => void
  enabled?: boolean
}

export interface RevealReturn {
  progress: number
  isActive: boolean
  replay: () => void
}

// Parallax Hook
export interface ParallaxOptions {
  ref: RefObject<HTMLElement>
  y?: number | [number, number]
  x?: number | [number, number]
  scale?: number | [number, number]
  rotation?: number | [number, number]
  opacity?: number | [number, number]
  trigger?: RefObject<HTMLElement>
  start?: string
  end?: string
  scrub?: number | boolean
  ease?: string
  enabled?: boolean
}

export interface ParallaxReturn {
  progress: number
}

// Section Timeline Hook
export interface TimelineStep {
  target: string
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  position?: string
  label?: string
}

export interface SectionTimelineOptions {
  ref: RefObject<HTMLElement>
  sectionId: string
  steps: TimelineStep[]
  repeat?: number
  yoyo?: boolean
  paused?: boolean
  scrollTrigger?: {
    trigger?: RefObject<HTMLElement> | string
    start?: string
    end?: string
    scrub?: boolean | number
    pin?: boolean
    pinSpacing?: boolean
    anticipatePin?: number
    snap?: number | number[] | { snapTo: number; duration?: number }
    toggleActions?: string
  }
  onStart?: () => void
  onComplete?: () => void
  onUpdate?: (progress: number) => void
  onReverseComplete?: () => void
  enabled?: boolean
}

export interface SectionTimelineReturn {
  timeline: gsap.core.Timeline | null
  progress: number
  isActive: boolean
  play: () => void
  pause: () => void
  restart: () => void
  reverse: () => void
  seek: (position: number | string) => void
}
