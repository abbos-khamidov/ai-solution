/**
 * ScrollTrigger Manager
 * Centralized ScrollTrigger registry and lifecycle management
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getScrollTrigger, isGSAPInitialized } from './gsapConfig'
import { isClient } from './ssrGuard'

/**
 * ScrollTrigger Manager Class
 * Tracks and manages all ScrollTrigger instances
 */
class ScrollTriggerManager {
  private triggers = new Map<string, ScrollTrigger>()
  private sections = new Map<string, Set<string>>()

  /**
   * Register a ScrollTrigger with unique ID
   */
  register(id: string, trigger: ScrollTrigger, sectionId?: string): void {
    if (!isClient() || !isGSAPInitialized()) return
    
    // Store trigger
    this.triggers.set(id, trigger)
    
    // Track by section if provided
    if (sectionId) {
      if (!this.sections.has(sectionId)) {
        this.sections.set(sectionId, new Set())
      }
      this.sections.get(sectionId)?.add(id)
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📌 ScrollTrigger registered: ${id}${sectionId ? ` (section: ${sectionId})` : ''}`)
    }
  }

  /**
   * Unregister and kill a ScrollTrigger
   */
  unregister(id: string): void {
    if (!isClient()) return
    
    const trigger = this.triggers.get(id)
    
    if (trigger) {
      trigger.kill()
      this.triggers.delete(id)
      
      // Remove from section tracking
      this.sections.forEach((ids) => {
        ids.delete(id)
      })
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🗑️ ScrollTrigger unregistered: ${id}`)
      }
    }
  }

  /**
   * Get ScrollTrigger by ID
   */
  getById(id: string): ScrollTrigger | undefined {
    return this.triggers.get(id)
  }

  /**
   * Get all ScrollTriggers for a section
   */
  getBySection(sectionId: string): ScrollTrigger[] {
    const ids = this.sections.get(sectionId)
    
    if (!ids) return []
    
    return Array.from(ids)
      .map(id => this.triggers.get(id))
      .filter((t): t is ScrollTrigger => t !== undefined)
  }

  /**
   * Refresh all ScrollTriggers
   */
  refreshAll(): void {
    if (!isClient() || !isGSAPInitialized()) return
    
    const ST = getScrollTrigger()
    if (ST) {
      ST.refresh()
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 All ScrollTriggers refreshed')
      }
    }
  }

  /**
   * Refresh ScrollTriggers for specific section
   */
  refreshSection(sectionId: string): void {
    if (!isClient()) return
    
    const triggers = this.getBySection(sectionId)
    triggers.forEach(trigger => trigger.refresh())
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Section refreshed: ${sectionId} (${triggers.length} triggers)`)
    }
  }

  /**
   * Kill all ScrollTriggers
   */
  killAll(): void {
    if (!isClient()) return
    
    this.triggers.forEach((trigger) => {
      trigger.kill()
    })
    
    this.triggers.clear()
    this.sections.clear()
    
    if (process.env.NODE_ENV === 'development') {
      console.log('💀 All ScrollTriggers killed')
    }
  }

  /**
   * Kill all ScrollTriggers for specific section
   */
  killSection(sectionId: string): void {
    if (!isClient()) return
    
    const ids = this.sections.get(sectionId)
    
    if (ids) {
      ids.forEach(id => {
        const trigger = this.triggers.get(id)
        if (trigger) {
          trigger.kill()
          this.triggers.delete(id)
        }
      })
      
      this.sections.delete(sectionId)
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`💀 Section killed: ${sectionId}`)
      }
    }
  }

  /**
   * Get count of active triggers
   */
  getCount(): number {
    return this.triggers.size
  }

  /**
   * Get all trigger IDs
   */
  getAllIds(): string[] {
    return Array.from(this.triggers.keys())
  }

  /**
   * Enable/disable all ScrollTriggers
   */
  setEnabled(enabled: boolean): void {
    if (!isClient() || !isGSAPInitialized()) return
    
    const ST = getScrollTrigger()
    
    if (ST) {
      if (enabled) {
        ST.refresh()
      } else {
        this.triggers.forEach(trigger => trigger.disable())
      }
    }
  }
}

// Singleton instance
export const scrollManager = new ScrollTriggerManager()

// Debug helpers for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).__scrollManager = scrollManager
}
