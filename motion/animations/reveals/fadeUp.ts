/**
 * Fade Up Reveal Animation
 * Clean, engineered reveal with subtle upward motion
 */

import { RevealVariant } from '../../types/animations'

export interface FadeUpConfig {
  variant: RevealVariant
  from: {
    opacity: number
    y: number
  }
  to: {
    opacity: number
    y: number
  }
}

/**
 * Hero Headline Reveal
 * Confident, professional entrance
 */
export const heroHeadlineReveal: FadeUpConfig = {
  variant: 'fade-up',
  from: {
    opacity: 0,
    y: 16  // Subtle 16px movement
  },
  to: {
    opacity: 1,
    y: 0
  }
}

/**
 * Hero Subtext Reveal
 * Supporting text with gentle reveal
 */
export const heroSubtextReveal: FadeUpConfig = {
  variant: 'fade-up',
  from: {
    opacity: 0,
    y: 16
  },
  to: {
    opacity: 1,
    y: 0
  }
}

/**
 * Hero CTA Reveal
 * Call-to-action buttons with confident appearance
 */
export const heroCTAReveal: FadeUpConfig = {
  variant: 'fade-up',
  from: {
    opacity: 0,
    y: 16
  },
  to: {
    opacity: 1,
    y: 0
  }
}

/**
 * Generic fade-up configurations for different use cases
 */
export const fadeUpPresets = {
  subtle: {
    from: { opacity: 0, y: 8 },
    to: { opacity: 1, y: 0 }
  },
  standard: {
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0 }
  },
  pronounced: {
    from: { opacity: 0, y: 32 },
    to: { opacity: 1, y: 0 }
  }
}
