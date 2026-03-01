# UI Consistency Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix five categories of UI inconsistency found in a visual audit of the home page.

**Architecture:** Pure component edits — no new files, no routing changes. FinalCTA gains props passed from App.tsx. All other changes are inline style/className corrections within existing components.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React. Package manager: `bun`. Dev server: `bun run dev` at http://localhost:3000.

---

### Task 1: FinalCTA — wire props and add buttons

**Files:**
- Modify: `components/Sections/FinalCTA.tsx`
- Modify: `App.tsx`

**Step 1: Update FinalCTA.tsx**

Replace the entire file content:

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Page } from '../../App';

interface FinalCTAProps {
  onOpenBooking: () => void;
  navigate: (page: Page) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking, navigate }) => {
  return (
    <section className="py-32 relative overflow-hidden" style={{ backgroundColor: '#f8f4e8' }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,107,157,0.12) 0%, rgba(255,159,127,0.08) 50%, transparent 80%)' }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Decorative paw divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {['#FF6B9D', '#FF9F7F', '#FF6B9D', '#FF9F7F', '#FF6B9D'].map((color, i) => (
            <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.7 }}>
              <ellipse cx="12" cy="16" rx="5" ry="5.5" />
              <circle cx="7" cy="9" r="2.5" />
              <circle cx="11" cy="6" r="2.5" />
              <circle cx="15" cy="7" r="2.5" />
              <circle cx="18" cy="10" r="2" />
            </svg>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
        >
          Your Pet Can&apos;t Tell You When Something&apos;s Wrong.{' '}
          <span>
            <span style={{ color: '#1e3470' }}>We Can</span>
            <span style={{ color: '#FF6B9D' }}>.</span>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-10 leading-relaxed"
        >
          Stop waiting for symptoms. Stop stressing your pet with clinic visits.{' '}
          <br className="hidden md:block" />
          Start caring before it&apos;s urgent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="text-white border-none shadow-lg"
            style={{ backgroundColor: '#FF6B9D', boxShadow: '0 4px 14px rgba(255,107,157,0.35)' }}
            onClick={onOpenBooking}
          >
            Join the Waitlist
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('services')}
          >
            View Plans
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
```

**Step 2: Update App.tsx — pass props to FinalCTA**

Find line 65 in `App.tsx`:
```tsx
<FinalCTA />
```
Replace with:
```tsx
<FinalCTA onOpenBooking={openBooking} navigate={navigate} />
```

**Step 3: Verify in browser**

Open http://localhost:3000, scroll to the FinalCTA section. Confirm two buttons appear: "Join the Waitlist" (pink) and "View Plans" (outline). Clicking "Join the Waitlist" should open the booking modal. Clicking "View Plans" should navigate to the Services page.

**Step 4: Commit**

```bash
git add components/Sections/FinalCTA.tsx App.tsx
git commit -m "feat: add CTA buttons to FinalCTA section"
```

---

### Task 2: Plans — normalize button colors to brand pink

**Files:**
- Modify: `components/Sections/Plans.tsx:86,129`

**Step 1: Fix dog button (line 86)**

Find:
```tsx
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#FF9F7F' }} onClick={() => navigate('services')}>View Dog Plans</Button>
```
Replace with:
```tsx
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#FF6B9D', boxShadow: '0 4px 14px rgba(255,107,157,0.35)' }} onClick={() => navigate('services')}>View Dog Plans</Button>
```

**Step 2: Fix cat button (line 129)**

Find:
```tsx
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#C4B5FD', color: '#3B0764' }} onClick={() => navigate('services')}>View Cat Plans</Button>
```
Replace with:
```tsx
<Button className="text-white border-none shadow-lg" style={{ backgroundColor: '#FF6B9D', boxShadow: '0 4px 14px rgba(255,107,157,0.35)' }} onClick={() => navigate('services')}>View Cat Plans</Button>
```

**Step 3: Verify in browser**

Scroll to the Plans section. Both "View Dog Plans" and "View Cat Plans" should now render as pink buttons matching the navbar "Book a Slot" color.

**Step 4: Commit**

```bash
git add components/Sections/Plans.tsx
git commit -m "fix: normalize plans CTA buttons to brand pink"
```

---

### Task 3: Plans — add breathing room above banner

**Files:**
- Modify: `components/Sections/Plans.tsx:138`

**Step 1: Add top margin to the banner div**

Find (line 137–140):
```tsx
{/* Unified Banner */}
<div className="py-4 text-center text-white text-sm font-medium relative z-20" style={{ backgroundColor: '#282239' }}>
    All plans include at-home care + digital records + expert consultations.
</div>
```
Replace with:
```tsx
{/* Unified Banner */}
<div className="mt-12 py-4 text-center text-white text-sm font-medium relative z-20" style={{ backgroundColor: '#282239' }}>
    All plans include at-home care + digital records + expert consultations.
</div>
```

**Step 2: Verify in browser**

Scroll to the bottom of the Plans section. The dark banner should have a visible gap between the plan cards above it.

**Step 3: Commit**

```bash
git add components/Sections/Plans.tsx
git commit -m "fix: add top margin to plans banner for breathing room"
```

---

### Task 4: ValueProp — replace green cost colors with brand colors

**Files:**
- Modify: `components/Sections/ValueProp.tsx:29-31`

**Step 1: Replace ₹1.2L text color**

Find (line 29):
```tsx
<span className="font-bold text-green-600 text-4xl">₹1.2L</span>
```
Replace with:
```tsx
<span className="font-bold text-4xl" style={{ color: '#1e3470' }}>₹1.2L</span>
```

**Step 2: Replace green underline bar**

Find (line 30):
```tsx
<div className="h-1.5 w-16 bg-green-400 rounded-full shadow-lg shadow-green-200"></div>
```
Replace with:
```tsx
<div className="h-1.5 w-16 rounded-full shadow-lg" style={{ backgroundColor: '#FF6B9D', boxShadow: '0 4px 8px rgba(255,107,157,0.30)' }}></div>
```

**Step 3: Verify in browser**

Scroll to the ValueProp / cost comparison card. The ₹1.2L amount should now render in navy, and its underline bar in pink. The "Save 73%" yellow badge should still appear above it.

**Step 4: Commit**

```bash
git add components/Sections/ValueProp.tsx
git commit -m "fix: replace off-brand green in cost card with brand navy and pink"
```

---

### Task 5: HowItWorks — increase step number ghost opacity

**Files:**
- Modify: `components/Sections/HowItWorks.tsx:11-33`

**Step 1: Update all four ghostColor values**

Find the `pillars` array (lines 5–34). Update each `ghostColor` from `0.08` / `0.10` to `0.15`:

```tsx
const pillars = [
  {
    icon: Layers,
    title: "Smart Subscription",
    desc: "Personalised plans with regular diagnostics, baseline tracking, and AI-assisted health insights.",
    iconStyle: { backgroundColor: 'rgba(255,107,157,0.12)', color: '#FF6B9D' },
    ghostColor: 'rgba(255,107,157,0.15)',
  },
  {
    icon: Truck,
    title: "Doorstep Veterinary Care",
    desc: "At-home sample collection, vaccinations, and tele-consults based on real test results.",
    iconStyle: { backgroundColor: 'rgba(78,205,196,0.12)', color: '#4ECDC4' },
    ghostColor: 'rgba(78,205,196,0.15)',
  },
  {
    icon: Smartphone,
    title: "Digital Health Platform",
    desc: "All records, reminders, reports, and vet guidance—accessible in one place.",
    iconStyle: { backgroundColor: 'rgba(255,159,127,0.12)', color: '#FF9F7F' },
    ghostColor: 'rgba(255,159,127,0.15)',
  },
  {
    icon: PiggyBank,
    title: "Affordable by Design",
    desc: "Early intervention means fewer emergencies, no transport costs, and lower lifetime spend.",
    iconStyle: { backgroundColor: 'rgba(196,181,253,0.20)', color: '#9B6DFF' },
    ghostColor: 'rgba(196,181,253,0.15)',
  }
];
```

**Step 2: Verify in browser**

Scroll to the HowItWorks section. The large step numbers (1–4) in the card corners should now be subtly but clearly visible, reading as intentional design rather than artifacts.

**Step 3: Commit**

```bash
git add components/Sections/HowItWorks.tsx
git commit -m "fix: increase ghost step number opacity in HowItWorks cards"
```
