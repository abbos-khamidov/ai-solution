/**
 * SSR Guard Utilities
 * Safe client-side only execution helpers
 */

import { useEffect, useLayoutEffect } from 'react'

/**
 * Check if code is running on server
 */
export const isSSR = (): boolean => {
  return typeof window === 'undefined'
}

/**
 * Check if code is running on client
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined'
}

/**
 * Safe useLayoutEffect that falls back to useEffect on server
 * Prevents SSR warnings
 */
export const useIsomorphicLayoutEffect = 
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Safe window access
 */
export const safeWindow = (): Window | null => {
  return isClient() ? window : null
}

/**
 * Safe document access
 */
export const safeDocument = (): Document | null => {
  return isClient() ? document : null
}

/**
 * Execute callback only on client
 */
export const clientOnly = <T>(callback: () => T, fallback?: T): T | undefined => {
  if (isClient()) {
    return callback()
  }
  return fallback
}
