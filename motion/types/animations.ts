/**
 * Animation Types & Enums
 * Type definitions for the animation system
 */

export enum AnimationLevel {
  FULL = 'full',       // All animations enabled
  REDUCED = 'reduced', // Simple fades only
  NONE = 'none'        // No animations
}

export enum IntroState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  TRANSITIONING = 'TRANSITIONING',
  ANIMATING = 'ANIMATING',
  COMPLETE = 'COMPLETE',
  SKIPPED = 'SKIPPED'
}

export type RevealVariant = 
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'
  | 'scale'
  | 'clip'

export interface StaggerConfig {
  amount?: number
  from?: 'start' | 'center' | 'end' | 'edges' | number
  grid?: [number, number]
  axis?: 'x' | 'y'
  ease?: string
}

export interface PerformanceMetrics {
  fps: number
  avgFrameTime: number
  isThrottling: boolean
}

export interface DeviceCapabilities {
  memory?: number
  cores?: number
  effectiveType?: string
  saveData?: boolean
}
