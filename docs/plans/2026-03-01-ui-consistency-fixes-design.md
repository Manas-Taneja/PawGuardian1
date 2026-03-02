# UI Consistency Fixes — Design Doc

Date: 2026-03-01

## Context

Visual audit of the home page revealed five categories of UI inconsistency. Fixes target brand cohesion without changing layout or content strategy.

## Fixes

### 1. FinalCTA — Add call-to-action buttons

**Problem:** The FinalCTA section has a headline and body copy but no buttons. It is the last conversion opportunity on the page and currently dead-ends.

**Fix:**
- Add `onOpenBooking: () => void` and `navigate: (page: Page) => void` props to `FinalCTA`
- Render two buttons after the body paragraph:
  - Primary: "Join the Waitlist" — pink `#FF6B9D`, calls `onOpenBooking`
  - Secondary: "View Plans" — outline variant, calls `navigate('services')`
- Remove the orphaned footnote ("Join PawGuardian today…") — buttons carry the action
- Update `App.tsx` to pass `openBooking` and `navigate` to `<FinalCTA />`

### 2. Plans section buttons — normalize to brand pink

**Problem:** "View Dog Plans" uses peach `#FF9F7F`; "View Cat Plans" uses lavender `#C4B5FD`. Primary CTAs elsewhere use brand pink `#FF6B9D`.

**Fix:**
- Both buttons → `backgroundColor: '#FF6B9D'`, `color: 'white'`
- Section identity (card borders, text accents, watermarks) remains section-themed

### 3. Cost card — replace green with brand colors

**Problem:** `₹1.2L` renders in `text-green-600`; its underline bar uses `bg-green-400`. Green is not in the brand palette.

**Fix:**
- Amount text: `text-green-600` → inline style `color: '#1e3470'` (brand navy)
- Underline bar: `bg-green-400 shadow-green-200` → inline style `backgroundColor: '#FF6B9D'`
- The yellow "Save 73%" badge already communicates the savings message

### 4. HowItWorks step numbers — increase ghost opacity

**Problem:** Step number ghosts use opacity `0.08` — nearly invisible, read as rendering artifacts.

**Fix:**
- Increase all four `ghostColor` values from `0.08` to `0.15`

### 5. Plans banner — add breathing room

**Problem:** The dark "All plans include…" banner sits flush against the plan cards above it with no separation.

**Fix:**
- Add `mt-12` above the banner `<div>` inside `Plans.tsx`

## Files Changed

| File | Change |
|------|--------|
| `components/Sections/FinalCTA.tsx` | Add props, add buttons, remove footnote |
| `App.tsx` | Pass `openBooking` and `navigate` to FinalCTA |
| `components/Sections/Plans.tsx` | Normalize button colors, add banner top margin |
| `components/Sections/ValueProp.tsx` | Replace green cost colors with brand colors |
| `components/Sections/HowItWorks.tsx` | Increase ghost number opacity |
