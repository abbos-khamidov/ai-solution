# Phase 2 — Animation Architecture Blueprint

**Status:** Design Complete  
**Framework:** Next.js 14 + GSAP 3.14 + ScrollTrigger  
**Objective:** Build a centralized, SSR-safe, high-performance animation system

---

## CRITICAL CONSTRAINTS

```
❌ NEVER import gsap directly in components
❌ NEVER call gsap.to() or gsap.from() in JSX
❌ NEVER use useEffect for animation without cleanup
❌ NEVER animate layout properties without will-change
❌ NEVER create ScrollTriggers without kill() cleanup

✅ ALWAYS use motion hooks
✅ ALWAYS animate transform/opacity only
✅ ALWAYS cleanup on unmount
✅ ALWAYS check SSR environment
✅ ALWAYS test on mobile devices
```

---

## STEP 1 — FILE STRUCTURE DESIGN

### Directory Architecture

```
motion/
├── animations/          # Pure animation definitions (no React)
│   ├── intro/          # Site intro timeline sequences
│   ├── reveals/        # Scroll-triggered reveal patterns
│   ├── parallax/       # Parallax effect configs
│   ├── sections/       # Section-specific timelines
│   └── transitions/    # Page/route transitions
│
├── hooks/              # React hooks (primary API)
│   ├── useIntroAnimation.ts
│   ├── useRevealAnimation.ts
│   ├── useParallax.ts
│   ├── useSectionTimeline.ts
│   ├── useScrollTrigger.ts
│   └── usePageTransition.ts
│
├── utils/              # Core utilities & helpers
│   ├── gsap-config.ts      # GSAP setup & registration
│   ├── timeline-factory.ts # Timeline creation helpers
│   ├── scroll-manager.ts   # ScrollTrigger coordination
│   ├── performance.ts      # Detection & optimization
│   ├── cleanup.ts          # Memory management
│   └── ssr-guard.ts        # Server-side safety
│
└── types/              # TypeScript definitions
    ├── animations.ts
    ├── hooks.ts
    └── config.ts
```

### File Responsibilities

#### `motion/animations/`
**Role:** Pure animation definitions  
**Contains:** 
- GSAP timeline configurations (object literals)
- Tween parameter sets
- Easing presets
- Duration/delay constants
- Stagger configurations

**Does NOT contain:**
- React hooks
- Component references
- DOM queries (except via refs passed in)
- Side effects

**Example Exports:**
```typescript
// intro/hero-intro.ts
export const heroIntroConfig = {
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.15
}

// reveals/fade-up.ts
export const fadeUpReveal = {
  from: { y: 60, opacity: 0 },
  to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
}
```

#### `motion/hooks/`
**Role:** React integration layer  
**Contains:**
- Custom hooks that consume animation configs
- Ref management
- Lifecycle integration (mount/unmount)
- SSR guards
- Cleanup orchestration

**Responsibilities:**
- Accept refs from components
- Create GSAP instances
- Return cleanup functions
- Handle conditional animation (reduced motion, mobile)
- Provide status/progress tracking

**Example Pattern:**
```typescript
// hooks/useRevealAnimation.ts
export function useRevealAnimation(options) {
  const { ref, trigger } = options
  
  useEffect(() => {
    if (!ref.current || isSSR()) return
    
    const tween = gsap.fromTo(ref.current, ...)
    
    return () => tween.kill()
  }, [ref])
}
```

#### `motion/utils/`
**Role:** Infrastructure & coordination  
**Contains:**
- GSAP plugin registration
- Performance detection
- ScrollTrigger centralized management
- Memory cleanup helpers
- Environment detection

**Key Files:**

**`gsap-config.ts`**
- Register ScrollTrigger plugin
- Set global defaults (force3D, overwrite mode)
- Configure ticker settings
- Export configured gsap instance

**`timeline-factory.ts`**
- Helper functions to create timelines
- Label management
- Nested timeline utilities
- Batch animation creators

**`scroll-manager.ts`**
- Central ScrollTrigger registry
- Batch create/destroy
- Refresh coordination
- Debug mode helpers

**`performance.ts`**
- Detect GPU capabilities
- Check reduced motion preference
- Device/bandwidth detection
- Frame rate monitoring

**`cleanup.ts`**
- Kill all animations
- Clear all ScrollTriggers
- Reset scroll position utilities
- Route change cleanup

**`ssr-guard.ts`**
- `isSSR()` check
- `useIsomorphicLayoutEffect`
- Safe window/document access
- Hydration helpers

---

## STEP 2 — CORE ANIMATION ENGINE

### 2.1 Base GSAP Configuration

**File:** `motion/utils/gsap-config.ts`

**Responsibilities:**
```typescript
// Configuration Pattern
{
  // Plugin Registration
  - Register ScrollTrigger
  - Register ScrollToPlugin (optional)
  - Register TextPlugin (optional)
  
  // Global Defaults
  gsap.defaults({
    ease: "power2.out",
    duration: 0.6,
    force3D: true,           // Force GPU acceleration
    overwrite: "auto"        // Prevent animation conflicts
  })
  
  // ScrollTrigger Defaults
  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    markers: process.env.NODE_ENV === 'development' && DEBUG_MODE
  })
  
  // Performance Config
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
  })
}
```

**Export Strategy:**
- Single configured `gsap` instance
- Single configured `ScrollTrigger` instance
- Never re-register plugins

**SSR Safety:**
```typescript
let gsapInstance: GSAP | null = null

export const getGSAP = () => {
  if (typeof window === 'undefined') return null
  
  if (!gsapInstance) {
    gsapInstance = gsap.registerPlugin(ScrollTrigger)
    // ... configure
  }
  
  return gsapInstance
}
```

---

### 2.2 Intro Timeline System

**File:** `motion/animations/intro/master-timeline.ts`

**Architecture:**
```
Master Intro Timeline (10-15s total)
│
├─ [0s] Loader Phase (0-2s)
│   ├─ Logo fade in
│   └─ Progress indicator
│
├─ [2s] Loader Exit (2-2.5s)
│   └─ Fade out loader
│
├─ [2.5s] Hero Entry (2.5-4.5s)
│   ├─ Background reveal
│   ├─ Headline characters stagger
│   ├─ Subheadline fade up
│   └─ CTA buttons appear
│
├─ [4.5s] Header Entry (4.5-5.5s)
│   ├─ Logo slide in
│   └─ Nav items stagger
│
└─ [5.5s] Enable Scroll (5.5s)
    └─ Unlock page scroll
```

**State Management:**
```typescript
Intro States:
- IDLE         → Not started
- LOADING      → Loader phase active
- TRANSITIONING → Loader exiting
- ANIMATING    → Main intro running
- COMPLETE     → Intro done, scroll enabled
- SKIPPED      → User skipped intro
```

**Skip Logic:**
```typescript
- Detect if user has visited before (localStorage)
- Provide skip button after 3s
- On skip: jump to COMPLETE state immediately
- Prevent intro on subsequent visits (24hr cookie)
```

**Integration Point:**
```typescript
// Hook: useIntroAnimation()
// Called from: app/layout.tsx or root client component
// Returns: { state, progress, skip() }
```

---

### 2.3 ScrollTrigger Orchestration Model

**File:** `motion/utils/scroll-manager.ts`

**Core Principles:**
```
1. Centralized Registry
   - Track all active ScrollTriggers
   - Assign unique IDs
   - Enable batch operations

2. Lifecycle Management
   - Create: Register to central store
   - Update: Refresh when layout changes
   - Destroy: Remove from store & kill

3. Performance Optimization
   - Batch refresh calls
   - Debounce resize handlers
   - Use scroller proxy for custom scrollers

4. Debug Mode
   - Toggle markers globally
   - Log trigger events
   - Visualize active triggers
```

**Registry Pattern:**
```typescript
class ScrollTriggerManager {
  private triggers = new Map<string, ScrollTrigger>()
  
  register(id: string, trigger: ScrollTrigger): void
  unregister(id: string): void
  refreshAll(): void
  killAll(): void
  getById(id: string): ScrollTrigger | undefined
  
  // Batch operations
  refreshSection(sectionId: string): void
  killSection(sectionId: string): void
}

export const scrollManager = new ScrollTriggerManager()
```

**Cleanup Strategy:**
```typescript
// On route change (Next.js)
Router.events.on('routeChangeStart', () => {
  scrollManager.killAll()
  gsap.killTweensOf('*')
})

// On component unmount
useEffect(() => {
  return () => scrollManager.killSection('hero')
}, [])
```

---

### 2.4 Section Animation Lifecycle

**Pattern:** Each major section has its own animation lifecycle

```
Section Lifecycle Phases:
│
├─ 1. MOUNT
│   ├─ Component renders
│   ├─ Ref captures DOM element
│   └─ Hook initializes
│
├─ 2. SETUP (useLayoutEffect)
│   ├─ Check SSR guard
│   ├─ Create GSAP timelines
│   ├─ Create ScrollTriggers
│   └─ Register to scroll manager
│
├─ 3. ACTIVE
│   ├─ Respond to scroll events
│   ├─ Play/reverse animations
│   └─ Update based on progress
│
├─ 4. UPDATE (dependency change)
│   ├─ Kill old animations
│   ├─ Recreate with new params
│   └─ Re-register
│
└─ 5. CLEANUP (unmount)
    ├─ Kill all section timelines
    ├─ Unregister ScrollTriggers
    └─ Clear event listeners
```

**Implementation Pattern:**
```typescript
// Example: Hero Section
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { progress } = useSectionTimeline({
    ref: containerRef,
    sectionId: 'hero',
    timeline: heroTimelineConfig,
    scrollTrigger: {
      trigger: containerRef,
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true
    }
  })
  
  return (
    <div ref={containerRef}>
      {/* ... */}
    </div>
  )
}
```

---

### 2.5 Cleanup Strategy on Route Change

**File:** `motion/utils/cleanup.ts`

**Critical Requirements:**
```
❌ Memory Leaks Prevention
   - Every GSAP tween must be killed
   - Every ScrollTrigger must be destroyed
   - Every event listener must be removed

✅ Cleanup Triggers
   - Component unmount (useEffect cleanup)
   - Route change (Next.js router events)
   - Manual reset (user action)
   - Error boundary (fail-safe)
```

**Next.js Integration:**
```typescript
// In app/layout.tsx or root provider

useEffect(() => {
  const handleRouteChange = () => {
    cleanupAllAnimations()
  }
  
  Router.events.on('routeChangeStart', handleRouteChange)
  
  return () => {
    Router.events.off('routeChangeStart', handleRouteChange)
  }
}, [])

function cleanupAllAnimations() {
  // 1. Kill all GSAP animations
  gsap.killTweensOf('*')
  
  // 2. Destroy all ScrollTriggers
  ScrollTrigger.getAll().forEach(st => st.kill())
  
  // 3. Clear scroll manager registry
  scrollManager.killAll()
  
  // 4. Reset scroll position (optional)
  window.scrollTo(0, 0)
}
```

**Component-Level Cleanup:**
```typescript
useEffect(() => {
  const timeline = gsap.timeline()
  const trigger = ScrollTrigger.create({...})
  
  // Register for tracking
  scrollManager.register('hero-animation', trigger)
  
  return () => {
    timeline.kill()
    scrollManager.unregister('hero-animation')
  }
}, [])
```

---

## STEP 3 — HOOK INTERFACES

### 3.1 `useIntroAnimation()`

**Purpose:** Orchestrate the master intro timeline  
**Used By:** Root layout or intro wrapper component  
**File:** `motion/hooks/useIntroAnimation.ts`

**Interface:**
```typescript
interface IntroAnimationOptions {
  // Control
  autoStart?: boolean          // Start on mount (default: true)
  allowSkip?: boolean          // Show skip button (default: true)
  skipDelay?: number           // Delay before skip button (default: 3000ms)
  persistSkip?: boolean        // Remember skip preference (default: true)
  
  // Timeline config
  duration?: number            // Total intro duration (default: 10s)
  loaderDuration?: number      // Loader phase (default: 2s)
  
  // Callbacks
  onStart?: () => void
  onComplete?: () => void
  onSkip?: () => void
  
  // Debug
  debug?: boolean
}

interface IntroAnimationReturn {
  // State
  state: IntroState            // Current state
  progress: number             // 0-1 progress
  isComplete: boolean
  
  // Controls
  start: () => void
  skip: () => void
  pause: () => void
  resume: () => void
  
  // Refs (for UI binding)
  loaderRef: RefObject<HTMLDivElement>
  heroRef: RefObject<HTMLDivElement>
}

function useIntroAnimation(
  options?: IntroAnimationOptions
): IntroAnimationReturn
```

**Lifecycle:**
```
1. Mount → Check localStorage for skip preference
2. If skipped before → Return COMPLETE state immediately
3. If first visit → Create master timeline
4. Start → Progress through phases
5. Complete → Set complete state, enable scroll
6. Unmount → Kill timeline
```

**Internal Structure:**
```typescript
useIntroAnimation() {
  const [state, setState] = useState<IntroState>('IDLE')
  const [progress, setProgress] = useState(0)
  const timelineRef = useRef<GSAPTimeline>()
  
  useIsomorphicLayoutEffect(() => {
    if (shouldSkip()) {
      setState('COMPLETE')
      return
    }
    
    const tl = createMasterIntroTimeline({
      onUpdate: () => setProgress(tl.progress()),
      onComplete: () => setState('COMPLETE')
    })
    
    timelineRef.current = tl
    
    return () => tl.kill()
  }, [])
  
  const skip = useCallback(() => {
    timelineRef.current?.progress(1)
    setState('SKIPPED')
    saveSkipPreference()
  }, [])
  
  return { state, progress, skip, ... }
}
```

---

### 3.2 `useRevealAnimation()`

**Purpose:** Simple scroll-triggered reveals (fade, slide, scale)  
**Used By:** Any component needing basic entrance animation  
**File:** `motion/hooks/useRevealAnimation.ts`

**Interface:**
```typescript
type RevealVariant = 
  | 'fade-up'      // Fade + translate Y
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade'         // Fade only
  | 'scale'        // Fade + scale
  | 'clip'         // Clip-path reveal

interface RevealOptions {
  // Target
  ref: RefObject<HTMLElement>
  
  // Variant
  variant?: RevealVariant      // Default: 'fade-up'
  
  // ScrollTrigger config
  trigger?: RefObject<HTMLElement> | string  // Default: ref
  start?: string               // Default: 'top 80%'
  end?: string                 // Default: 'top 20%'
  scrub?: boolean              // Default: false
  once?: boolean               // Play once (default: true)
  
  // Animation config
  duration?: number            // Default: 0.8s
  delay?: number               // Default: 0s
  ease?: string                // Default: 'power2.out'
  
  // Stagger (for children)
  stagger?: number | StaggerConfig
  
  // Callbacks
  onEnter?: () => void
  onLeave?: () => void
  
  // Conditional
  enabled?: boolean            // Enable/disable (default: true)
}

interface RevealReturn {
  progress: number             // 0-1 animation progress
  isActive: boolean            // Is in view
  replay: () => void           // Force replay
}

function useRevealAnimation(
  options: RevealOptions
): RevealReturn
```

**Lifecycle:**
```
1. Mount → Wait for ref to populate
2. Setup → Create ScrollTrigger with chosen variant
3. Scroll → Trigger animation when start position reached
4. Complete → If once=true, don't replay
5. Unmount → Kill ScrollTrigger
```

**Usage Example:**
```typescript
function FeatureCard() {
  const cardRef = useRef(null)
  
  useRevealAnimation({
    ref: cardRef,
    variant: 'fade-up',
    start: 'top 85%',
    duration: 1.2,
    delay: 0.2
  })
  
  return <div ref={cardRef}>...</div>
}
```

---

### 3.3 `useParallax()`

**Purpose:** Parallax scroll effects (movement tied to scroll progress)  
**Used By:** Background images, decorative elements  
**File:** `motion/hooks/useParallax.ts`

**Interface:**
```typescript
interface ParallaxOptions {
  // Target
  ref: RefObject<HTMLElement>
  
  // Movement config
  y?: number | [number, number]    // Y movement (default: [0, -100])
  x?: number | [number, number]    // X movement (default: 0)
  scale?: number | [number, number] // Scale (default: 1)
  rotation?: number | [number, number] // Rotation (default: 0)
  opacity?: number | [number, number]  // Opacity (default: 1)
  
  // ScrollTrigger config
  trigger?: RefObject<HTMLElement> // Default: ref
  start?: string                   // Default: 'top bottom'
  end?: string                     // Default: 'bottom top'
  scrub?: number | boolean         // Default: 1 (smooth)
  
  // Performance
  ease?: string                    // Default: 'none' (scrub handles easing)
  
  // Conditional
  enabled?: boolean                // Default: true (disable on mobile)
}

interface ParallaxReturn {
  progress: number                 // 0-1 scroll progress
}

function useParallax(
  options: ParallaxOptions
): ParallaxReturn
```

**Lifecycle:**
```
1. Mount → Create parallax ScrollTrigger with scrub
2. Scroll → Update element transform based on progress
3. Unmount → Kill ScrollTrigger
```

**Performance Note:**
```
- Auto-disable on mobile/low-end devices
- Use transform only (never top/left)
- Set will-change: transform
- Prefer scrub: true for smooth updates
```

**Usage Example:**
```typescript
function HeroBackground() {
  const bgRef = useRef(null)
  
  useParallax({
    ref: bgRef,
    y: [0, -150],
    scale: [1, 1.1],
    scrub: 1.5
  })
  
  return <div ref={bgRef} className="hero-bg">...</div>
}
```

---

### 3.4 `useSectionTimeline()`

**Purpose:** Complex multi-part section animations with full timeline control  
**Used By:** Hero, About, Services sections with orchestrated sequences  
**File:** `motion/hooks/useSectionTimeline.ts`

**Interface:**
```typescript
interface TimelineStep {
  target: string               // Selector or ref key
  from?: GSAPTweenVars
  to?: GSAPTweenVars
  position?: string            // Timeline position ("<", "+=1", etc.)
  label?: string
}

interface SectionTimelineOptions {
  // Target container
  ref: RefObject<HTMLElement>
  
  // Unique identifier
  sectionId: string
  
  // Timeline definition
  steps: TimelineStep[]
  
  // Timeline config
  repeat?: number              // Default: 0
  yoyo?: boolean               // Default: false
  paused?: boolean             // Start paused (default: false)
  
  // ScrollTrigger config (optional)
  scrollTrigger?: {
    trigger?: RefObject<HTMLElement> | string
    start?: string
    end?: string
    scrub?: boolean | number
    pin?: boolean
    pinSpacing?: boolean
    anticipatePin?: number
    snap?: number | number[] | { snapTo: number, duration?: number }
    toggleActions?: string
  }
  
  // Callbacks
  onStart?: () => void
  onComplete?: () => void
  onUpdate?: (progress: number) => void
  onReverseComplete?: () => void
  
  // Conditional
  enabled?: boolean
}

interface SectionTimelineReturn {
  timeline: GSAPTimeline | null
  progress: number             // 0-1 timeline progress
  isActive: boolean            // ScrollTrigger active state
  
  // Manual controls
  play: () => void
  pause: () => void
  restart: () => void
  reverse: () => void
  seek: (position: number | string) => void
}

function useSectionTimeline(
  options: SectionTimelineOptions
): SectionTimelineReturn
```

**Lifecycle:**
```
1. Mount → Wait for ref
2. Setup → Create timeline from steps
3. Setup → Attach ScrollTrigger if provided
4. Setup → Register to scroll manager
5. Active → Play/scrub based on scroll
6. Update → If steps change, rebuild timeline
7. Unmount → Kill timeline & unregister
```

**Usage Example:**
```typescript
function ServicesSection() {
  const sectionRef = useRef(null)
  
  const { progress } = useSectionTimeline({
    ref: sectionRef,
    sectionId: 'services',
    steps: [
      {
        target: '.section-title',
        from: { y: 60, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 1 },
        label: 'start'
      },
      {
        target: '.service-card',
        to: { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        position: '-=0.5'
      },
      {
        target: '.cta-button',
        to: { scale: 1, opacity: 1, duration: 0.6 },
        position: '-=0.3'
      }
    ],
    scrollTrigger: {
      start: 'top 70%',
      end: 'bottom 30%'
    }
  })
  
  return (
    <section ref={sectionRef}>
      <h2 className="section-title">Services</h2>
      <div className="service-card">...</div>
      <button className="cta-button">...</button>
    </section>
  )
}
```

---

## STEP 4 — PERFORMANCE RULES

### 4.1 Animation Disable Conditions

**Auto-Disable Animations When:**

```typescript
// 1. Reduced Motion Preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

if (prefersReducedMotion) {
  // Skip all animations, show end state immediately
  return
}

// 2. Low-End Device Detection
const isLowEndDevice = () => {
  const memory = (navigator as any).deviceMemory // GB
  const cores = navigator.hardwareConcurrency
  
  return (
    memory && memory < 4 ||   // Less than 4GB RAM
    cores && cores < 4        // Less than 4 CPU cores
  )
}

// 3. Slow Network (Optional)
const isSlowConnection = () => {
  const conn = (navigator as any).connection
  return conn && (
    conn.effectiveType === 'slow-2g' ||
    conn.effectiveType === '2g' ||
    conn.saveData === true
  )
}

// 4. Battery Saver Mode
const isBatterySaving = () => {
  const battery = (navigator as any).battery
  return battery && battery.level < 0.2 && !battery.charging
}
```

**Graceful Degradation Strategy:**
```typescript
// File: motion/utils/performance.ts

export enum AnimationLevel {
  FULL = 'full',       // All animations enabled
  REDUCED = 'reduced', // Simple fades only
  NONE = 'none'        // No animations
}

export function getAnimationLevel(): AnimationLevel {
  if (prefersReducedMotion) return AnimationLevel.NONE
  if (isLowEndDevice()) return AnimationLevel.REDUCED
  if (isSlowConnection()) return AnimationLevel.REDUCED
  
  return AnimationLevel.FULL
}

// Usage in hooks
function useRevealAnimation(options) {
  const animationLevel = getAnimationLevel()
  
  if (animationLevel === AnimationLevel.NONE) {
    // Show final state immediately
    gsap.set(options.ref.current, { opacity: 1, y: 0 })
    return
  }
  
  if (animationLevel === AnimationLevel.REDUCED) {
    // Simple fade only, no movement
    gsap.to(options.ref.current, { opacity: 1, duration: 0.3 })
    return
  }
  
  // Full animation
  gsap.fromTo(options.ref.current, ...)
}
```

---

### 4.2 Mobile Fallback Behavior

**Mobile-Specific Rules:**

```typescript
// File: motion/utils/performance.ts

export const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
         window.innerWidth < 768
}

export const MOBILE_ANIMATION_CONFIG = {
  // Disable expensive effects
  disableParallax: true,
  disablePin: true,
  disableComplexTimelines: true,
  
  // Simplify animations
  maxDuration: 0.6,        // Cap animation duration
  disableStagger: true,     // Remove stagger delays
  reduceScrub: true,        // Disable scrub (instant)
  
  // Reduce ScrollTriggers
  mergeScrollTriggers: true // Batch multiple triggers
}

// In hooks
function useParallax(options) {
  if (isMobile() || MOBILE_ANIMATION_CONFIG.disableParallax) {
    // No-op on mobile
    return { progress: 0 }
  }
  
  // Desktop parallax logic
  ...
}
```

**Mobile Optimization Checklist:**
```
✅ Disable parallax effects
✅ Disable pinning (causes jank)
✅ Reduce stagger (feels slow on mobile)
✅ Use simpler easing functions
✅ Avoid scrub: true (laggy)
✅ Limit simultaneous animations to 3 max
✅ Use transforms only
✅ Avoid animating box-shadow, blur, clip-path
```

---

### 4.3 GPU Usage Rules

**Force GPU Acceleration:**

```css
/* Applied via GSAP force3D: true */
.animated-element {
  transform: translateZ(0);     /* Create GPU layer */
  will-change: transform;       /* Hint to browser */
  backface-visibility: hidden;  /* Prevent flicker */
}
```

**GSAP Configuration:**
```typescript
gsap.defaults({
  force3D: true,  // Always use GPU
})

// Explicitly for critical animations
gsap.to(element, {
  x: 100,
  y: 50,
  force3D: true,
  will-change: 'transform'
})
```

**GPU-Safe Properties:**
```typescript
// ✅ SAFE - GPU Accelerated
const GPU_SAFE = [
  'transform',         // translate, scale, rotate
  'opacity',
  'filter',           // Use sparingly (blur is heavy)
]

// ❌ AVOID - CPU Layout/Paint
const CPU_HEAVY = [
  'top', 'left',      // Use transform instead
  'width', 'height',  // Triggers layout
  'margin', 'padding', // Triggers layout
  'box-shadow',       // Heavy repaint
  'border-radius',    // Moderate repaint
  'background',       // Moderate repaint
]
```

**Will-Change Management:**
```typescript
// DON'T: Set will-change globally
.animated { will-change: transform; } // ❌ Memory waste

// DO: Set dynamically
gsap.set(element, { willChange: 'transform' })
gsap.to(element, { x: 100, onComplete: () => {
  gsap.set(element, { willChange: 'auto' }) // ✅ Clean up
}})
```

---

### 4.4 Frame Budget Targets

**Performance Targets:**

```typescript
// 60 FPS = 16.67ms per frame
const FRAME_BUDGET = {
  ideal: 16.67,      // 60fps
  acceptable: 33.33, // 30fps
  minimum: 50        // 20fps (before disabling)
}

// Animation budgets per frame
const ANIMATION_BUDGET = {
  maxSimultaneous: 5,           // Max 5 elements animating at once
  maxScrollTriggers: 20,        // Max 20 active ScrollTriggers
  maxTimelineNesting: 3,        // Max 3 levels of nested timelines
  
  // Timing budgets
  scrollCalculation: 2,         // 2ms for scroll position calc
  tweenUpdate: 8,               // 8ms for tween updates
  domUpdate: 4,                 // 4ms for DOM writes
  buffer: 2.67                  // 2.67ms buffer
}
```

**Frame Rate Monitoring:**

```typescript
// File: motion/utils/performance.ts

class FrameRateMonitor {
  private frames: number[] = []
  private isMonitoring = false
  
  start() {
    let lastTime = performance.now()
    
    const check = () => {
      const now = performance.now()
      const delta = now - lastTime
      
      this.frames.push(delta)
      
      // Keep last 60 frames
      if (this.frames.length > 60) this.frames.shift()
      
      // Check average
      const avgFrameTime = this.frames.reduce((a, b) => a + b) / this.frames.length
      
      if (avgFrameTime > FRAME_BUDGET.acceptable) {
        console.warn('⚠️ Frame rate dropping, reducing animations')
        this.reduceAnimations()
      }
      
      lastTime = now
      if (this.isMonitoring) requestAnimationFrame(check)
    }
    
    this.isMonitoring = true
    requestAnimationFrame(check)
  }
  
  reduceAnimations() {
    // Disable parallax
    // Reduce stagger
    // Disable scrub
    // Kill non-essential animations
  }
  
  stop() {
    this.isMonitoring = false
  }
}

export const frameMonitor = new FrameRateMonitor()

// Start monitoring in development
if (process.env.NODE_ENV === 'development') {
  frameMonitor.start()
}
```

**Layout Thrashing Prevention:**

```typescript
// ❌ BAD - Read/Write interleaved (causes multiple reflows)
elements.forEach(el => {
  const height = el.offsetHeight  // Read (reflow)
  el.style.height = height * 2    // Write (reflow)
})

// ✅ GOOD - Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight)  // Batch read
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2  // Batch write
})

// ✅ BEST - Use GSAP batch
gsap.utils.toArray('.element').forEach((el, i) => {
  gsap.to(el, {
    height: () => el.offsetHeight * 2,  // GSAP batches for you
    duration: 1
  })
})
```

**ScrollTrigger Refresh Batching:**

```typescript
// ❌ BAD - Multiple refreshes
ScrollTrigger.create({ ... })
ScrollTrigger.refresh()
ScrollTrigger.create({ ... })
ScrollTrigger.refresh()

// ✅ GOOD - Batch refresh
ScrollTrigger.batch('.element', {
  onEnter: batch => gsap.to(batch, { opacity: 1 })
})

// ✅ BEST - Manual batch
const triggers = []
triggers.push(ScrollTrigger.create({ ... }))
triggers.push(ScrollTrigger.create({ ... }))
ScrollTrigger.refresh()  // Single refresh
```

---

## ANTI-PATTERNS TO AVOID

```typescript
// ❌ NEVER: Direct GSAP in component
function BadComponent() {
  useEffect(() => {
    gsap.to('.element', { x: 100 })  // ❌ WRONG
  }, [])
}

// ✅ ALWAYS: Use hook
function GoodComponent() {
  const ref = useRef(null)
  useRevealAnimation({ ref, variant: 'fade-up' })  // ✅ CORRECT
}

// ❌ NEVER: Animate layout properties
gsap.to(el, { width: 500, height: 300 })  // ❌ WRONG

// ✅ ALWAYS: Animate transform/opacity
gsap.to(el, { scaleX: 1.5, scaleY: 1.2 })  // ✅ CORRECT

// ❌ NEVER: Missing cleanup
useEffect(() => {
  const tl = gsap.timeline()
  // ... animations
  // Missing return cleanup  // ❌ MEMORY LEAK
}, [])

// ✅ ALWAYS: Clean up
useEffect(() => {
  const tl = gsap.timeline()
  return () => tl.kill()  // ✅ CORRECT
}, [])

// ❌ NEVER: SSR-unsafe
const tl = gsap.timeline()  // ❌ Runs on server

// ✅ ALWAYS: SSR-guarded
useEffect(() => {
  if (typeof window === 'undefined') return
  const tl = gsap.timeline()  // ✅ Client only
}, [])
```

---

## TESTING CHECKLIST

Before implementation, ensure this blueprint answers:

- [ ] Where does GSAP initialization happen?
- [ ] How are animations registered/tracked?
- [ ] How do components trigger animations?
- [ ] What happens on component unmount?
- [ ] What happens on route change?
- [ ] How are ScrollTriggers cleaned up?
- [ ] How is SSR handled?
- [ ] How is reduced motion handled?
- [ ] How are mobile devices handled?
- [ ] What's the maximum concurrent animations?
- [ ] How is performance monitored?
- [ ] How are animations debugged?

---

## NEXT PHASE PREVIEW

**Phase 3 will implement:**

1. Create all files in `motion/` directory
2. Implement hooks with full TypeScript types
3. Build intro timeline system
4. Configure scroll manager
5. Add performance monitoring
6. Write integration tests

**Do not proceed to Phase 3 until this blueprint is approved.**

---

## APPROVAL CHECKLIST

- [ ] File structure makes sense
- [ ] Hook interfaces are clear
- [ ] Performance rules are comprehensive
- [ ] Cleanup strategy is robust
- [ ] SSR safety is guaranteed
- [ ] Mobile optimization is defined
- [ ] No implementation code written yet

**Status:** ✅ Blueprint Complete — Awaiting Approval
