/**
 * Intro Overlay Animation Timeline
 * Controlled 3-second brand introduction
 */

export interface IntroTimelineConfig {
  totalDuration: number
  phases: {
    entrance: number
    hold: number
    exit: number
  }
}

/**
 * Main intro timeline configuration
 * Total: 3000ms (3 seconds)
 */
export const introTimelineConfig: IntroTimelineConfig = {
  totalDuration: 3000,
  phases: {
    entrance: 500,    // 0-500ms: Logo & elements fade in
    hold: 2000,       // 500-2500ms: Hold state with structural lines
    exit: 500         // 2500-3000ms: Fade out
  }
}

/**
 * Logo animation config
 */
export const logoAnimation = {
  entrance: {
    from: { opacity: 0, y: 8 },
    to: { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  },
  exit: {
    to: { opacity: 0, duration: 0.4, ease: 'power2.in' }
  }
}

/**
 * Positioning line animation
 * Fades in with logo, fades out before overlay exit
 */
export const positioningLineAnimation = {
  entrance: {
    from: { opacity: 0 },
    to: { opacity: 0.7, duration: 0.4, delay: 0.1, ease: 'power2.out' }
  },
  exit: {
    to: { opacity: 0, duration: 0.3, ease: 'power2.in' }
  }
}

/**
 * Structural lines animation
 * Subtle assembly effect - lines draw in
 */
export const structuralLinesAnimation = {
  entrance: {
    from: { scaleX: 0, opacity: 0 },
    to: { scaleX: 1, opacity: 0.3, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
  },
  exit: {
    to: { opacity: 0, duration: 0.3, ease: 'power2.in' }
  }
}

/**
 * Skip button animation
 */
export const skipButtonAnimation = {
  entrance: {
    from: { opacity: 0 },
    to: { opacity: 0.5, duration: 0.3, delay: 0.3, ease: 'power2.out' }
  },
  hover: {
    to: { opacity: 1, duration: 0.2 }
  }
}

/**
 * Overlay fade out animation
 */
export const overlayExitAnimation = {
  to: { opacity: 0, duration: 0.5, ease: 'power2.inOut' }
}
