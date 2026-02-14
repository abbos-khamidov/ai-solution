# Phase 6 — Intro Strategy Blueprint

**Status:** Design Phase (No Implementation)  
**Goal:** Engineering maturity signal through controlled intro overlay  
**Duration:** 2–4 seconds max, immediately skippable  
**Tone:** Calm, technical, confident (not spectacle)

---

## 1. Core Message

**What the intro communicates in one sentence:**

> "We build reliable automation infrastructure with precision and control."

**Subtext conveyed (non-verbal):**
- Engineering discipline (through controlled timing)
- Technical confidence (through clean execution)
- Respect for user's time (through brevity and skip option)

---

## 2. Elements (Minimal Set)

### Visual Elements (4 total)

```
Intro Overlay
│
├─ 1. Background
│   └─ Subtle mesh gradient (same as Hero)
│       Purpose: Visual continuity
│       No extra loading required
│
├─ 2. Logo/Wordmark
│   └─ Company name in clean sans-serif
│       Size: 48px–64px
│       Weight: 600 (semibold)
│       Color: White with subtle glow
│       Purpose: Brand recognition
│
├─ 3. Technical Grid
│   └─ Faint wireframe grid (Hero's existing grid)
│       Opacity: 0.05 → 0.07
│       Purpose: Technical aesthetic
│       Reuses Hero background asset
│
└─ 4. Progress Indicator (optional)
    └─ Thin horizontal line that fills
        Width: 120px
        Height: 2px
        Color: #00D4FF
        Purpose: Signals progress, skippability
        Position: Below wordmark
```

**NOT included:**
- ❌ Loader spinners (feels like loading, not intro)
- ❌ Character animations (too playful)
- ❌ Particle effects (too decorative)
- ❌ Complex SVG animations (unnecessary)
- ❌ Multiple logos/badges (cluttered)
- ❌ Taglines or marketing copy (noise)

**Total visual weight:** Extremely minimal (logo + line + existing background)

---

## 3. Timeline (Step-by-Step)

**Total Duration:** 3000ms (3 seconds)  
**Philosophy:** Fast fade-in → hold → fast fade-out

```
Timeline Breakdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

0ms        Intro overlay renders (instant DOM mount)
           ├─ Background: visible immediately (mesh gradient)
           ├─ Logo: opacity 0 (ready to animate)
           ├─ Progress: opacity 0 (ready to animate)
           └─ Hero content: rendered underneath (NOT blocked)

0–500ms    PHASE 1: Intro Entrance
           ├─ Logo fade in (opacity: 0 → 1, duration: 400ms, ease: power2.out)
           ├─ Progress bar fade in (opacity: 0 → 1, duration: 300ms, delay: 100ms)
           └─ Grid subtle pulse (opacity: 0.05 → 0.07, duration: 400ms)

500–2500ms PHASE 2: Hold State (2 seconds)
           ├─ Logo: stable at opacity 1
           ├─ Progress bar: fills left-to-right (2000ms linear)
           ├─ Grid: stable at opacity 0.07
           └─ Skip indicator fades in at 500ms (text: "Press any key to skip")

2500–3000ms PHASE 3: Intro Exit
           ├─ Logo fade out (opacity: 1 → 0, duration: 400ms, ease: power2.in)
           ├─ Progress bar fade out (opacity: 1 → 0, duration: 300ms)
           ├─ Overlay fade out (opacity: 1 → 0, duration: 500ms)
           └─ Grid returns to Hero opacity (0.07 → 0.07, seamless)

3000ms     Intro complete
           ├─ Overlay DOM removed
           ├─ Hero animations trigger (existing Phase 4 animations)
           └─ Page scroll unlocked
```

**Key Timing Principles:**
- Fast transitions (400ms max) - no lingering
- 2-second hold - enough to register brand, not enough to frustrate
- Total 3s - well under 4s constraint
- All timings divisible by 100 for precise control

---

## 4. Transition Into Hero

### Mechanism: Layered Fade with Scroll Unlock

**Strategy:** Intro overlay sits ABOVE Hero, fades away to reveal (not replace)

```
Transition Architecture
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DOM Structure (z-index layers):
│
├─ z-50: Intro Overlay (absolute positioning, full viewport)
│   └─ During intro: visible, blocks interaction
│
└─ z-10: Hero Content (renders underneath, ready)
    └─ During intro: rendered but not animating
    └─ After intro: animations trigger


Transition Steps (2500–3000ms):
│
├─ Step 1 (2500ms): Begin overlay fade
│   ├─ Intro overlay: opacity 1 → 0 (500ms)
│   ├─ Hero content: opacity 1, scale 1 (already rendered)
│   └─ No scale/clip effects (too dramatic)
│
├─ Step 2 (2800ms): Unlock scroll
│   ├─ body.style.overflow = 'auto' (was 'hidden')
│   ├─ User can now scroll if intro skipped
│   └─ Prevents accidental scroll during intro
│
└─ Step 3 (3000ms): Trigger Hero animations
    ├─ Hero headline starts fade-up (existing animation)
    ├─ Subtext follows at +200ms (existing animation)
    ├─ CTA follows at +400ms (existing animation)
    └─ Intro overlay removed from DOM
```

**Why this works:**
- ✅ **Seamless:** Hero is already rendered, just revealed
- ✅ **No jump:** No layout shift or content pop-in
- ✅ **Clean:** Simple opacity transition (no complex effects)
- ✅ **Controlled:** Scroll locked during intro, unlocked after
- ✅ **Performant:** Single overlay removed, no cascade

**NOT using:**
- ❌ Scale transitions (feels zoomy/dramatic)
- ❌ Clip-path reveals (too editorial/flashy)
- ❌ Slide transitions (feels like navigation)
- ❌ Blur transitions (performance heavy)

---

## 5. Accessibility (Reduced Motion)

### Behavior Matrix

| Condition | Intro Behavior | Hero Behavior |
|-----------|---------------|---------------|
| **Standard** | Full 3s intro | Standard animations (0.8s) |
| **Reduced motion** | Skip intro entirely | Static (no animations) |
| **Slow connection** | Skip intro entirely | Static (no animations) |
| **Return visitor** | Skip intro (localStorage) | Standard animations |
| **Manual skip** | Immediate exit | Trigger Hero animations |

### Reduced Motion Implementation

**Detection:**
```
if (prefersReducedMotion || isSlowConnection || hasSeenIntro) {
  skipIntro()
  showHeroWithoutAnimations()
}
```

**What happens:**
1. Intro overlay never renders
2. Hero displays immediately in final state
3. No opacity transitions
4. No animation delays
5. Content instantly readable

**Result:** Zero animation overhead for users who prefer/need it

---

### Skip Interaction Design

**Trigger methods:**
1. Any keyboard press (most accessible)
2. Click/tap anywhere on overlay (intuitive)
3. ESC key (standard convention)
4. Browser back button (prevent trap)

**Skip behavior:**
```
On Skip (any time 0–3000ms):
├─ Immediately set overlay opacity to 0
├─ Duration override: 200ms (fast exit)
├─ Remove overlay from DOM
├─ Unlock scroll instantly
├─ Trigger Hero animations immediately
└─ Save skip preference (localStorage, 24hr expiry)
```

**Skip indicator:**
- Text: "Press any key to skip" or "Click to skip"
- Appears at: 500ms (after logo is visible)
- Position: Bottom center or below progress bar
- Size: 12px, subtle gray (#666)
- Purpose: Signals user control

---

## 6. Failure Modes to Avoid

### Critical Anti-Patterns

#### 1. **Blocking Content Render**
```
❌ BAD: Wait for intro to load before rendering Hero
✅ GOOD: Render Hero immediately, overlay intro on top
```
**Why:** If intro fails to load, site is still usable

---

#### 2. **No Skip Option**
```
❌ BAD: Force user to watch full intro
✅ GOOD: Skip available immediately from 0ms
```
**Why:** Respect user's time and choice

---

#### 3. **Long Duration**
```
❌ BAD: 5–10 second intro (common mistake)
✅ GOOD: 3 seconds max, feels engineered
```
**Why:** Attention span + perceived professionalism

---

#### 4. **Complex Animations**
```
❌ BAD: Character stagger, morphing shapes, particles
✅ GOOD: Simple fade in/out, linear progress
```
**Why:** Complexity = unprofessional for B2B tech

---

#### 5. **Scroll Lock Without Indication**
```
❌ BAD: Lock scroll with no visual feedback
✅ GOOD: Lock scroll + show progress bar
```
**Why:** User knows they're temporarily locked, not broken

---

#### 6. **Jarring Transition to Hero**
```
❌ BAD: Intro fades, then Hero pops in (layout shift)
✅ GOOD: Hero pre-rendered, intro fades to reveal
```
**Why:** Seamless = professional, jarring = amateur

---

#### 7. **Ignoring Return Visitors**
```
❌ BAD: Show intro every single visit
✅ GOOD: Show once per 24 hours (localStorage)
```
**Why:** Respect returning users, avoid annoyance

---

#### 8. **No Reduced Motion Consideration**
```
❌ BAD: Force animations on all users
✅ GOOD: Detect preference, skip intro entirely
```
**Why:** Accessibility is non-negotiable

---

#### 9. **Loading Spinner Aesthetic**
```
❌ BAD: Circular spinner, "Loading..." text
✅ GOOD: Progress bar as design element, no "loading" language
```
**Why:** This is an intro, not a loading state

---

#### 10. **Heavy Assets**
```
❌ BAD: Large video, complex SVG, multiple images
✅ GOOD: Text + existing Hero background + simple line
```
**Why:** Intro must load instantly or skip

---

## 7. Technical Implementation Strategy

### Architecture

**Component structure:**
```
<IntroOverlay>
├─ Renders on top of Hero (z-index: 50)
├─ Uses useIntroAnimation hook (from Phase 3)
├─ Shares Hero background (no extra loading)
└─ Self-removes on completion
```

**Rendering approach:**
```
App Mount
│
├─ Check: prefersReducedMotion? → Skip intro
├─ Check: hasSeenIntro (localStorage)? → Skip intro
├─ Check: isSlowConnection? → Skip intro
│
└─ If intro needed:
    ├─ Render Hero (underneath, immediately)
    ├─ Render IntroOverlay (on top)
    ├─ Lock scroll (body overflow: hidden)
    ├─ Run intro timeline (3s)
    └─ On complete:
        ├─ Remove IntroOverlay
        ├─ Unlock scroll
        └─ Trigger Hero animations
```

**State management:**
```typescript
introState:
├─ IDLE (initial)
├─ PLAYING (0–3000ms)
├─ SKIPPED (user interaction)
├─ COMPLETE (3000ms reached)
└─ DISABLED (reduced motion / return visitor)
```

---

## 8. Content Specifics

### Logo/Wordmark Treatment

**Text:** Company name (e.g., "Adams AI" or actual brand name)

**Typography:**
- Font: Same as Hero headline (consistency)
- Size: 48px mobile, 64px desktop
- Weight: 600 (semibold - confident but not aggressive)
- Letter spacing: -0.02em (tight, technical)
- Color: White (#FFFFFF)
- Effect: Subtle text-shadow glow (0 0 20px rgba(0, 212, 255, 0.3))

**No additional text:**
- ❌ No tagline
- ❌ No "Welcome to..."
- ❌ No "Loading..."
- ✅ Just the brand

---

### Progress Indicator Design

**Visual:**
```
Empty state:     [                    ]  ← 120px × 2px, rgba(255,255,255,0.2)
Filling:         [████████            ]  ← #00D4FF, fills left-to-right
Complete:        [████████████████████]  ← Fully filled at 2500ms
```

**Animation:**
- 0–500ms: Fade in (opacity 0 → 1)
- 500–2500ms: Fill (width 0% → 100%, linear)
- 2500–3000ms: Fade out (opacity 1 → 0)

**Purpose:**
- Shows progress (not stuck)
- Signals skippability (in motion)
- Technical aesthetic (precision)

---

### Background Treatment

**Strategy:** Reuse Hero's existing mesh-gradient

**During intro:**
- Same gradient as Hero
- Same grid pattern (opacity 0.07)
- No additional blur or effects
- Seamless visual continuity

**Why:**
- Zero additional loading
- Perfect transition (same background)
- Consistent brand aesthetic

---

## 9. Performance Constraints

### Load Time Budget

**Intro must be instant or skip:**
```
If intro assets load > 500ms:
  └─ Skip intro, show Hero immediately
```

**Asset checklist:**
- ✅ Background: reused from Hero (0ms)
- ✅ Logo text: web font already loaded (0ms)
- ✅ Progress bar: CSS only (0ms)
- ✅ Grid: reused from Hero (0ms)

**Total additional load:** 0 bytes (all reused or CSS)

---

### Animation Performance

**Requirements:**
- 60fps maintained (16.67ms/frame)
- GPU-accelerated properties only (opacity, transform)
- No layout recalculation
- No paint triggers

**Properties allowed:**
- ✅ opacity
- ✅ transform (if needed, but prefer opacity only)

**Properties forbidden:**
- ❌ width/height (progress bar uses scaleX instead)
- ❌ background changes
- ❌ filter/blur effects
- ❌ box-shadow changes

---

## 10. User Experience Flow

### First-Time Visitor Journey

```
1. User navigates to site (t=0)
2. Hero renders instantly (visible but overlay covers it)
3. Intro overlay appears (logo fades in, 0–500ms)
4. Progress bar fills (500–2500ms)
5. Skip indicator shows (user knows they can skip)
6. User either:
   a) Waits: Intro completes at 3000ms → Hero animates
   b) Skips: Any interaction → Instant transition to Hero
7. Hero fully interactive
```

**Time to interactive:**
- If watched: 3000ms (intro) + 800ms (Hero animations) = 3.8s
- If skipped at 0ms: 0ms (instant)
- If skipped at 1000ms: 200ms exit transition

---

### Return Visitor Journey (Within 24 Hours)

```
1. User navigates to site
2. localStorage check: intro shown recently
3. Skip intro entirely
4. Hero renders with animations (standard 800ms)
5. Fully interactive at 800ms
```

**Time to interactive:** 800ms (no intro delay)

---

### Reduced Motion User Journey

```
1. User navigates to site
2. prefersReducedMotion detected
3. Skip intro entirely
4. Hero renders in final state (no animations)
5. Fully interactive at 0ms
```

**Time to interactive:** 0ms (instant, no animations)

---

## 11. Success Metrics

### Intro is Successful If:

✅ **Duration:** 2–4 seconds total (target: 3s)  
✅ **Skip rate:** <80% (if >80% skip, intro is failing)  
✅ **Performance:** 60fps maintained throughout  
✅ **Accessibility:** Reduced motion users skip automatically  
✅ **Load impact:** 0 additional bytes loaded  
✅ **Transition:** Seamless (no layout shift, no flash)  
✅ **Brand:** Feels engineered and controlled  

### Intro is Failing If:

❌ **Duration:** >4 seconds  
❌ **Skip rate:** >80% (users actively avoiding it)  
❌ **Performance:** Frame drops or jank  
❌ **Accessibility:** Reduced motion users trapped  
❌ **Load impact:** Adds >10KB to bundle  
❌ **Transition:** Jarring or causes layout shift  
❌ **Brand:** Feels gimmicky or unprofessional  

---

## 12. Implementation Checklist

Before coding, ensure design covers:

- [ ] Message is clear (one sentence: "reliable automation infrastructure")
- [ ] Elements are minimal (logo + progress + background)
- [ ] Timeline is precise (0–500–2500–3000ms mapped)
- [ ] Transition is seamless (fade overlay, Hero pre-rendered)
- [ ] Accessibility is handled (reduced motion skips entirely)
- [ ] Failure modes are avoided (all 10 anti-patterns addressed)
- [ ] Performance is guaranteed (0 additional assets, GPU-only)
- [ ] Skip is immediate (any interaction at any time)
- [ ] Return visitors skip (localStorage 24hr)
- [ ] Success metrics are defined (measurable)

---

## 13. Visual Mockup (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    [Mesh gradient background]               │
│                    [Subtle grid: 0.07 opacity]              │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                         Adams AI                             │  ← Logo/wordmark (48-64px, white, subtle glow)
│                                                              │
│                      ████████░░░░░░░░                        │  ← Progress bar (120px × 2px, fills left-to-right)
│                                                              │
│                                                              │
│                                                              │
│                                                              │
│                   Press any key to skip                      │  ← Skip indicator (12px, gray, appears at 500ms)
│                                                              │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Notes:**
- Clean, centered composition
- Minimal visual weight
- Technical aesthetic (grid, progress bar)
- Skip option clearly communicated
- No marketing fluff

---

## Summary

**Phase 6 Blueprint:** ✅ Complete (Design Only)

**Core Concept:**
- 3-second controlled intro overlay
- Logo + progress bar + existing background
- Fades away to reveal pre-rendered Hero
- Immediately skippable
- Auto-skipped for reduced motion / return visitors

**Key Principles:**
1. **Respect user time** (3s max, skip anytime, remember preference)
2. **Signal engineering** (precision timing, technical aesthetic)
3. **Ensure accessibility** (reduced motion skips, keyboard skip)
4. **Maintain performance** (0 additional assets, 60fps)
5. **Seamless transition** (Hero pre-rendered, simple fade)

**Feel:**
- Calm, technical, controlled
- Professional, not playful
- Confident, not showy
- Fast, not rushed

**Ready for Phase 7 implementation when approved.**
