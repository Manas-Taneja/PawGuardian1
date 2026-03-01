# PawGuardian Cutesy Visual Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform PawGuardian's visual identity from corporate/clinical to playful & cutesy while keeping the navy + cream backbone.

**Architecture:** Pure visual changes — no new components, no logic changes, no new dependencies. Candy accent colors (#FF6B9D pink, #4ECDC4 mint, #FFE66D lemon, #FF9F7F peach, #C4B5FD lavender) layer on top of existing navy/cream. Nunito replaces Fraunces as the heading font. Changes are isolated to 8 files.

**Tech Stack:** React 19, TypeScript, Tailwind CSS (CDN inline config in index.html), Framer Motion, Google Fonts

---

## Context

The Tailwind config is **not** a separate `tailwind.config.js` — it lives inside `index.html` as an inline `<script>tailwind.config = {...}</script>`. All font-family and color token changes go there.

The current heading font is `Fraunces` (serif) applied globally via CSS `h1,h2,h3,h4 { font-family: var(--font-display) }`. We swap it to `Nunito`.

No test runner is configured. Verification = run `bun run dev`, open http://localhost:3000 in browser, confirm the change visually.

---

### Task 1: Add Nunito font and update heading token in `index.html`

**Files:**
- Modify: `index.html:17-18` (Google Fonts `<link>`)
- Modify: `index.html:24-27` (Tailwind `fontFamily` config)
- Modify: `index.html:71-72` (CSS `--font-display` token)
- Modify: `index.html:83-89` (heading CSS rule)

**Step 1: Replace the Google Fonts link**

Find this in `index.html` (the `<link href="https://fonts.googleapis.com/css2?family=Fraunces...` line) and replace it:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
  rel="stylesheet">
```

**Step 2: Update the Tailwind fontFamily config**

Inside the `<script>tailwind.config = {...}</script>` block, update `fontFamily`:

```js
fontFamily: {
  sans: ['Plus Jakarta Sans', 'sans-serif'],
  display: ['Nunito', 'sans-serif'],
},
```

**Step 3: Update CSS token and heading rule**

In the `<style>` block, update `--font-display` and the heading rule:

```css
--font-display: 'Nunito', sans-serif;
```

```css
h1, h2, h3, h4 {
  font-family: var(--font-display);
}
```

(Remove `font-optical-sizing: auto;` — that was specific to Fraunces.)

**Step 4: Verify**

```bash
bun run dev
```
Open http://localhost:3000. Headings should now be round and bubbly (Nunito), not serif.

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: swap heading font from Fraunces to Nunito for cutesy feel"
```

---

### Task 2: Update Navbar — pink logo, wiggle animation, pink CTA, lemon active dot

**Files:**
- Modify: `components/Layout/Navbar.tsx`

**Step 1: Update the logo icon background to pink gradient**

Find the logo `<div>` around line 50 that has `style={{ backgroundColor: '#1e3470', ... }}`.

Replace it with:

```tsx
<div
  className="text-white p-2 rounded-xl transition-transform shadow-lg"
  style={{
    background: 'linear-gradient(135deg, #FF6B9D, #FF9F7F)',
    boxShadow: '0 6px 16px rgba(255,107,157,0.35)',
  }}
>
```

**Step 2: Add wiggle animation to the logo button**

The logo `<button>` currently has `group-hover:rotate-12` on the icon. Replace that with a Framer Motion `motion.div` wrapping the icon div.

First, make the icon a `motion.div`:

```tsx
import { motion } from 'framer-motion';
```

(Already imported at top of file — just use it.)

Change the icon wrapper to:

```tsx
<motion.div
  whileHover={{ rotate: [0, -15, 15, -10, 10, 0] }}
  transition={{ duration: 0.5, ease: 'easeInOut' }}
  className="text-white p-2 rounded-xl shadow-lg"
  style={{
    background: 'linear-gradient(135deg, #FF6B9D, #FF9F7F)',
    boxShadow: '0 6px 16px rgba(255,107,157,0.35)',
  }}
>
  <PawPrint size={24} />
</motion.div>
```

**Step 3: Change "Book a Slot" button to pink**

Find the `<Button>` for "Book a Slot" (around line 107). Update its style:

```tsx
<Button
  size="sm"
  className="hidden md:flex text-white border-none rounded-full px-5"
  style={{
    backgroundColor: '#FF6B9D',
    boxShadow: '0 4px 14px rgba(255,107,157,0.35)',
  } as React.CSSProperties}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e85a8a';
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FF6B9D';
  }}
  onClick={() => setIsBookingOpen(true)}
>
  Book a Slot
</Button>
```

**Step 4: Add lemon dot under active nav link**

Replace the `<button>` inside the `.map()` for nav links with this version that adds a small dot below the active item:

```tsx
<button
  key={label}
  onClick={() => page && navigate(page)}
  className={`relative text-sm font-medium transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer p-0 pb-1 ${!page ? 'cursor-default opacity-50' : ''}`}
  style={{
    color: isActive ? '#1e3470' : '#4a4a6a',
    fontWeight: isActive ? 700 : 500,
  }}
  onMouseEnter={(e) => {
    if (page) (e.currentTarget as HTMLButtonElement).style.color = '#1e3470';
  }}
  onMouseLeave={(e) => {
    if (page)
      (e.currentTarget as HTMLButtonElement).style.color = isActive ? '#1e3470' : '#4a4a6a';
  }}
>
  {label}
  {isActive && (
    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FFE66D' }} />
  )}
</button>
```

**Step 5: Verify**

Run `bun run dev`. Check:
- Logo icon has pink gradient
- Hovering logo does a wiggle
- "Book a Slot" is pink
- Active nav item has a small yellow dot beneath it

**Step 6: Commit**

```bash
git add components/Layout/Navbar.tsx
git commit -m "feat: cutesy navbar — pink logo gradient, wiggle, pink CTA, lemon active dot"
```

---

### Task 3: Update Hero — lighter overlay, pink pill badge, pink gradient, emoji chips, paw pattern

**Files:**
- Modify: `components/Sections/Hero.tsx`

**Step 1: Lighten the dark overlay**

Find the overlay div around line 17:
```tsx
<div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
```
Change to:
```tsx
<div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
```

**Step 2: Replace the "Accepting Early Access" indicator with a pink pill badge**

Find the `<motion.div>` with the dot span and "Accepting Early Access" text (around line 24). Replace the inner content:

```tsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex items-center justify-center gap-2 mb-8"
>
  <span
    className="flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
    style={{ backgroundColor: 'rgba(255,107,157,0.25)', color: '#ffc8dd', border: '1px solid rgba(255,107,157,0.4)' }}
  >
    🐾 Accepting Early Access
  </span>
</motion.div>
```

**Step 3: Update the gradient on "Pet Care." to pink→peach**

Find the `<span>` with `backgroundImage: 'linear-gradient(to right, #a8b8e8, #c8b4f0)'` around line 41. Replace:

```tsx
<span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(to right, #FF6B9D, #FF9F7F)' }}>
  Pet Care.
</span>
```

**Step 4: Update "Join the Waitlist" button to pink**

Find the `<Button>` for "Join the Waitlist" around line 64. Update its style prop:

```tsx
<Button
  size="lg"
  className="text-white border-none px-8 rounded-full flex items-center gap-2 group"
  style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF9F7F)', boxShadow: '0 8px 24px rgba(255,107,157,0.40)' }}
>
```

**Step 5: Replace feature chips with emoji pill badges**

Find the features div near the bottom (around line 90). Replace the three `<div className="flex items-center gap-2">` blocks with pill badges:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
  className="mt-12 flex flex-wrap justify-center gap-3 text-sm font-semibold"
>
  {[
    { icon: '🏥', label: 'At-home Diagnostics' },
    { icon: '👩‍⚕️', label: 'Expert Vets' },
    { icon: '💸', label: 'No Hidden Costs' },
  ].map(({ icon, label }) => (
    <span
      key={label}
      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white/90"
      style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)' }}
    >
      {icon} {label}
    </span>
  ))}
</motion.div>
```

**Step 6: Add paw print decoration to bottom-left of hero**

After the hero overlay divs (but still inside the `absolute inset-0 z-0` area), add a paw print SVG pattern:

```tsx
{/* Decorative paw print pattern — bottom left */}
<div className="absolute bottom-8 left-8 opacity-10 pointer-events-none select-none z-0">
  <svg width="120" height="120" viewBox="0 0 120 120" fill="white" xmlns="http://www.w3.org/2000/svg">
    {/* Simple paw: 4 small circles + 1 large oval */}
    <ellipse cx="60" cy="75" rx="18" ry="22" />
    <circle cx="38" cy="50" r="10" />
    <circle cx="60" cy="42" r="10" />
    <circle cx="82" cy="50" r="10" />
    <circle cx="30" cy="68" r="8" />
  </svg>
</div>
```

**Step 7: Verify**

Run `bun run dev`. Check:
- Lighter hero overlay (image more visible)
- "🐾 Accepting Early Access" pink pill
- "Pet Care." in pink-to-peach gradient
- Pink "Join the Waitlist" button
- Three emoji pill chips at bottom
- Faint paw print in bottom-left corner

**Step 8: Commit**

```bash
git add components/Sections/Hero.tsx
git commit -m "feat: cutesy hero — pink accents, emoji pill badges, paw print decoration"
```

---

### Task 4: Update ValueProp — candy card colors, lemon "Save 73%", emoji info box

**Files:**
- Modify: `components/Sections/ValueProp.tsx`

**Step 1: Update card icon backgrounds and borders to candy colors**

Find the three `<Card>` components in the right column (around lines 100–136).

Card 1 (AlertCircle / Early Detection) — change to pink:
```tsx
<Card className="hover:border-[#FF6B9D]/40 group transition-all duration-300">
  <div className="flex items-start gap-4">
    <div
      className="p-3 rounded-xl transition-colors"
      style={{ backgroundColor: 'rgba(255,107,157,0.10)', color: '#FF6B9D' }}
      onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#FF6B9D'; d.style.color = 'white'; }}
      onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = 'rgba(255,107,157,0.10)'; d.style.color = '#FF6B9D'; }}
    >
      <AlertCircle size={24} />
    </div>
    ...
  </div>
</Card>
```

Card 2 (Home / Care Without Clinic) — change to mint:
```tsx
<Card className="hover:border-[#4ECDC4]/40 group transition-all duration-300">
  <div className="flex items-start gap-4">
    <div
      className="p-3 rounded-xl transition-colors"
      style={{ backgroundColor: 'rgba(78,205,196,0.12)', color: '#4ECDC4' }}
      onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#4ECDC4'; d.style.color = 'white'; }}
      onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = 'rgba(78,205,196,0.12)'; d.style.color = '#4ECDC4'; }}
    >
      <Home size={24} />
    </div>
    ...
  </div>
</Card>
```

Card 3 (Wallet / Predictable) — change to lemon/amber:
```tsx
<Card className="hover:border-[#FFE66D]/60 group transition-all duration-300">
  <div className="flex items-start gap-4">
    <div
      className="p-3 rounded-xl transition-colors"
      style={{ backgroundColor: 'rgba(255,230,109,0.18)', color: '#d4a500' }}
      onMouseEnter={(e) => { const d = e.currentTarget; d.style.backgroundColor = '#FFE66D'; d.style.color = '#7a5c00'; }}
      onMouseLeave={(e) => { const d = e.currentTarget; d.style.backgroundColor = 'rgba(255,230,109,0.18)'; d.style.color = '#d4a500'; }}
    >
      <Wallet size={24} />
    </div>
    ...
  </div>
</Card>
```

**Step 2: Update "Save 73%" badge to lemon**

Find the badge around line 23 in `CostComparison`:
```tsx
<motion.div
  ...
  className="absolute -top-10 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold shadow-sm border border-green-200"
>
  Save 73%
</motion.div>
```
Change to:
```tsx
<motion.div
  ...
  className="absolute -top-10 text-xs px-3 py-1 rounded-full font-bold shadow-sm"
  style={{ backgroundColor: '#FFE66D', color: '#7a5c00', border: '1px solid rgba(255,230,109,0.6)' }}
>
  🎉 Save 73%
</motion.div>
```

**Step 3: Add 🐾 emoji to info box**

Find the `<p>` tag inside the purple info box (around line 38). Add a paw at the start:

```tsx
<p className="text-sm text-purple-900 leading-relaxed font-medium">
  🐾 Pets instinctively hide pain. <span className="font-bold text-purple-700">68% mask symptoms</span>, making early detection through data vital.
</p>
```

**Step 4: Verify**

Run `bun run dev`, scroll to ValueProp section. Check:
- Card 1 icon is pink on hover
- Card 2 icon is mint on hover
- Card 3 icon is lemon on hover
- "Save 73%" badge is yellow with 🎉
- Info box has 🐾 prefix

**Step 5: Commit**

```bash
git add components/Sections/ValueProp.tsx
git commit -m "feat: cutesy ValueProp — candy card colors, lemon save badge, paw emoji"
```

---

### Task 5: Update HowItWorks — lemon pill label, candy pillar colors

**Files:**
- Modify: `components/Sections/HowItWorks.tsx`

**Step 1: Update pillar candy colors**

The `pillars` array currently uses `color` for the icon wrapper. Update all four:

```tsx
const pillars = [
  {
    icon: Layers,
    title: "Smart Subscription",
    desc: "Personalised plans with regular diagnostics, baseline tracking, and AI-assisted health insights.",
    iconStyle: { backgroundColor: 'rgba(255,107,157,0.12)', color: '#FF6B9D' },
    ghostColor: 'rgba(255,107,157,0.08)',
  },
  {
    icon: Truck,
    title: "Doorstep Veterinary Care",
    desc: "At-home sample collection, vaccinations, and tele-consults based on real test results.",
    iconStyle: { backgroundColor: 'rgba(78,205,196,0.12)', color: '#4ECDC4' },
    ghostColor: 'rgba(78,205,196,0.08)',
  },
  {
    icon: Smartphone,
    title: "Digital Health Platform",
    desc: "All records, reminders, reports, and vet guidance—accessible in one place.",
    iconStyle: { backgroundColor: 'rgba(255,159,127,0.12)', color: '#FF9F7F' },
    ghostColor: 'rgba(255,159,127,0.08)',
  },
  {
    icon: PiggyBank,
    title: "Affordable by Design",
    desc: "Early intervention means fewer emergencies, no transport costs, and lower lifetime spend.",
    iconStyle: { backgroundColor: 'rgba(196,181,253,0.20)', color: '#9B6DFF' },
    ghostColor: 'rgba(196,181,253,0.10)',
  }
];
```

**Step 2: Update the section label to a lemon pill badge**

Find the `<span>` with "The 4-Pillar Model" (around line 37). Replace:

```tsx
<span
  className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-2"
  style={{ backgroundColor: '#FFE66D', color: '#7a5c00' }}
>
  ✨ The 4-Pillar Model
</span>
```

**Step 3: Update each pillar card to use the new style fields**

Update the `<motion.div>` render inside `.map()`. The icon `<div>` currently uses `className={pillar.color}` — change to use `style`:

```tsx
<div
  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
  style={pillar.iconStyle}
>
  <pillar.icon size={28} strokeWidth={1.5} />
</div>
<div
  className="text-7xl font-black absolute -top-2 -right-1 pointer-events-none select-none leading-none"
  style={{ color: pillar.ghostColor }}
>
  {index + 1}
</div>
```

**Step 4: Verify**

Run `bun run dev`, scroll to HowItWorks. Check:
- "✨ The 4-Pillar Model" is a lemon yellow pill badge
- Pillar 1 icon is pink, 2 is mint, 3 is peach, 4 is lavender/purple
- Ghost numbers have a candy-tinted color (very faint)

**Step 5: Commit**

```bash
git add components/Sections/HowItWorks.tsx
git commit -m "feat: cutesy HowItWorks — candy pillar colors, lemon pill label"
```

---

### Task 6: Update Plans — emoji headings, peach/lavender accents, rounder cards

**Files:**
- Modify: `components/Sections/Plans.tsx`

**Step 1: Add emoji to the dog and cat headings**

Find the dog `<h3>` (around line 57):
```tsx
<h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
  For <span className="text-orange-500">Dogs</span>
</h3>
```
Change to:
```tsx
<h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
  For <span style={{ color: '#FF9F7F' }}>Dogs</span> 🐶
</h3>
```

Find the cat `<h3>` (around line 94):
```tsx
<h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
  For <span className="text-blue-500">Cats</span>
</h3>
```
Change to:
```tsx
<h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative z-10">
  For <span style={{ color: '#C4B5FD' }}>Cats</span> 🐱
</h3>
```

**Step 2: Swap dog section from orange to peach**

All `orange-*` Tailwind classes in the dog section → replace with inline styles using `#FF9F7F` (peach):

- `className="absolute ... text-orange-200 ..."` on ghost "DOG" text → add `style={{ color: 'rgba(255,159,127,0.3)' }}`
- `className="... bg-orange-50/50 ..."` background → `style={{ backgroundColor: 'rgba(255,159,127,0.08)' }}`
- `className="... bg-orange-100/50 ..."` on hover → keep but add a hover style via state or just use `rgba(255,159,127,0.15)`
- `className="... border border-orange-100 hover:border-orange-300 ..."` on plan cards → `style={{ borderColor: 'rgba(255,159,127,0.25)' }}`
- Age badge `className="... bg-orange-100 text-orange-700 ..."` → `style={{ backgroundColor: 'rgba(255,159,127,0.18)', color: '#b85a30' }}`
- "View Dog Plans" button: `className="bg-orange-500 ..."` → `style={{ backgroundColor: '#FF9F7F', color: 'white', border: 'none' }}`

**Step 3: Swap cat section from blue to lavender**

All `blue-*` Tailwind classes in cat section → inline styles using `#C4B5FD` (lavender):

- Ghost "CAT" text → `style={{ color: 'rgba(196,181,253,0.3)' }}`
- Background → `style={{ backgroundColor: 'rgba(196,181,253,0.08)' }}`
- Plan card borders → `style={{ borderColor: 'rgba(196,181,253,0.3)' }}`
- Age badge → `style={{ backgroundColor: 'rgba(196,181,253,0.20)', color: '#6B21A8' }}`
- "View Cat Plans" button → `style={{ backgroundColor: '#C4B5FD', color: '#3B0764', border: 'none' }}`

**Step 4: Rounder plan cards**

Both dog and cat plan card divs currently use `rounded-xl`. Change to `rounded-2xl`.

**Step 5: Verify**

Run `bun run dev`, scroll to Plans. Check:
- Dog heading has 🐶 emoji, peach color
- Cat heading has 🐱 emoji, lavender color
- Plan cards are rounder
- Dog section accent is warm peach, cat is lavender

**Step 6: Commit**

```bash
git add components/Sections/Plans.tsx
git commit -m "feat: cutesy Plans — emoji headings, peach/lavender accents, rounder cards"
```

---

### Task 7: Update FinalCTA — paw divider, pink gradient blob, pink period

**Files:**
- Modify: `components/Sections/FinalCTA.tsx`

**Step 1: Replace the flat mesh gradient with a pink-to-peach radial blob**

Find the mesh background div (around line 10):
```tsx
<div className="absolute inset-0 opacity-80" style={{ background: 'linear-gradient(to top right, ...)' }} />
```
Replace with a warmer radial blob:
```tsx
<div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[80px] pointer-events-none"
  style={{ background: 'radial-gradient(ellipse, rgba(255,107,157,0.12) 0%, rgba(255,159,127,0.08) 50%, transparent 80%)' }}
/>
```

**Step 2: Add paw print row divider above the heading**

Inside the `<div className="max-w-4xl mx-auto px-6 relative z-10 text-center">`, add this before the `<motion.h2>`:

```tsx
{/* Decorative paw divider */}
<div className="flex items-center justify-center gap-3 mb-8">
  {['#FF6B9D', '#FF9F7F', '#FF6B9D', '#FF9F7F', '#FF6B9D'].map((color, i) => (
    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
      <ellipse cx="12" cy="15" rx="5" ry="6" />
      <circle cx="7" cy="8" r="2.5" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="17" cy="8" r="2.5" />
      <circle cx="5" cy="13" r="2" />
    </svg>
  ))}
</div>
```

**Step 3: Color the period after "We Can." pink**

The heading text currently is:
```tsx
Your Pet Can't Tell You When Something's Wrong. <span style={{ color: '#1e3470' }}>We Can.</span>
```
Change the span to:
```tsx
<span>We Can<span style={{ color: '#FF6B9D' }}>.</span></span>
```

**Step 4: Verify**

Run `bun run dev`, scroll to FinalCTA. Check:
- Subtle pink/peach blob glow behind the text
- Row of 5 pink/peach paw print icons above heading
- Period after "We Can" is pink

**Step 5: Commit**

```bash
git add components/Sections/FinalCTA.tsx
git commit -m "feat: cutesy FinalCTA — paw divider, pink gradient blob, pink period"
```

---

### Task 8: Update Footer — pink logo gradient, pink social hover

**Files:**
- Modify: `components/Layout/Footer.tsx`

**Step 1: Update logo icon background to pink gradient**

Find the logo `<div>` around line 12:
```tsx
<div className="text-white p-1.5 rounded-lg" style={{ backgroundColor: '#282239' }}>
```
Replace:
```tsx
<div
  className="text-white p-1.5 rounded-lg"
  style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF9F7F)' }}
>
```

**Step 2: Update social icon hover color to pink**

Find the three `<a>` tags for Twitter, Instagram, LinkedIn (around lines 51–75). Their `onMouseEnter` currently sets color to `'#1e3470'`. Change each to `'#FF6B9D'`:

```tsx
onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#FF6B9D')}
```

Do this for all three social links.

**Step 3: Verify**

Run `bun run dev`, scroll to Footer. Check:
- Logo icon has pink gradient
- Social icons turn pink on hover (not navy)

**Step 4: Commit**

```bash
git add components/Layout/Footer.tsx
git commit -m "feat: cutesy Footer — pink logo gradient, pink social hover"
```

---

## Summary of All Changed Files

| File | What changed |
|---|---|
| `index.html` | Nunito font, `fontFamily` config, CSS heading token |
| `components/Layout/Navbar.tsx` | Pink gradient logo, wiggle animation, pink CTA, lemon active dot |
| `components/Sections/Hero.tsx` | Lighter overlay, 🐾 pill badge, pink gradients, emoji chips, paw decoration |
| `components/Sections/ValueProp.tsx` | Candy card colors, lemon "Save 73%", 🐾 info box |
| `components/Sections/HowItWorks.tsx` | Lemon pill label, candy pillar icon colors |
| `components/Sections/Plans.tsx` | Emoji headings, peach/lavender accents, rounder cards |
| `components/Sections/FinalCTA.tsx` | Paw divider, pink blob, pink period |
| `components/Layout/Footer.tsx` | Pink logo gradient, pink social hover |

## Acceptance Criteria

- [ ] All headings display in Nunito (rounded, bubbly — not the previous serif)
- [ ] Navbar logo icon has pink gradient; wiggles on hover
- [ ] "Book a Slot" button is pink
- [ ] Hero shows 🐾 pill badge, pink gradient on "Pet Care.", pink CTA button, emoji pill chips
- [ ] ValueProp cards have candy-colored icons (pink / mint / lemon)
- [ ] HowItWorks pillars have candy-colored icons matching their section
- [ ] Plans section shows 🐶 and 🐱 emojis, peach/lavender accents
- [ ] FinalCTA has paw print row and pink period
- [ ] Footer logo is pink gradient
